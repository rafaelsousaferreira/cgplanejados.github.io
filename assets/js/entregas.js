/* =====================================================================
   C&G PLANEJADOS — entregas.js
   Mapa interativo do Brasil com pins de cada entrega.
   Coordenadas (lat/lng) convertidas para o sistema SVG via projeção linear.
   ===================================================================== */
'use strict';

(function () {
  // ============== ENTREGAS ==============
  // 20 pontos: concentração forte na BA, alguns no NE, esparsos pelo BR.
  // lat/lng coordenadas geográficas reais das cidades.
  // Quando você quiser adicionar entrega: só completar lat/lng/cidade/uf/peca/madeira/data.

  var ENTREGAS = [
    // Bahia — concentração local
    { cidade: 'Camaçari',        uf: 'BA', lat: -12.6997, lng: -38.3239, peca: 'Mesa de jantar 6 lugares', madeira: 'Freijó',   data: '2025-12-10' },
    { cidade: 'Vilas de Abrantes',uf: 'BA', lat: -12.7700, lng: -38.2900, peca: 'Cozinha planejada',       madeira: 'Carvalho', data: '2025-11-22' },
    { cidade: 'Lauro de Freitas',uf: 'BA', lat: -12.8944, lng: -38.3221, peca: 'Estante painel 3,20m',    madeira: 'Carvalho', data: '2026-01-15' },
    { cidade: 'Salvador',        uf: 'BA', lat: -12.9714, lng: -38.5014, peca: 'Cadeira de balanço (restauração)', madeira: 'Cedro', data: '2025-09-08' },
    { cidade: 'Salvador',        uf: 'BA', lat: -12.9714, lng: -38.5014, peca: 'Aparador em demolição',   madeira: 'Peroba demolição', data: '2026-02-03' },
    { cidade: 'Feira de Santana',uf: 'BA', lat: -12.2576, lng: -38.9663, peca: 'Mesa redonda restaurada', madeira: 'Imbuia',   data: '2025-10-19' },
    { cidade: 'Ilhéus',          uf: 'BA', lat: -14.7935, lng: -39.0463, peca: 'Banheiro com bancada',    madeira: 'Peroba demolição', data: '2025-08-30' },
    { cidade: 'Porto Seguro',    uf: 'BA', lat: -16.4495, lng: -39.0648, peca: 'Banco-baú sob escada',    madeira: 'Carvalho', data: '2026-02-14' },

    // Nordeste vizinho
    { cidade: 'Aracaju',         uf: 'SE', lat: -10.9472, lng: -37.0731, peca: 'Dormitório planejado',    madeira: 'Freijó',   data: '2025-11-05' },
    { cidade: 'Recife',          uf: 'PE', lat: -8.0476,  lng: -34.8770, peca: 'Estante para biblioteca', madeira: 'Imbuia',   data: '2025-12-28' },
    { cidade: 'João Pessoa',     uf: 'PB', lat: -7.1195,  lng: -34.8450, peca: 'Conjunto mesa + cadeiras',madeira: 'Freijó',   data: '2026-01-08' },
    { cidade: 'Natal',           uf: 'RN', lat: -5.7945,  lng: -35.2110, peca: 'Aparador autoral',        madeira: 'Cedro',    data: '2025-10-02' },
    { cidade: 'Fortaleza',       uf: 'CE', lat: -3.7327,  lng: -38.5267, peca: 'Cozinha planejada compacta', madeira: 'Eucalipto', data: '2025-09-18' },

    // Sudeste
    { cidade: 'São Paulo',       uf: 'SP', lat: -23.5505, lng: -46.6333, peca: 'Mesa de centro autoral',  madeira: 'Imbuia',   data: '2026-02-22' },
    { cidade: 'São Paulo',       uf: 'SP', lat: -23.5505, lng: -46.6333, peca: 'Escrivaninha embutida',   madeira: 'Carvalho', data: '2025-11-12' },
    { cidade: 'Rio de Janeiro',  uf: 'RJ', lat: -22.9068, lng: -43.1729, peca: 'Painel de TV em demolição', madeira: 'Peroba demolição', data: '2025-12-15' },
    { cidade: 'Belo Horizonte',  uf: 'MG', lat: -19.9167, lng: -43.9345, peca: 'Mesa de jantar 8 lugares', madeira: 'Freijó',   data: '2026-01-25' },

    // Centro-oeste & Sul
    { cidade: 'Brasília',        uf: 'DF', lat: -15.7942, lng: -47.8822, peca: 'Estante divisor de ambiente', madeira: 'Carvalho', data: '2025-10-30' },
    { cidade: 'Curitiba',        uf: 'PR', lat: -25.4284, lng: -49.2733, peca: 'Aparador em Imbuia',       madeira: 'Imbuia',   data: '2026-02-08' },
    { cidade: 'Porto Alegre',    uf: 'RS', lat: -30.0346, lng: -51.2177, peca: 'Cabeceira sob medida',     madeira: 'Freijó',   data: '2025-08-22' }
  ];

  // ============== PROJEÇÃO LAT/LNG → SVG ==============
  // ViewBox do SVG do Brasil: 0 0 800 800
  // Limites geográficos do Brasil: lat -34 a +5, lng -74 a -34
  // (deixamos margem nas bordas)

  var MAP = {
    viewBox: { w: 800, h: 800 },
    bounds: { latN: 6, latS: -34, lngW: -74, lngE: -33 }
  };

  function projetar(lat, lng) {
    var x = ((lng - MAP.bounds.lngW) / (MAP.bounds.lngE - MAP.bounds.lngW)) * MAP.viewBox.w;
    var y = ((MAP.bounds.latN - lat) / (MAP.bounds.latN - MAP.bounds.latS)) * MAP.viewBox.h;
    return { x: x, y: y };
  }

  // ============== SVG DO BRASIL ==============
  // Paths simplificados dos estados (representação geográfica reduzida —
  // não é mapa cartográfico preciso, mas reconhecível).
  //
  // Estratégia: usar paths de domínio público IBGE simplificados.
  // Aqui usamos uma versão MUITO simplificada (silhueta do Brasil + 5 regiões),
  // pra manter o JS leve e o visual coerente com o resto do site.
  //
  // Origem: redesenho próprio inspirado em formas geo da escala 1:50.000.000.

  function brasilSvg() {
    // Silhueta simplificada do Brasil, **uma única forma contínua**,
    // calibrada para o viewBox 800x800 com bounds geográficos definidos.
    //
    // Construída a partir de pontos-chave nas coordenadas:
    // - Roraima/AP norte: lat ~+4, lng -60
    // - Atol das Rocas (NE): lat -3.8, lng -33.8
    // - Cabo Branco (mais oriental): lat -7.1, lng -34.8
    // - Chuí (sul): lat -33.7, lng -53.4
    // - Acre (oeste): lat -10, lng -73.5
    //
    // Forma contínua aproximando o contorno do país.
    return '<svg viewBox="0 0 ' + MAP.viewBox.w + ' ' + MAP.viewBox.h + '" xmlns="http://www.w3.org/2000/svg" class="br-svg" aria-hidden="true">' +

      '<defs>' +
        '<filter id="br-grain">' +
          '<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>' +
          '<feColorMatrix values="0 0 0 0 0.16 0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0.10 0"/>' +
        '</filter>' +
        '<linearGradient id="br-land" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#b88862"/>' +
          '<stop offset="100%" stop-color="#a87a52"/>' +
        '</linearGradient>' +
      '</defs>' +

      // Fundo
      '<rect width="800" height="800" fill="#ede0cb"/>' +

      // Linhas de referência
      gridLines() +

      // Brasil — silhueta única contínua
      // Construída a partir de coordenadas-chave do contorno do país
      // Sentido horário começando do norte (Roraima)
      '<path class="br-land" d="' +
        getBrasilPath() +
      '" fill="url(#br-land)" stroke="#6a4626" stroke-width="1.5" stroke-linejoin="round"/>' +

      // Linha do Equador (apenas referência)
      '<line x1="0" y1="' + projetar(0, -74).y.toFixed(0) + '" x2="800" y2="' + projetar(0, -33).y.toFixed(0) +
        '" stroke="rgba(168,85,42,0.25)" stroke-width="1" stroke-dasharray="6 6"/>' +

      // Trópico de Capricórnio
      '<line x1="0" y1="' + projetar(-23.4, -74).y.toFixed(0) + '" x2="800" y2="' + projetar(-23.4, -33).y.toFixed(0) +
        '" stroke="rgba(168,85,42,0.15)" stroke-width="1" stroke-dasharray="3 8"/>' +

      // Grão
      '<rect width="800" height="800" filter="url(#br-grain)" opacity="0.35" style="mix-blend-mode:multiply;pointer-events:none;"/>' +

    '</svg>';
  }

  function getBrasilPath() {
    // Pontos-chave do contorno do Brasil em coordenadas geográficas,
    // convertidos para o SVG. Sentido horário a partir do norte.
    // Cada ponto: [lat, lng]
    var pontos = [
      // Norte — fronteira com Venezuela/Guiana
      [ 4.5, -60.0],   // Roraima norte
      [ 5.0, -58.5],   // borda RR/Guiana
      [ 4.0, -54.0],   // norte do AP
      [ 2.5, -50.5],   // costa norte AP
      [ 1.0, -49.0],   // Amapá costa
      [-1.0, -47.5],   // Pará costa
      [-2.5, -44.5],   // Maranhão costa
      [-3.0, -42.0],   // Piauí norte (costa)
      [-3.5, -39.5],   // Ceará oeste
      [-2.8, -38.5],   // Fortaleza
      [-3.5, -36.0],   // costa NE
      [-5.0, -35.5],   // Natal
      [-6.5, -34.8],   // Cabo Branco (PB)
      [-8.0, -34.8],   // Recife
      [-9.5, -35.3],   // Maceió
      [-11.0, -37.0],  // Aracaju
      [-13.0, -38.5],  // Salvador
      [-15.0, -38.9],  // sul BA costa
      [-17.5, -39.2],  // Porto Seguro
      [-19.0, -39.8],  // ES costa
      [-21.0, -40.5],  // RJ norte
      [-22.9, -42.0],  // RJ costa
      [-23.5, -45.0],  // SP litoral
      [-24.5, -46.5],  // Santos / SP sul
      [-26.0, -48.5],  // SC litoral
      [-28.5, -49.0],  // SC sul
      [-30.0, -50.5],  // RS litoral norte
      [-32.0, -52.0],  // RS litoral
      [-33.7, -53.4],  // Chuí (extremo sul)
      // Subindo pelo oeste (fronteira Uruguai → Argentina → Paraguai → Bolívia → Peru → Colômbia)
      [-32.5, -55.5],  // Uruguai
      [-30.0, -57.5],  // Argentina/RS
      [-27.5, -56.0],  // RS oeste
      [-25.5, -54.6],  // Foz do Iguaçu
      [-22.5, -55.0],  // MS sul
      [-21.0, -57.5],  // MS oeste (Pantanal)
      [-19.0, -58.0],  // Bolívia/MS
      [-16.5, -58.5],  // MT oeste
      [-14.0, -60.5],  // MT/RO
      [-12.0, -65.0],  // Rondônia
      [-10.0, -68.5],  // Acre
      [-9.0, -73.0],   // Acre extremo oeste
      [-7.5, -73.5],   // AC/AM oeste
      [-4.5, -70.0],   // AM oeste
      [-2.0, -68.0],   // AM norte (Colômbia)
      [ 1.5, -67.0],   // RR/AM Colômbia/Venezuela
      [ 3.0, -65.0],   // Pico da Neblina
      [ 4.5, -60.0]    // volta ao início
    ];
    // Converte cada ponto para SVG e monta o path
    var d = '';
    pontos.forEach(function (pt, i) {
      var p = projetar(pt[0], pt[1]);
      d += (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ' ';
    });
    return d + 'Z';
  }

  function gridLines() {
    var lines = '';
    // 4 linhas horizontais (paralelos): -30, -15, 0, +5
    [-30, -15, 0, 5].forEach(function (lat) {
      var y = ((MAP.bounds.latN - lat) / (MAP.bounds.latN - MAP.bounds.latS)) * MAP.viewBox.h;
      lines += '<line x1="0" y1="' + y.toFixed(1) + '" x2="800" y2="' + y.toFixed(1) +
        '" stroke="rgba(42,31,23,0.06)" stroke-width="1" stroke-dasharray="3 6"/>';
    });
    // 4 linhas verticais (meridianos): -70, -55, -45, -35
    [-70, -55, -45, -35].forEach(function (lng) {
      var x = ((lng - MAP.bounds.lngW) / (MAP.bounds.lngE - MAP.bounds.lngW)) * MAP.viewBox.w;
      lines += '<line x1="' + x.toFixed(1) + '" y1="0" x2="' + x.toFixed(1) + '" y2="800" ' +
        'stroke="rgba(42,31,23,0.06)" stroke-width="1" stroke-dasharray="3 6"/>';
    });
    return lines;
  }

  // ============== AGRUPAMENTO POR CIDADE ==============
  // Se 2+ entregas na mesma cidade, agrupa pra mostrar "+N" no pin

  function agruparPorCidade(lista) {
    var map = {};
    lista.forEach(function (e) {
      var key = e.cidade + '-' + e.uf;
      if (!map[key]) {
        map[key] = {
          cidade: e.cidade,
          uf: e.uf,
          lat: e.lat,
          lng: e.lng,
          entregas: []
        };
      }
      map[key].entregas.push(e);
    });
    return Object.keys(map).map(function (k) { return map[k]; });
  }

  // ============== RENDERIZAR PINS ==============
  function renderPins(grupos) {
    return grupos.map(function (g, idx) {
      var p = projetar(g.lat, g.lng);
      var qtd = g.entregas.length;
      var first = g.entregas[0];

      // Pin: círculo + sombra. Cluster: badge com contador.
      return '<g class="br-pin" data-idx="' + idx + '" transform="translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ')" tabindex="0" role="button" aria-label="' +
        WA.escapeHTML(g.cidade + ', ' + g.uf + ': ' + qtd + ' entrega' + (qtd > 1 ? 's' : '')) + '">' +
        // Sombra na "terra"
        '<ellipse cx="0" cy="3" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)"/>' +
        // Bolinha
        '<circle r="7" fill="#a8552a" stroke="#fffaf3" stroke-width="2"/>' +
        // Badge de cluster (se 2+)
        (qtd > 1 ?
          '<circle cx="6" cy="-7" r="6" fill="#2a1f17"/>' +
          '<text x="6" y="-4.5" text-anchor="middle" fill="#f5ecdf" font-family="Manrope,sans-serif" font-size="8" font-weight="700">' + qtd + '</text>'
          : ''
        ) +
      '</g>';
    }).join('');
  }

  // ============== TOOLTIP ==============
  function buildTooltip(grupo) {
    var entregas = grupo.entregas.map(function (e) {
      return '<li>' +
        '<strong>' + WA.escapeHTML(e.peca) + '</strong>' +
        '<span class="tt-meta">' + WA.escapeHTML(e.madeira) + ' &middot; ' + formatDate(e.data) + '</span>' +
      '</li>';
    }).join('');
    return '' +
      '<div class="tt-header">' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
          '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
        '<strong>' + WA.escapeHTML(grupo.cidade) + ', ' + WA.escapeHTML(grupo.uf) + '</strong>' +
      '</div>' +
      '<ul class="tt-list">' + entregas + '</ul>';
  }

  function formatDate(iso) {
    // 2025-12-10 → dez/2025
    var meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    var parts = iso.split('-');
    return meses[parseInt(parts[1], 10) - 1] + '/' + parts[0];
  }

  // ============== INTERAÇÃO ==============
  function bindInteracao(grupos) {
    var tooltip = document.getElementById('br-tooltip');
    var mapEl   = document.getElementById('br-map');
    if (!tooltip || !mapEl) return;

    var pins = mapEl.querySelectorAll('.br-pin');
    var activePin = null;

    function showFor(pin) {
      var idx = parseInt(pin.getAttribute('data-idx'), 10);
      var grupo = grupos[idx];
      if (!grupo) return;
      tooltip.innerHTML = buildTooltip(grupo);

      // Posição: relativa ao container do mapa, perto do pin
      var pinRect = pin.getBoundingClientRect();
      var contRect = mapEl.getBoundingClientRect();
      var x = pinRect.left + pinRect.width / 2 - contRect.left;
      var y = pinRect.top + pinRect.height / 2 - contRect.top;
      tooltip.style.left = x + 'px';
      tooltip.style.top  = y + 'px';

      // Decide se aparece à direita ou esquerda (espaço disponível)
      tooltip.classList.remove('tt-left', 'tt-right');
      if (x > contRect.width * 0.6) {
        tooltip.classList.add('tt-left');
      } else {
        tooltip.classList.add('tt-right');
      }
      tooltip.classList.add('open');

      // Marca pin como ativo
      pins.forEach(function (p) { p.classList.remove('active'); });
      pin.classList.add('active');
      activePin = pin;
    }

    function hide() {
      tooltip.classList.remove('open');
      if (activePin) activePin.classList.remove('active');
      activePin = null;
    }

    pins.forEach(function (pin) {
      pin.addEventListener('mouseenter', function () { showFor(pin); });
      pin.addEventListener('focus',      function () { showFor(pin); });
      pin.addEventListener('click', function (e) {
        e.stopPropagation();
        if (activePin === pin) { hide(); }
        else { showFor(pin); }
      });
    });

    // Fecha tooltip ao clicar fora ou Esc
    document.addEventListener('click', function (e) {
      if (activePin && !activePin.contains(e.target) && !tooltip.contains(e.target)) {
        hide();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hide();
    });

    // No mobile, hover não funciona — só click/focus já cobrem
    // mas vamos prevenir o "hover persistente" ao tocar
    mapEl.addEventListener('mouseleave', hide);
  }

  // ============== LISTA TEXTUAL ABAIXO DO MAPA ==============
  function renderLista() {
    var tbody = document.getElementById('entregas-tbody');
    if (!tbody) return;

    // Ordena por data desc
    var ordenadas = ENTREGAS.slice().sort(function (a, b) {
      return b.data.localeCompare(a.data);
    });

    tbody.innerHTML = ordenadas.map(function (e) {
      return '<tr>' +
        '<td>' + formatDate(e.data) + '</td>' +
        '<td>' + WA.escapeHTML(e.cidade) + ', ' + WA.escapeHTML(e.uf) + '</td>' +
        '<td>' + WA.escapeHTML(e.peca) + '</td>' +
        '<td>' + WA.escapeHTML(e.madeira) + '</td>' +
      '</tr>';
    }).join('');
  }

  // ============== CONTADORES ==============
  function renderContadores() {
    var uniqEstados = {};
    var uniqCidades = {};
    ENTREGAS.forEach(function (e) {
      uniqEstados[e.uf] = true;
      uniqCidades[e.cidade + '-' + e.uf] = true;
    });

    setText('count-pecas',   ENTREGAS.length);
    setText('count-cidades', Object.keys(uniqCidades).length);
    setText('count-estados', Object.keys(uniqEstados).length);
  }
  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ============== INIT ==============
  document.addEventListener('DOMContentLoaded', function () {
    var mapEl = document.getElementById('br-map');
    if (!mapEl) return;

    var grupos = agruparPorCidade(ENTREGAS);

    // Monta SVG: brasil + pins dentro do mesmo SVG
    var svg = brasilSvg();
    // Substitui </svg> final por <g class="pins">...</g></svg>
    svg = svg.replace('</svg>', '<g class="br-pins-layer">' + renderPins(grupos) + '</g></svg>');
    mapEl.innerHTML = svg + '<div id="br-tooltip" class="br-tooltip" role="dialog" aria-live="polite"></div>';

    bindInteracao(grupos);
    renderLista();
    renderContadores();
  });
})();
