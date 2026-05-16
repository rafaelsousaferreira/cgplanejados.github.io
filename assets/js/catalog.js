/* =====================================================================
   WOOD & ART — catalog.js
   Lógica da página de catálogo: busca, filtros, paginação.
   Usa addEventListener (nunca onclick="${func}") — sem eval implícito.
   ===================================================================== */
'use strict';

(function () {
  if (!document.getElementById('products-grid')) return;

  var state = {
    search: '',
    categoria: '',
    subcategoria: '',
    sort: 'destaque',
    page: 1,
    perPage: 12
  };

  // Lê categoria da URL (?categoria=mobiliario)
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('categoria')) state.categoria = urlParams.get('categoria');

  /* ---------- ELEMENTOS ---------- */
  var $grid = document.getElementById('products-grid');
  var $count = document.getElementById('products-total');
  var $pagination = document.getElementById('pagination');
  var $search = document.getElementById('product-search');
  var $catFilter = document.getElementById('categoria-filter');
  var $subFilter = document.getElementById('subcategoria-filter');
  var $subGroup = document.getElementById('subcategoria-group');
  var $sortFilter = document.getElementById('sort-filter');
  var $activeFilters = document.getElementById('active-filters');
  var $searchForm = document.getElementById('search-form');

  /* ---------- FILTRAGEM E ORDENAÇÃO ---------- */
  function filterProducts() {
    var list = window.productsDB.slice();

    if (state.search) {
      var q = state.search.toLowerCase().trim();
      list = list.filter(function (p) {
        return p.nome.toLowerCase().indexOf(q) !== -1 ||
               p.descricao.toLowerCase().indexOf(q) !== -1 ||
               (p.tags && p.tags.some(function (t) { return t.toLowerCase().indexOf(q) !== -1; }));
      });
    }
    if (state.categoria) list = list.filter(function (p) { return p.categoria === state.categoria; });
    if (state.subcategoria) list = list.filter(function (p) { return p.subcategoria === state.subcategoria; });

    // Ordenação
    if (state.sort === 'nome-asc') list.sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); });
    else if (state.sort === 'nome-desc') list.sort(function (a, b) { return b.nome.localeCompare(a.nome, 'pt-BR'); });
    else if (state.sort === 'preco-asc') list.sort(function (a, b) { return a.preco - b.preco; });
    else if (state.sort === 'preco-desc') list.sort(function (a, b) { return b.preco - a.preco; });
    else { // destaque (padrão)
      list.sort(function (a, b) {
        if (a.destaque && !b.destaque) return -1;
        if (!a.destaque && b.destaque) return 1;
        return 0;
      });
    }
    return list;
  }

  /* ---------- RENDER: GRID ---------- */
  function renderGrid() {
    var filtered = filterProducts();
    if ($count) $count.textContent = String(filtered.length);

    var totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.perPage;
    var pageItems = filtered.slice(start, start + state.perPage);

    if (pageItems.length === 0) {
      $grid.innerHTML =
        '<div class="empty-state" style="grid-column:1/-1;text-align:center;padding:4rem 2rem;color:var(--ink-3);">' +
        '<p style="font-family:var(--serif);font-size:1.5rem;color:var(--ink);margin-bottom:0.5rem;">Nada por aqui ainda</p>' +
        '<p style="margin-bottom:1.5rem;">Tente outros termos ou limpe os filtros.</p>' +
        '<button type="button" class="btn btn-ghost" id="reset-filters">Limpar filtros</button>' +
        '</div>';
      var reset = document.getElementById('reset-filters');
      if (reset) reset.addEventListener('click', resetFilters);
      $pagination.innerHTML = '';
      return;
    }

    $grid.innerHTML = pageItems.map(cardHTML).join('');
    bindCardActions();
    renderPagination(totalPages);
  }

  function cardHTML(p) {
    var img = (p.imagens && p.imagens[0]) || WA.productPlaceholder(p);
    var placeholder = WA.productPlaceholder(p).replace(/"/g, '&quot;');
    var tags = '';
    if (p.destaque) tags += '<span class="card-tag tag-rust">Destaque</span>';
    if (p.regional) tags += '<span class="card-tag tag-region" style="' + (p.destaque ? 'top:3rem;' : '') + '">Regional</span>';

    var mlBtn = p.mercado_livre_url
      ? '<a class="card-btn ml" href="' + WA.escapeHTML(p.mercado_livre_url) + '" target="_blank" rel="noopener noreferrer" aria-label="Ver no Mercado Livre" data-stop>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>' +
        '</a>'
      : '';

    return '' +
      '<a class="card" href="produto.html?id=' + p.id + '" aria-label="Ver detalhes de ' + WA.escapeHTML(p.nome) + '">' +
        tags +
        '<div class="card-media">' +
          '<img src="' + WA.escapeHTML(img) + '" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'' + placeholder + '\';">' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-cat">' + WA.escapeHTML(WA.getCategoria(p.categoria)) + '</div>' +
          '<h3>' + WA.escapeHTML(p.nome) + '</h3>' +
          '<p class="card-desc">' + WA.escapeHTML(p.descricao.slice(0, 110)) + (p.descricao.length > 110 ? '…' : '') + '</p>' +
          '<div class="card-foot">' +
            '<div class="card-price">' + WA.formatCurrency(p.preco) + '<small>à vista</small></div>' +
            '<div class="card-actions">' +
              '<button type="button" class="card-btn wa" data-quote="' + p.id + '" data-stop aria-label="Solicitar orçamento pelo WhatsApp">' +
                '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5C9.3 9 8.8 7.6 8.6 7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.2-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.7 3 1.1 4.7 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>' +
              '</button>' +
              mlBtn +
            '</div>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  function bindCardActions() {
    // Botões de "orçamento rápido" e "ML": evita propagar pro link do card
    var btns = $grid.querySelectorAll('[data-stop]');
    btns.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (el.dataset.quote) {
          WA.quoteForProduct(parseInt(el.dataset.quote, 10));
        } else if (el.tagName === 'A' && el.href) {
          window.open(el.href, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  /* ---------- RENDER: PAGINAÇÃO ---------- */
  function renderPagination(totalPages) {
    if (totalPages <= 1) { $pagination.innerHTML = ''; return; }
    var parts = [];
    parts.push(
      '<button type="button" class="filter" data-page="' + (state.page - 1) + '" ' +
      (state.page === 1 ? 'disabled' : '') + '>← Anterior</button>'
    );
    for (var i = 1; i <= totalPages; i++) {
      var isCurrent = i === state.page;
      var nearCurrent = i === 1 || i === totalPages || (i >= state.page - 1 && i <= state.page + 1);
      if (nearCurrent) {
        parts.push(
          '<button type="button" class="filter ' + (isCurrent ? 'active' : '') + '" data-page="' + i + '">' + i + '</button>'
        );
      } else if (i === state.page - 2 || i === state.page + 2) {
        parts.push('<span style="padding:0.55rem 0.5rem;color:var(--ink-3);">…</span>');
      }
    }
    parts.push(
      '<button type="button" class="filter" data-page="' + (state.page + 1) + '" ' +
      (state.page === totalPages ? 'disabled' : '') + '>Próximo →</button>'
    );
    $pagination.innerHTML = parts.join('');
    $pagination.querySelectorAll('button[data-page]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = parseInt(b.dataset.page, 10);
        if (!isNaN(p)) {
          state.page = p;
          renderGrid();
          window.scrollTo({ top: $grid.offsetTop - 120, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- RENDER: SUBCATEGORIAS (dinâmicas) ---------- */
  function updateSubcategorias() {
    if (!$subFilter || !$subGroup) return;
    if (!state.categoria) {
      $subGroup.style.display = 'none';
      return;
    }
    var subs = [];
    window.productsDB.forEach(function (p) {
      if (p.categoria === state.categoria && p.subcategoria && subs.indexOf(p.subcategoria) === -1) {
        subs.push(p.subcategoria);
      }
    });
    if (subs.length === 0) { $subGroup.style.display = 'none'; return; }
    $subGroup.style.display = '';
    var html = '<option value="">Todas as subcategorias</option>';
    subs.forEach(function (s) {
      html += '<option value="' + WA.escapeHTML(s) + '"' +
              (state.subcategoria === s ? ' selected' : '') + '>' +
              WA.escapeHTML(WA.getSubcategoria(s)) + '</option>';
    });
    $subFilter.innerHTML = html;
  }

  /* ---------- RENDER: TAGS DE FILTROS ATIVOS ---------- */
  function updateActiveFilters() {
    if (!$activeFilters) return;
    var chips = [];
    if (state.search) chips.push({ label: 'Busca: "' + state.search + '"', clear: function () { state.search = ''; if ($search) $search.value = ''; } });
    if (state.categoria) chips.push({ label: WA.getCategoria(state.categoria), clear: function () { state.categoria = ''; state.subcategoria = ''; if ($catFilter) $catFilter.value = ''; } });
    if (state.subcategoria) chips.push({ label: WA.getSubcategoria(state.subcategoria), clear: function () { state.subcategoria = ''; if ($subFilter) $subFilter.value = ''; } });

    if (chips.length === 0) { $activeFilters.innerHTML = ''; return; }

    $activeFilters.innerHTML = chips.map(function (_, i) {
      return '<button type="button" class="filter active" data-chip="' + i + '">' + WA.escapeHTML(chips[i].label) + ' ×</button>';
    }).join('');

    $activeFilters.querySelectorAll('[data-chip]').forEach(function (b) {
      b.addEventListener('click', function () {
        chips[parseInt(b.dataset.chip, 10)].clear();
        state.page = 1;
        updateSubcategorias();
        updateActiveFilters();
        renderGrid();
        syncURL();
      });
    });
  }

  /* ---------- URL SYNC ---------- */
  function syncURL() {
    var u = new URL(window.location.href);
    if (state.categoria) u.searchParams.set('categoria', state.categoria);
    else u.searchParams.delete('categoria');
    window.history.replaceState({}, '', u);
  }

  function resetFilters() {
    state.search = '';
    state.categoria = '';
    state.subcategoria = '';
    state.sort = 'destaque';
    state.page = 1;
    if ($search) $search.value = '';
    if ($catFilter) $catFilter.value = '';
    if ($subFilter) $subFilter.value = '';
    if ($sortFilter) $sortFilter.value = 'destaque';
    updateSubcategorias();
    updateActiveFilters();
    renderGrid();
    syncURL();
  }

  /* ---------- BIND DE CONTROLES ---------- */
  if ($searchForm) {
    $searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      state.search = $search ? $search.value : '';
      state.page = 1;
      updateActiveFilters();
      renderGrid();
    });
  }
  if ($search) {
    var debounce;
    $search.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        state.search = $search.value;
        state.page = 1;
        updateActiveFilters();
        renderGrid();
      }, 350);
    });
  }
  if ($catFilter) {
    $catFilter.addEventListener('change', function () {
      state.categoria = $catFilter.value;
      state.subcategoria = '';
      state.page = 1;
      updateSubcategorias();
      updateActiveFilters();
      renderGrid();
      syncURL();
    });
  }
  if ($subFilter) {
    $subFilter.addEventListener('change', function () {
      state.subcategoria = $subFilter.value;
      state.page = 1;
      updateActiveFilters();
      renderGrid();
    });
  }
  if ($sortFilter) {
    $sortFilter.addEventListener('change', function () {
      state.sort = $sortFilter.value;
      renderGrid();
    });
  }

  /* ---------- INIT ---------- */
  if ($catFilter && state.categoria) $catFilter.value = state.categoria;
  updateSubcategorias();
  updateActiveFilters();
  renderGrid();
})();
