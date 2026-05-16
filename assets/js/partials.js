/* =====================================================================
   WOOD & ART — partials.js
   Componentes HTML reutilizáveis (nav, footer, fab) injetados via JS.
   Mantém HTML das páginas enxuto e evita divergência entre elas.
   ===================================================================== */
'use strict';

window.WA = window.WA || {};

WA.icons = {
  arrow:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  wa:      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5C9.3 9 8.8 7.6 8.6 7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.2-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.7 3 1.1 4.7 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>',
  phone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  pin:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  ig:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  fb:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  pin2:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.4 7.6 11.2-.1-.9-.2-2.4 0-3.4.2-.9 1.4-5.7 1.4-5.7s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.1 1.7 2.1 2.1 0 3.7-2.2 3.7-5.4 0-2.8-2-4.8-4.9-4.8-3.4 0-5.4 2.5-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3-.1.3-.3 1.2-.3 1.4 0 .2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.6 0-3.8 2.7-7.2 7.9-7.2 4.1 0 7.4 3 7.4 6.9 0 4.1-2.6 7.4-6.2 7.4-1.2 0-2.4-.6-2.7-1.4 0 0-.6 2.3-.7 2.9-.3 1-1 2.4-1.4 3.2 1.1.3 2.2.5 3.4.5 6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>',
  burger:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  search:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  share:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  link:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  shield:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  cart:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>'
};

/* ---------- NAV ---------- */
WA.renderNav = function (active) {
  var current = active || 'home';
  var nav =
    '<nav class="nav" aria-label="Menu principal">' +
      '<a href="index.html" class="brand" aria-label="Wood & Art — página inicial">' +
        '<span class="brand-mark">W</span>' +
        '<span class="brand-text">Wood &amp; Art<small>Marcenaria Artesanal</small></span>' +
      '</a>' +
      '<ul class="nav-links">' +
        navLink('index.html',      'Início',     current === 'home') +
        navLink('produtos.html',   'Catálogo',   current === 'produtos') +
        navLink('depoimentos.html','Depoimentos',current === 'depoimentos') +
        navLink('index.html#sobre','Sobre',      false) +
        navLink('index.html#contato','Contato',  false) +
      '</ul>' +
      '<a href="index.html#orcamento" class="nav-cta">Solicitar orçamento ' + WA.icons.arrow + '</a>' +
      '<button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>' +
    '<div class="mobile-menu" id="mobile-menu">' +
      '<a href="index.html">Início</a>' +
      '<a href="produtos.html">Catálogo</a>' +
      '<a href="depoimentos.html">Depoimentos</a>' +
      '<a href="index.html#sobre">Sobre</a>' +
      '<a href="index.html#contato">Contato</a>' +
      '<a href="index.html#orcamento" class="nav-cta">Solicitar orçamento ' + WA.icons.arrow + '</a>' +
    '</div>';
  return nav;

  function navLink(href, label, isActive) {
    return '<li><a href="' + href + '"' + (isActive ? ' aria-current="page"' : '') + '>' + label + '</a></li>';
  }
};

/* ---------- FAB WhatsApp ---------- */
WA.renderFab = function () {
  var msg = 'Olá! Vim pelo site da ' + WA.config.businessName + ' e gostaria de mais informações.';
  var href = WA.buildWALink ? WA.buildWALink(msg) : ('https://wa.me/' + WA.config.whatsappNumber);
  return '<a class="fab-wa" href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp">' +
         WA.icons.wa + '</a>';
};

/* ---------- FOOTER ---------- */
WA.renderFooter = function () {
  return '<footer>' +
    '<div class="foot-grid">' +
      '<div class="foot-brand">' +
        '<div class="brand">' +
          '<span class="brand-mark">W</span>' +
          '<span class="brand-text">Wood &amp; Art<small>Marcenaria Artesanal</small></span>' +
        '</div>' +
        '<p>Móveis e peças em madeira maciça, feitos sob medida no nosso ateliê em Camaçari, Bahia.</p>' +
      '</div>' +
      '<div class="foot-col">' +
        '<h4>Navegação</h4>' +
        '<ul>' +
          '<li><a href="index.html">Início</a></li>' +
          '<li><a href="produtos.html">Catálogo</a></li>' +
          '<li><a href="depoimentos.html">Depoimentos</a></li>' +
          '<li><a href="index.html#orcamento">Solicitar orçamento</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="foot-col">' +
        '<h4>Contato</h4>' +
        '<ul>' +
          '<li><a href="https://wa.me/' + WA.config.whatsappNumber + '" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>' +
          '<li><a href="mailto:' + WA.config.businessEmail + '">' + WA.config.businessEmail + '</a></li>' +
          '<li>Vilas de Abrantes, Camaçari/BA</li>' +
          '<li>Seg–Sex 9h–18h</li>' +
        '</ul>' +
      '</div>' +
    '</div>' +
    '<div class="foot-bottom">' +
      '<span>© <span id="year"></span> Wood &amp; Art — Todos os direitos reservados.</span>' +
      '<span>Marcenaria sob medida em Camaçari, Bahia.</span>' +
    '</div>' +
  '</footer>';
};

/* ---------- INIT (auto) ---------- */
document.addEventListener('DOMContentLoaded', function () {
  var navSlot = document.getElementById('nav-slot');
  if (navSlot) navSlot.outerHTML = WA.renderNav(navSlot.dataset.active);

  var fabSlot = document.getElementById('fab-slot');
  if (fabSlot) fabSlot.outerHTML = WA.renderFab();

  var footSlot = document.getElementById('footer-slot');
  if (footSlot) footSlot.outerHTML = WA.renderFooter();
});
