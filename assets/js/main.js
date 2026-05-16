/* =====================================================================
   WOOD & ART — main.js
   Utilitários compartilhados, navegação, formulário de orçamento.
   Modo estrito; sem dependências externas; sem eval/innerHTML com user input.
   ===================================================================== */
'use strict';

/* ---------- CONFIG GLOBAL ---------- */
window.WA = window.WA || {};
WA.config = {
  // Número de WhatsApp que recebe os orçamentos.
  // Formato internacional sem traços/espaços (único aceito por wa.me).
  // Para alterar, edite ESTE valor — único lugar.
  whatsappNumber: '5571981804578',
  businessName: 'Wood & Art',
  businessEmail: 'contato@woodeart.com.br',
};

/* ---------- UTIL: SANITIZAÇÃO E ESCAPE ---------- */
/**
 * Escapa HTML para inserção segura no DOM.
 * Usado sempre que dado de usuário ou de produto entra em innerHTML.
 */
WA.escapeHTML = function (str) {
  if (str == null) return '';
  return String(str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

/**
 * Limpa string para usar em URL de WhatsApp.
 * Remove caracteres de controle e limita tamanho.
 */
WA.sanitizeForWA = function (str) {
  if (str == null) return '';
  return String(str)
    .replace(/[\x00-\x1f\x7f]/g, '') // remove controles
    .trim()
    .slice(0, 2000);                  // limita tamanho da mensagem
};

/**
 * Monta link wa.me com mensagem pré-codificada.
 */
WA.buildWALink = function (message) {
  var msg = encodeURIComponent(WA.sanitizeForWA(message));
  return 'https://wa.me/' + WA.config.whatsappNumber + '?text=' + msg;
};

/* ---------- UTIL: FORMATADORES ---------- */
WA.formatCurrency = function (n) {
  if (typeof n !== 'number' || isNaN(n)) return 'R$ 0,00';
  return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

WA.formatDate = function (iso) {
  if (!iso) return '';
  var d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

WA.formatPhone = function (raw) {
  var d = String(raw || '').replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
  if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
  return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
};

WA.formatCEP = function (raw) {
  var d = String(raw || '').replace(/\D/g, '').slice(0, 8);
  if (d.length <= 5) return d;
  return d.slice(0, 5) + '-' + d.slice(5);
};

/* ---------- UTIL: TOAST ---------- */
WA.toast = function (message, type) {
  var el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  var icon = type === 'error'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
  el.className = 'toast' + (type === 'error' ? ' error' : '');
  el.innerHTML = icon + '<span></span>';
  el.querySelector('span').textContent = message;
  // Trigger reflow so transition runs even on second toast.
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(WA._toastTimer);
  WA._toastTimer = setTimeout(function () { el.classList.remove('show'); }, 4200);
};

/* ---------- NAV: scroll + mobile menu ---------- */
function initNav() {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (!nav) return;

  // Sombra ao rolar
  var onScroll = function () {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Fecha ao clicar num link
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ---------- FAB WHATSAPP ---------- */
function initFabWA() {
  var fab = document.querySelector('.fab-wa');
  if (!fab) return;
  if (!fab.getAttribute('href')) {
    var msg = 'Olá! Vim pelo site da ' + WA.config.businessName + ' e gostaria de mais informações.';
    fab.setAttribute('href', WA.buildWALink(msg));
  }
}

/* ---------- FORMULÁRIO DE ORÇAMENTO ----------
   Funcional de verdade: valida, sanitiza, monta a mensagem
   e abre o WhatsApp com tudo pré-preenchido.
   Funciona em GitHub Pages — não precisa de backend.
-------------------------------------------------*/
function initQuoteForm() {
  var form = document.getElementById('quoteForm');
  if (!form) return;

  // Máscaras leves de telefone e CEP (sem libs)
  var tel = form.querySelector('input[name="telefone"]');
  if (tel) tel.addEventListener('input', function () { tel.value = WA.formatPhone(tel.value); });
  var cep = form.querySelector('input[name="cep"]');
  if (cep) cep.addEventListener('input', function () { cep.value = WA.formatCEP(cep.value); });

  // Limpa estado de erro ao digitar
  form.addEventListener('input', function (e) {
    if (e.target.hasAttribute('aria-invalid')) e.target.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot — campo invisível pra humanos. Se preenchido, é bot.
    var hp = form.querySelector('input[name="website"]');
    if (hp && hp.value) {
      // Finge sucesso para não dar pista ao bot.
      WA.toast('Mensagem enviada com sucesso.');
      form.reset();
      return;
    }

    // Coleta valores
    var data = {};
    var fd = new FormData(form);
    fd.forEach(function (v, k) { data[k] = String(v).trim(); });

    // Validação
    var errors = validateQuote(data);
    if (errors.length) {
      errors.forEach(function (name) {
        var f = form.querySelector('[name="' + name + '"]');
        if (f) f.setAttribute('aria-invalid', 'true');
      });
      var first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      WA.toast('Verifique os campos destacados.', 'error');
      return;
    }

    // Monta mensagem
    var lines = [];
    lines.push('*Solicitação de orçamento — ' + WA.config.businessName + '*');
    lines.push('');
    lines.push('*Nome:* ' + data.nome);
    lines.push('*E-mail:* ' + data.email);
    if (data.telefone) lines.push('*Telefone:* ' + data.telefone);
    if (data.cidade)   lines.push('*Cidade:* ' + data.cidade);
    if (data.cep)      lines.push('*CEP:* ' + data.cep);
    lines.push('*Tipo de peça:* ' + getTipoLabel(data['tipo-peca']));
    if (data.prazo)    lines.push('*Prazo desejado:* ' + data.prazo);
    if (data.orcamento) lines.push('*Faixa de orçamento:* ' + data.orcamento);
    lines.push('');
    lines.push('*Detalhes:*');
    lines.push(data.observacoes);

    var url = WA.buildWALink(lines.join('\n'));

    // Feedback visual
    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Abrindo WhatsApp…';
    }

    // Abre o WhatsApp em nova aba
    var win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) {
      // Pop-up bloqueado: redireciona a aba atual
      window.location.href = url;
    }

    setTimeout(function () {
      if (btn) { btn.disabled = false; btn.innerHTML = originalText; }
      WA.toast('Pedido pronto no WhatsApp. Só clicar em enviar lá.');
      form.reset();
    }, 600);
  });
}

function validateQuote(data) {
  var errors = [];
  if (!data.nome || data.nome.length < 3) errors.push('nome');
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('email');
  if (!data['tipo-peca']) errors.push('tipo-peca');
  if (!data.observacoes || data.observacoes.length < 10) errors.push('observacoes');
  return errors;
}

function getTipoLabel(value) {
  var map = {
    'utensilio': 'Utensílio (tábua, etc)',
    'movel': 'Móvel (mesa, cadeira, etc)',
    'organizacao': 'Organização (prateleira, nicho)',
    'jardinagem': 'Jardinagem (suporte, vaso)',
    'decoracao': 'Decoração',
    'planta': 'Planta viva',
    'outro': 'Outro'
  };
  return map[value] || value || 'Não especificado';
}

/* ---------- COMPARTILHAMENTO E ORÇAMENTO RÁPIDO POR PRODUTO ----------
   Expostos no escopo global para uso em onclick declarativo (sem eval).
-------------------------------------------------*/
WA.quoteForProduct = function (productId) {
  if (typeof window.productsDB === 'undefined') return;
  var p = window.productsDB.find(function (x) { return x.id === productId; });
  if (!p) return;
  var lines = [];
  lines.push('Olá! Vim pelo site e gostaria de um orçamento para o produto:');
  lines.push('');
  lines.push('*' + p.nome + '*');
  lines.push('Categoria: ' + (p.categoria || ''));
  if (p.preco) lines.push('Preço de referência: ' + WA.formatCurrency(p.preco));
  if (p.sku)   lines.push('SKU: ' + p.sku);
  lines.push('');
  lines.push('Poderia me passar mais informações?');
  window.open(WA.buildWALink(lines.join('\n')), '_blank', 'noopener,noreferrer');
};

WA.shareProduct = function (platform, productName, productUrl) {
  var url = encodeURIComponent(productUrl || window.location.href);
  var title = encodeURIComponent(productName || document.title);
  var map = {
    facebook:  'https://www.facebook.com/sharer/sharer.php?u=' + url,
    twitter:   'https://twitter.com/intent/tweet?text=' + title + '&url=' + url,
    pinterest: 'https://pinterest.com/pin/create/button/?url=' + url + '&description=' + title,
    whatsapp:  'https://wa.me/?text=' + title + '%20' + url
  };
  var shareUrl = map[platform];
  if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
};

WA.copyLink = function () {
  var url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function () {
      WA.toast('Link copiado!');
    }).catch(function () {
      WA.toast('Não foi possível copiar.', 'error');
    });
  } else {
    // Fallback antigo
    var ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); WA.toast('Link copiado!'); }
    catch (e) { WA.toast('Não foi possível copiar.', 'error'); }
    document.body.removeChild(ta);
  }
};

/* ---------- ANO NO FOOTER ---------- */
function initYear() {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initFabWA();
  initQuoteForm();
  initYear();
});
