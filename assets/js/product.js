/* =====================================================================
   C&G PLANEJADOS — product.js
   Página de detalhe de produto.
   ===================================================================== */
'use strict';

(function () {
  var loading = document.getElementById('loading');
  var content = document.getElementById('product-content');
  if (!loading || !content) return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id'), 10);
  if (!id || !window.productsDB) {
    window.location.replace('produtos.html');
    return;
  }

  var product = window.productsDB.find(function (p) { return p.id === id; });
  if (!product) {
    window.location.replace('produtos.html');
    return;
  }

  var images = (product.imagens && product.imagens.length) ? product.imagens.slice() : [];
  var currentIdx = 0;

  // Atualiza título da aba e meta description
  document.title = product.nome + ' — ' + WA.config.businessName;
  setMeta('name', 'description', product.descricao.slice(0, 160));

  // Atualiza Open Graph + Twitter Cards dinamicamente
  var canonicalUrl = 'https://cgplanejados.com.br/produto.html?id=' + product.id;
  setMeta('property', 'og:title',       product.nome + ' — ' + WA.config.businessName);
  setMeta('property', 'og:description', product.descricao.slice(0, 200));
  setMeta('property', 'og:url',         canonicalUrl);
  if (product.imagens && product.imagens[0]) {
    var imgUrl = product.imagens[0];
    if (!/^https?:\/\//.test(imgUrl)) imgUrl = 'https://cgplanejados.com.br/' + imgUrl;
    setMeta('property', 'og:image', imgUrl);
    setMeta('name', 'twitter:image', imgUrl);
  }
  setMeta('name', 'twitter:title',       product.nome + ' — ' + WA.config.businessName);
  setMeta('name', 'twitter:description', product.descricao.slice(0, 200));

  // Canonical
  var canon = document.querySelector('link[rel="canonical"]');
  if (!canon) {
    canon = document.createElement('link');
    canon.rel = 'canonical';
    document.head.appendChild(canon);
  }
  canon.href = canonicalUrl;

  function setMeta(attr, name, value) {
    var sel = 'meta[' + attr + '="' + name + '"]';
    var el = document.querySelector(sel);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  // Breadcrumb
  var crumb = document.getElementById('product-name-breadcrumb');
  if (crumb) crumb.textContent = product.nome;

  // Cabeçalho de produto
  setText('product-category', WA.getCategoria(product.categoria));
  setText('product-title', product.nome);

  // Tags
  var tagsEl = document.getElementById('product-tags');
  if (tagsEl && product.tags) {
    tagsEl.innerHTML = product.tags.map(function (t) {
      return '<span>' + WA.escapeHTML(t) + '</span>';
    }).join('');
  }

  // Preço
  setHTML('product-price', WA.formatCurrency(product.preco) + ' <small>à vista</small>');
  var parcelas = Math.min(12, Math.max(1, Math.floor(product.preco / 20)));
  var valorParcela = product.preco / parcelas;
  setHTML('product-installments', 'ou <strong>' + parcelas + '× ' + WA.formatCurrency(valorParcela) + '</strong> sem juros');

  // Estoque
  var stockEl = document.getElementById('product-stock');
  if (stockEl) {
    if (product.estoque > 5) {
      stockEl.className = 'stock ok';
      stockEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Em estoque';
    } else if (product.estoque > 0) {
      stockEl.className = 'stock low';
      stockEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Apenas ' + product.estoque + ' em estoque';
    } else {
      stockEl.className = 'stock out';
      stockEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Esgotado — sob encomenda';
    }
  }

  // Prazo
  var deliveryEl = document.getElementById('delivery-info');
  if (deliveryEl) {
    var prazo = product.prazo_fabricacao || 'Consulte-nos';
    deliveryEl.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
      '<div><strong>Prazo de fabricação: ' + WA.escapeHTML(prazo) + '</strong>' +
      '<span>Produzido artesanalmente sob encomenda.</span></div>';
  }

  // Descrição (HTML controlado — vem do nosso banco, não de input)
  setHTML('product-description', product.descricao_completa || '<p>' + WA.escapeHTML(product.descricao) + '</p>');

  // Especificações
  var specsEl = document.getElementById('product-specs');
  if (specsEl) {
    var rows = [
      ['SKU', product.sku],
      ['Peso', product.peso],
      ['Dimensões', product.dimensoes],
      ['Categoria', WA.getCategoria(product.categoria)]
    ];
    specsEl.innerHTML = rows.map(function (r) {
      return '<dl class="spec"><dt>' + WA.escapeHTML(r[0]) + '</dt><dd>' + WA.escapeHTML(r[1] || '—') + '</dd></dl>';
    }).join('');
  }

  // Galeria principal
  renderMain();
  renderThumbs();

  function renderMain() {
    var mainEl = document.getElementById('gallery-main');
    if (!mainEl) return;
    var src = images[currentIdx] || WA.productPlaceholder(product);
    var ph = WA.productPlaceholder(product).replace(/"/g, '&quot;');
    mainEl.innerHTML = '<img id="main-image" src="' + WA.escapeHTML(src) + '" data-fallback="' + ph + '" alt="' + WA.escapeHTML(product.nome) + '">';
    WA.applyImgFallbacks(mainEl);
    mainEl.onclick = openZoom;
  }
  function renderThumbs() {
    var thumbsEl = document.getElementById('gallery-thumbs');
    if (!thumbsEl) return;
    if (images.length <= 1) { thumbsEl.style.display = 'none'; return; }
    var ph = WA.productPlaceholder(product).replace(/"/g, '&quot;');
    thumbsEl.innerHTML = images.map(function (img, i) {
      return '<button type="button" class="gallery-thumb ' + (i === currentIdx ? 'active' : '') + '" data-idx="' + i + '" aria-label="Imagem ' + (i + 1) + '">' +
             '<img src="' + WA.escapeHTML(img) + '" data-fallback="' + ph + '" alt="" loading="lazy"></button>';
    }).join('');
    WA.applyImgFallbacks(thumbsEl);
    thumbsEl.querySelectorAll('[data-idx]').forEach(function (b) {
      b.addEventListener('click', function () {
        currentIdx = parseInt(b.dataset.idx, 10);
        renderMain();
        thumbsEl.querySelectorAll('.gallery-thumb').forEach(function (t, i) {
          t.classList.toggle('active', i === currentIdx);
        });
      });
    });
  }

  // Zoom modal
  function openZoom() {
    var modal = document.getElementById('zoom-modal');
    if (!modal) return;
    var img = modal.querySelector('img');
    if (img) img.src = images[currentIdx] || WA.productPlaceholder(product);
    modal.classList.add('open');
  }
  var zoomModal = document.getElementById('zoom-modal');
  if (zoomModal) {
    zoomModal.addEventListener('click', function (e) {
      if (e.target === zoomModal || e.target.closest('.zoom-close')) {
        zoomModal.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && zoomModal.classList.contains('open')) {
        zoomModal.classList.remove('open');
      }
    });
  }

  // Botões de ação
  var btnQuote = document.getElementById('btn-quote');
  if (btnQuote) btnQuote.addEventListener('click', function () { WA.quoteForProduct(product.id); });

  var btnML = document.getElementById('btn-ml');
  if (btnML) {
    if (product.mercado_livre_url) {
      btnML.setAttribute('href', product.mercado_livre_url);
    } else {
      btnML.style.display = 'none';
    }
  }

  // Compartilhamento
  document.querySelectorAll('[data-share]').forEach(function (b) {
    b.addEventListener('click', function () {
      var platform = b.dataset.share;
      if (platform === 'copy') WA.copyLink();
      else WA.shareProduct(platform, product.nome, window.location.href);
    });
  });

  // Produtos relacionados
  renderRelated();
  function renderRelated() {
    var relEl = document.getElementById('related-products');
    if (!relEl) return;
    var related = window.productsDB.filter(function (p) {
      return p.categoria === product.categoria && p.id !== product.id;
    }).slice(0, 4);
    if (related.length === 0) {
      var section = document.querySelector('.related-products');
      if (section) section.style.display = 'none';
      return;
    }
    relEl.innerHTML = related.map(function (p) {
      var img = (p.imagens && p.imagens[0]) || WA.productPlaceholder(p);
      var ph = WA.productPlaceholder(p).replace(/"/g, '&quot;');
      return '<article class="card">' +
        '<a class="card-link" href="produto.html?id=' + p.id + '" aria-label="Ver detalhes de ' + WA.escapeHTML(p.nome) + '"></a>' +
        (p.destaque ? '<span class="card-tag tag-rust">Destaque</span>' : '') +
        '<div class="card-media"><img src="' + WA.escapeHTML(img) + '" data-fallback="' + ph + '" alt="" loading="lazy"></div>' +
        '<div class="card-body">' +
        '<div class="card-cat">' + WA.escapeHTML(WA.getCategoria(p.categoria)) + '</div>' +
        '<h3>' + WA.escapeHTML(p.nome) + '</h3>' +
        '<div class="card-foot"><div class="card-price">' + WA.formatCurrency(p.preco) + '<small>à vista</small></div></div>' +
        '</div></article>';
    }).join('');
    WA.applyImgFallbacks(relEl);
  }

  // Tudo pronto — mostra conteúdo
  loading.style.display = 'none';
  content.style.display = 'block';

  /* ---------- Helpers locais ---------- */
  function setText(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; }
  function setHTML(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }
})();
