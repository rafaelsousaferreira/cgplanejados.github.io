/* =====================================================================
   C&G PLANEJADOS — seo.js
   Injeta JSON-LD estruturado dinâmico:
   - Product schema em produto.html (lê do productsDB)
   - ItemList schema em produtos.html (lista catálogo inteiro)
   - BreadcrumbList em ambas
   O LocalBusiness e SiteNavigationElement são inline no <head> da home.
   ===================================================================== */
'use strict';

(function () {
  var SITE = 'https://cgplanejados.com.br';

  function inject(json) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(json);
    document.head.appendChild(s);
  }

  // --- Página de produto individual ---
  function injectProductSchema() {
    if (!window.productsDB) return;
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get('id'), 10);
    if (!id) return;
    var p = window.productsDB.find(function (x) { return x.id === id; });
    if (!p) return;

    // Disponibilidade conforme estoque
    var availability = 'https://schema.org/InStock';
    if (p.estoque === 0) availability = 'https://schema.org/PreOrder';
    else if (p.estoque <= 5) availability = 'https://schema.org/LimitedAvailability';

    var imageUrls = (p.imagens || []).map(function (img) {
      // Se já é absoluta, mantém. Se relativa, prefixa o site.
      if (/^https?:\/\//.test(img)) return img;
      return SITE + '/' + img;
    });
    // Se não tem imagens, usa a OG image como fallback
    if (imageUrls.length === 0) imageUrls = [SITE + '/assets/images/og-image.jpg'];

    var productJson = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': p.nome,
      'description': p.descricao,
      'image': imageUrls,
      'sku': p.sku || ('CGP-' + p.id),
      'brand': { '@type': 'Brand', 'name': 'C&G Planejados' },
      'category': WA.getCategoria(p.categoria),
      'offers': {
        '@type': 'Offer',
        'url': SITE + '/produto.html?id=' + p.id,
        'priceCurrency': 'BRL',
        'price': p.preco.toFixed(2),
        'availability': availability,
        'itemCondition': 'https://schema.org/NewCondition',
        'seller': { '@type': 'Organization', 'name': 'C&G Planejados' },
        'areaServed': { '@type': 'Country', 'name': 'BR' }
      }
    };
    if (p.peso) productJson.weight = { '@type': 'QuantitativeValue', 'value': p.peso };
    inject(productJson);

    // Breadcrumb específico do produto
    inject({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Início',    'item': SITE + '/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Catálogo',  'item': SITE + '/produtos.html' },
        { '@type': 'ListItem', 'position': 3, 'name': p.nome,      'item': SITE + '/produto.html?id=' + p.id }
      ]
    });
  }

  // --- Página de catálogo ---
  function injectCatalogSchema() {
    if (!window.productsDB) return;
    var items = window.productsDB.map(function (p, i) {
      return {
        '@type': 'ListItem',
        'position': i + 1,
        'url': SITE + '/produto.html?id=' + p.id,
        'name': p.nome
      };
    });
    inject({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Catálogo C&G Planejados',
      'numberOfItems': items.length,
      'itemListElement': items
    });
    // Breadcrumb
    inject({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Início',   'item': SITE + '/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Catálogo', 'item': SITE + '/produtos.html' }
      ]
    });
  }

  // --- Página de depoimentos: agrega reviews ---
  function injectReviewsSchema() {
    if (!window.testimonialsDB || window.testimonialsDB.length === 0) return;
    var reviews = window.testimonialsDB.map(function (t) {
      return {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': t.nome },
        'datePublished': t.data,
        'reviewBody': t.comentario,
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': t.avaliacao,
          'bestRating': 5,
          'worstRating': 1
        },
        'itemReviewed': { '@type': 'Product', 'name': t.produto, 'brand': 'C&G Planejados' }
      };
    });
    var avg = window.testimonialsDB.reduce(function (a, t) { return a + t.avaliacao; }, 0) / window.testimonialsDB.length;
    inject({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'C&G Planejados',
      'url': SITE,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': avg.toFixed(1),
        'reviewCount': window.testimonialsDB.length,
        'bestRating': 5,
        'worstRating': 1
      },
      'review': reviews
    });
    inject({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Início',      'item': SITE + '/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Depoimentos', 'item': SITE + '/depoimentos.html' }
      ]
    });
  }

  // Dispatch por página
  var path = (window.location.pathname.match(/[^\/]+$/) || ['index.html'])[0];
  if (path === 'produto.html') injectProductSchema();
  else if (path === 'produtos.html') injectCatalogSchema();
  else if (path === 'depoimentos.html') injectReviewsSchema();
})();
