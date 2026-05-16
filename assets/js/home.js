/* =====================================================================
   WOOD & ART — home.js
   Render dos produtos em destaque na página inicial.
   ===================================================================== */
'use strict';

(function () {
  var el = document.getElementById('featured-grid');
  if (!el || !window.productsDB) return;
  var destaques = window.productsDB.filter(function (p) { return p.destaque; }).slice(0, 8);
  el.innerHTML = destaques.map(function (p) {
    var img = (p.imagens && p.imagens[0]) || WA.productPlaceholder(p);
    var ph = WA.productPlaceholder(p).replace(/"/g, '&quot;');
    return '<article class="card">' +
      '<a class="card-link" href="produto.html?id=' + p.id + '" aria-label="Ver detalhes de ' + WA.escapeHTML(p.nome) + '"></a>' +
      '<span class="card-tag tag-rust">Destaque</span>' +
      '<div class="card-media"><img src="' + WA.escapeHTML(img) + '" data-fallback="' + ph + '" alt="" loading="lazy"></div>' +
      '<div class="card-body">' +
        '<div class="card-cat">' + WA.escapeHTML(WA.getCategoria(p.categoria)) + '</div>' +
        '<h3>' + WA.escapeHTML(p.nome) + '</h3>' +
        '<p class="card-desc">' + WA.escapeHTML(p.descricao.slice(0, 100)) + '…</p>' +
        '<div class="card-foot">' +
          '<div class="card-price">' + WA.formatCurrency(p.preco) + '<small>à vista</small></div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }).join('');
  WA.applyImgFallbacks(el);
})();
