/* =====================================================================
   WOOD & ART — testimonials.js
   Depoimentos de clientes. O envio de novo depoimento abre o WhatsApp
   com a mensagem formatada (assim você modera antes de publicar).
   Em site estático isso é o caminho honesto — não dá pra "salvar" no servidor.
   ===================================================================== */
'use strict';

window.testimonialsDB = [
  {
    id: 1, nome: 'Ana Silva', cidade: 'São Paulo, SP',
    produto: 'Tábua de Corte Profissional',
    avaliacao: 5,
    comentario: 'A tábua é simplesmente perfeita. Madeira de altíssima qualidade e acabamento impecável. Superou as expectativas.',
    data: '2025-02-15', destaque: true
  },
  {
    id: 2, nome: 'Carlos Mendes', cidade: 'Campinas, SP',
    produto: 'Mesa de Jantar 6 lugares',
    avaliacao: 5,
    comentario: 'Mesa robusta e linda — exatamente como queríamos. O atendimento foi excelente e a entrega veio dentro do prazo combinado.',
    data: '2025-02-10', destaque: true
  },
  {
    id: 3, nome: 'Mariana Costa', cidade: 'Salvador, BA',
    produto: 'Suporte para Plantas Triplo',
    avaliacao: 5,
    comentario: 'Deu um charme especial na minha varanda. Super resistente e lindo.',
    data: '2025-02-05', destaque: true
  },
  {
    id: 4, nome: 'Roberto Alves', cidade: 'Osasco, SP',
    produto: 'Poltrona Rústica',
    avaliacao: 4,
    comentario: 'Poltrona muito confortável e bem acabada. Demorou um pouco para chegar, mas valeu a espera.',
    data: '2025-01-28'
  },
  {
    id: 5, nome: 'Patrícia Lima', cidade: 'Salvador, BA',
    produto: 'Vaso de Gesso Natural',
    avaliacao: 5,
    comentario: 'Os vasos de gesso são uma delicadeza. Comprei três e já quero mais. Perfeitos para suculentas.',
    data: '2025-01-20'
  }
];

(function () {
  /* ---------- Grid da home (preview) ---------- */
  var homeGrid = document.getElementById('home-testimonials');
  if (homeGrid) {
    var destaque = window.testimonialsDB.filter(function (t) { return t.destaque; }).slice(0, 3);
    if (destaque.length === 0) destaque = window.testimonialsDB.slice(0, 3);
    homeGrid.innerHTML = destaque.map(testiCard).join('');
  }

  /* ---------- Página completa ---------- */
  var grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  var state = { rating: 0, produto: '' };

  function render() {
    var list = window.testimonialsDB.slice();
    if (state.rating > 0) list = list.filter(function (t) { return t.avaliacao >= state.rating; });
    if (state.produto)   list = list.filter(function (t) { return t.produto === state.produto; });
    list.sort(function (a, b) { return new Date(b.data) - new Date(a.data); });

    if (list.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--ink-3);">Nenhum depoimento corresponde ao filtro.</div>';
      updateStats(window.testimonialsDB);
      return;
    }
    grid.innerHTML = list.map(testiCard).join('');
    updateStats(list);
  }

  function updateStats(list) {
    var total = list.length;
    var avg = total > 0
      ? (list.reduce(function (a, t) { return a + t.avaliacao; }, 0) / total).toFixed(1)
      : '—';
    var avgEl = document.getElementById('avg-rating');
    var totalEl = document.getElementById('total-reviews');
    if (avgEl) avgEl.textContent = avg;
    if (totalEl) totalEl.textContent = total + (total === 1 ? ' avaliação' : ' avaliações');
  }

  /* Popular filtro de produtos com os que têm depoimento */
  var pf = document.getElementById('filter-produto');
  if (pf) {
    var produtos = [];
    window.testimonialsDB.forEach(function (t) { if (produtos.indexOf(t.produto) === -1) produtos.push(t.produto); });
    pf.innerHTML = '<option value="">Todos os produtos</option>' +
                   produtos.map(function (p) { return '<option value="' + WA.escapeHTML(p) + '">' + WA.escapeHTML(p) + '</option>'; }).join('');
    pf.addEventListener('change', function () { state.produto = pf.value; render(); });
  }
  var rf = document.getElementById('filter-rating');
  if (rf) rf.addEventListener('change', function () { state.rating = parseInt(rf.value, 10) || 0; render(); });

  render();

  /* ---------- Formulário de novo depoimento (envia via WhatsApp pra moderação) ---------- */
  var form = document.getElementById('testimonial-form');
  if (!form) return;

  // Star rating
  var ratingValue = 0;
  var starButtons = form.querySelectorAll('.rating-btn');
  starButtons.forEach(function (b, idx) {
    b.addEventListener('click', function () {
      ratingValue = idx + 1;
      starButtons.forEach(function (sb, i) {
        sb.setAttribute('aria-pressed', i < ratingValue ? 'true' : 'false');
        sb.textContent = i < ratingValue ? '★' : '☆';
      });
      var hidden = form.querySelector('input[name="avaliacao"]');
      if (hidden) hidden.value = String(ratingValue);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot
    var hp = form.querySelector('input[name="website"]');
    if (hp && hp.value) { form.reset(); WA.toast('Obrigado pelo depoimento!'); return; }

    var fd = new FormData(form);
    var data = {};
    fd.forEach(function (v, k) { data[k] = String(v).trim(); });

    if (!data.nome || data.nome.length < 3) { WA.toast('Informe seu nome (mínimo 3 letras).', 'error'); return; }
    if (!data.comentario || data.comentario.length < 10) { WA.toast('Conte um pouco mais sobre sua experiência.', 'error'); return; }
    if (ratingValue === 0) { WA.toast('Dê uma nota com as estrelas.', 'error'); return; }

    var lines = [];
    lines.push('*Novo depoimento — ' + WA.config.businessName + '*');
    lines.push('');
    lines.push('*Nome:* ' + data.nome);
    if (data.cidade) lines.push('*Cidade:* ' + data.cidade);
    if (data.produto) lines.push('*Produto:* ' + data.produto);
    lines.push('*Nota:* ' + ratingValue + '/5');
    lines.push('');
    lines.push('*Comentário:*');
    lines.push(data.comentario);
    lines.push('');
    lines.push('_Enviado para moderação pelo site._');

    var win = window.open(WA.buildWALink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    if (!win) window.location.href = WA.buildWALink(lines.join('\n'));

    WA.toast('Depoimento pronto no WhatsApp. Só clicar em enviar lá.');
    form.reset();
    ratingValue = 0;
    starButtons.forEach(function (sb) { sb.textContent = '☆'; sb.setAttribute('aria-pressed', 'false'); });
  });

  /* ---------- HELPERS ---------- */
  function testiCard(t) {
    var stars = '';
    for (var i = 0; i < 5; i++) stars += i < t.avaliacao ? '★' : '☆';
    return '<article class="testi">' +
      '<div class="testi-stars" aria-label="' + t.avaliacao + ' de 5 estrelas">' + stars + '</div>' +
      '<p class="testi-text">' + WA.escapeHTML(t.comentario) + '</p>' +
      '<div class="testi-foot">' +
        '<div class="testi-author"><strong>' + WA.escapeHTML(t.nome) + '</strong><span>' + WA.escapeHTML(t.cidade || '') + ' · ' + WA.formatDate(t.data) + '</span></div>' +
        '<div class="testi-product">' + WA.escapeHTML(t.produto) + '</div>' +
      '</div>' +
    '</article>';
  }
})();
