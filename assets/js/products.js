/* =====================================================================
   WOOD & ART — products.js
   Banco de produtos. Estrutura preservada do site original.
   ===================================================================== */
'use strict';

window.productsDB = [
  // ====== UTENSÍLIOS ======
  {
    id: 1,
    nome: 'Tábua de Corte Profissional',
    slug: 'tabua-corte-profissional',
    categoria: 'utensilios',
    subcategoria: 'tabuas-corte',
    descricao: 'Tábua em madeira maciça com acabamento em óleo mineral, sulco para líquidos e pés antiderrapantes.',
    descricao_completa: '<p>Tábua de madeira maciça com azulejo personalizado, ideal para quem valoriza qualidade e estética na cozinha. Livre de BPA, segura para o preparo de alimentos.</p><ul><li>Madeira nobre</li><li>Dimensões: 50 × 15 × 2 cm</li><li>Acabamento com óleo mineral</li><li>Pés antiderrapantes</li><li>Sulco para coleta de líquidos</li></ul>',
    imagens: ['assets/images/produtos/tabua-corte-1.jpg', 'assets/images/produtos/tabua-corte-2.jpg', 'assets/images/produtos/tabua-corte-3.jpg'],
    tags: ['madeira', 'corte', 'cozinha', 'demolição'],
    preco: 139.90,
    destaque: true,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-4361324291-tabua-de-madeira-macica-50x155x2cm-cazulejo-personalizado-_JM',
    estoque: 15, sku: 'TC-001', peso: '1.2kg', dimensoes: '50×15×2 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 2,
    nome: 'Tábua de Servir com Alça',
    slug: 'tabua-servir-alca',
    categoria: 'utensilios',
    subcategoria: 'tabuas-servir',
    descricao: 'Tábua em freijó com alça de couro, perfeita para queijos e frios. Acabamento com cera natural.',
    descricao_completa: '<p>Elegante e funcional, ideal para apresentação de queijos, frios e petiscos.</p><ul><li>Madeira freijó</li><li>Dimensões: 35 × 20 × 2 cm</li><li>Alça em couro legítimo</li><li>Acabamento com cera de abelha</li></ul>',
    imagens: ['assets/images/produtos/tabua-servir-1.jpg', 'assets/images/produtos/tabua-servir-2.jpg'],
    tags: ['servir', 'queijos', 'frios', 'couro'],
    preco: 129.90,
    destaque: true,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-9876543210-tabua-servir-freijo-alca-couro-_JM',
    estoque: 8, sku: 'TS-002', peso: '0.9kg', dimensoes: '35×20×2 cm', prazo_fabricacao: '12 dias'
  },

  // ====== MOBILIÁRIO ======
  {
    id: 3,
    nome: 'Poltrona Rústica',
    slug: 'poltrona-rustica',
    categoria: 'mobiliario',
    subcategoria: 'poltronas',
    descricao: 'Madeira maciça com assento estofado em linho. Design atemporal para diversos estilos de decoração.',
    descricao_completa: '<p>Conforto e elegância em uma peça feita artesanalmente.</p><ul><li>Estrutura: madeira maciça (cedro)</li><li>Estofado: espuma D33 + linho</li><li>Acabamento: verniz fosco</li><li>Dimensões: 80 (A) × 70 (L) × 75 (P) cm</li><li>Peso máximo: 120 kg</li></ul>',
    imagens: ['assets/images/produtos/poltrona-1.jpg', 'assets/images/produtos/poltrona-2.jpg'],
    tags: ['poltrona', 'estar', 'conforto', 'linho'],
    preco: 890.00,
    destaque: true,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-1122334455-poltrona-rustica-madeira-macica-_JM',
    estoque: 3, sku: 'PL-003', peso: '15kg', dimensoes: '80×70×75 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 4,
    nome: 'Banco Orgânico',
    slug: 'banco-organico',
    categoria: 'mobiliario',
    subcategoria: 'bancos',
    descricao: 'Banco em tronco maciço com acabamento natural. Peça única, esculpida à mão.',
    descricao_completa: '<p>Cada banco é único, preservando as marcas naturais da madeira.</p><ul><li>Tronco maciço de imbuia</li><li>Acabamento em resina ecológica</li><li>Altura: 45 cm</li><li>Diâmetro: ~35 cm</li></ul>',
    imagens: ['assets/images/produtos/banco-1.jpg'],
    tags: ['banco', 'rústico', 'orgânico', 'tronco'],
    preco: 450.00,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-9988776655-banco-organico-tronco-macico-_JM',
    estoque: 2, sku: 'BN-004', peso: '8kg', dimensoes: '45×35×35 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 5,
    nome: 'Mesa de Jantar 6 lugares',
    slug: 'mesa-jantar-6-lugares',
    categoria: 'mobiliario',
    subcategoria: 'mesas',
    descricao: 'Mesa em madeira maciça com tampo de 2 metros. Ideal para famílias que recebem.',
    descricao_completa: '<p>Mesa imponente para momentos especiais.</p><ul><li>Carvalho maciço</li><li>Dimensões: 200 × 100 × 76 cm</li><li>Acabamento em verniz marítimo</li><li>Base em formato X</li></ul>',
    imagens: ['assets/images/produtos/mesa-1.jpg', 'assets/images/produtos/mesa-2.jpg'],
    tags: ['mesa', 'jantar', '6 lugares', 'carvalho'],
    preco: 1890.00,
    destaque: true,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-5544332211-mesa-jantar-carvalho-6-lugares-_JM',
    estoque: 2, sku: 'MS-005', peso: '45kg', dimensoes: '200×100×76 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 6,
    nome: 'Cadeira Retrô',
    slug: 'cadeira-retro',
    categoria: 'mobiliario',
    subcategoria: 'cadeiras',
    descricao: 'Design retrô em madeira e palhinha. Conforto e estilo para a sala de jantar.',
    descricao_completa: '<p>Inspirada nas cadeiras dos anos 50, combina tradição e conforto.</p><ul><li>Freijó com palhinha natural</li><li>Acabamento em cera incolor</li><li>Dimensões: 85 × 45 × 50 cm</li><li>Empilhável</li></ul>',
    imagens: ['assets/images/produtos/cadeira-1.jpg'],
    tags: ['cadeira', 'retrô', 'palhinha', 'jantar'],
    preco: 390.00,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-6677889900-cadeira-retro-palhinha-freijo-_JM',
    estoque: 12, sku: 'CD-006', peso: '5kg', dimensoes: '85×45×50 cm', prazo_fabricacao: '12 dias'
  },

  // ====== ORGANIZAÇÃO ======
  {
    id: 7,
    nome: 'Prateleira Flutuante',
    slug: 'prateleira-flutuante',
    categoria: 'organizacao',
    subcategoria: 'prateleiras',
    descricao: 'Prateleira em carvalho de 1,20 m. Sistema invisível de fixação.',
    descricao_completa: '<p>Visual clean e moderno para qualquer ambiente.</p><ul><li>Carvalho</li><li>Dimensões: 120 × 20 × 2,5 cm</li><li>Sistema de fixação invisível</li><li>Suporta até 15 kg</li></ul>',
    imagens: ['assets/images/produtos/prateleira-1.jpg'],
    tags: ['prateleira', 'flutuante', 'organização', 'carvalho'],
    preco: 249.00,
    destaque: true,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-2233445566-prateleira-flutuante-carvalho-120m-_JM',
    estoque: 10, sku: 'PR-007', peso: '3.5kg', dimensoes: '120×20×2,5 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 8,
    nome: 'Móvel Multiuso',
    slug: 'movel-multiuso',
    categoria: 'organizacao',
    subcategoria: 'moveis',
    descricao: 'Móvel com prateleiras e gavetas, sob medida. Para sala ou escritório.',
    descricao_completa: '<p>Versátil e funcional, adapta-se a diferentes necessidades.</p><ul><li>Compensado naval com acabamento em freijó</li><li>3 prateleiras reguláveis</li><li>2 gavetas com corrediças metálicas</li><li>Dimensões: 150 × 40 × 80 cm</li></ul>',
    imagens: ['assets/images/produtos/movel-1.jpg'],
    tags: ['móvel', 'organização', 'gavetas', 'escritório'],
    preco: 1250.00,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-3344556677-movel-multiuso-prateleiras-gavetas-_JM',
    estoque: 3, sku: 'MV-008', peso: '35kg', dimensoes: '150×40×80 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 9,
    nome: 'Nicho Decorativo',
    slug: 'nicho-decorativo',
    categoria: 'organizacao',
    subcategoria: 'nichos',
    descricao: 'Conjunto de 3 nichos geométricos para parede. Decoração e organização.',
    descricao_completa: '<p>Composição moderna para destacar objetos decorativos.</p><ul><li>MDF reflorestado</li><li>Acabamento em laca fosca</li><li>3 peças com formatos diferentes</li></ul>',
    imagens: ['assets/images/produtos/nicho-1.jpg'],
    tags: ['nicho', 'decoração', 'geométrico', 'parede'],
    preco: 189.00,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-4455667788-nichos-geometricos-decorativos-3pcs-_JM',
    estoque: 20, sku: 'NC-009', peso: '2.8kg', dimensoes: 'Varia por peça', prazo_fabricacao: '12 dias'
  },

  // ====== JARDINAGEM ======
  {
    id: 10,
    nome: 'Suporte para Plantas Triplo',
    slug: 'suporte-plantas-triplo',
    categoria: 'jardinagem',
    subcategoria: 'suportes-plantas',
    descricao: 'Estrutura em madeira para 3 vasos. Ideal para varandas e jardins.',
    descricao_completa: '<p>Organize suas plantas com estilo.</p><ul><li>Eucalipto tratado</li><li>Altura: 120 cm</li><li>3 níveis para vasos de até 25 cm</li><li>Desmontável</li></ul>',
    imagens: ['assets/images/produtos/suporte-planta-1.jpg'],
    tags: ['suporte', 'plantas', 'jardinagem', 'varanda'],
    preco: 159.00,
    destaque: true,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-5566778899-suporte-plantas-madeira-3-vasos-_JM',
    estoque: 7, sku: 'SP-010', peso: '4.2kg', dimensoes: '50×50×120 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 11,
    nome: 'Casa de Pássaro Decorativa',
    slug: 'casa-passaro-decorativa',
    categoria: 'jardinagem',
    subcategoria: 'casa-passaro',
    descricao: 'Casa de pássaro em madeira com telhado ecológico. Peça charmosa para jardim.',
    descricao_completa: '<p>Abrigo e objeto decorativo.</p><ul><li>Pinus</li><li>Telhado ecológico (fibra de coco)</li><li>Altura: 25 cm</li><li>Verniz atóxico</li></ul>',
    imagens: ['assets/images/produtos/casa-passaro-1.jpg'],
    tags: ['pássaro', 'jardim', 'decoração', 'ecológico'],
    preco: 79.90,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-6677889901-casa-passaro-madeira-telhado-ecologico-_JM',
    estoque: 15, sku: 'CP-011', peso: '0.8kg', dimensoes: '25×20×20 cm', prazo_fabricacao: '12 dias'
  },

  // ====== DECORAÇÃO ======
  {
    id: 12,
    nome: 'Vaso de Gesso Natural',
    slug: 'vaso-gesso-natural',
    categoria: 'decoracao',
    subcategoria: 'vasos-gesso',
    descricao: 'Vaso artesanal em gesso com textura orgânica. Peça única feita à mão.',
    descricao_completa: '<p>Textura rústica e acabamento artesanal.</p><ul><li>Gesso de alta densidade</li><li>Textura orgânica com cera</li><li>Altura: 15 cm</li><li>Diâmetro: 12 cm</li></ul>',
    imagens: ['assets/images/produtos/vaso-gesso-1.jpg'],
    tags: ['vaso', 'gesso', 'decoração', 'artesanal'],
    preco: 45.00,
    destaque: true,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-7788990011-vaso-gesso-artesanal-textura-organica-_JM',
    estoque: 25, sku: 'VG-012', peso: '0.5kg', dimensoes: '15×12 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 13,
    nome: 'Vaso de Argamassa',
    slug: 'vaso-argamassa',
    categoria: 'decoracao',
    subcategoria: 'vasos-argamassa',
    descricao: 'Vaso em argamassa com acabamento cimentício. Estilo industrial e moderno.',
    descricao_completa: '<p>Acabamento cimentício contemporâneo.</p><ul><li>Argamassa com pigmento</li><li>Efeito cimento queimado</li><li>Altura: 18 cm</li><li>Base com feltro antirrisco</li></ul>',
    imagens: ['assets/images/produtos/vaso-argamassa-1.jpg'],
    tags: ['argamassa', 'cimento', 'moderno', 'industrial'],
    preco: 65.00,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-8899001122-vaso-argamassa-cimento-queimado-_JM',
    estoque: 18, sku: 'VA-013', peso: '1.2kg', dimensoes: '18×15 cm', prazo_fabricacao: '12 dias'
  },

  // ====== PLANTAS VIVAS (regional) ======
  {
    id: 14,
    nome: 'Arranjo de Suculentas',
    slug: 'arranjo-suculentas',
    categoria: 'plantas-vivas',
    subcategoria: 'arranjos-vivos',
    descricao: 'Arranjo com diversas suculentas em vaso de cerâmica. Plantas vivas e saudáveis.',
    descricao_completa: '<p>Mini jardim de suculentas.</p><ul><li>Vaso de cerâmica esmaltada (10 cm)</li><li>5 a 7 mudas de diferentes espécies</li><li>Camada de drenagem com argila expandida</li></ul><p><strong>⚠ Entrega apenas para Salvador e Região Metropolitana.</strong></p>',
    imagens: ['assets/images/produtos/arranjo-suculentas.jpg'],
    tags: ['suculentas', 'vivas', 'arranjo', 'jardim'],
    preco: 120.00,
    regional: true,
    regioes: ['BA', 'Salvador', 'Região Metropolitana'],
    destaque: true,
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-9900112233-arranjo-suculentas-vaso-ceramica-_JM',
    estoque: 5, sku: 'AS-014', peso: '0.8kg', dimensoes: '10×10×15 cm', prazo_fabricacao: '12 dias'
  },
  {
    id: 15,
    nome: 'Mini Jardim Terrário',
    slug: 'mini-jardim-terrario',
    categoria: 'plantas-vivas',
    subcategoria: 'arranjos-vivos',
    descricao: 'Mini jardim em terrário de vidro com plantas vivas. Ecossistema fechado.',
    descricao_completa: '<p>Ecossistema em miniatura para dentro de casa.</p><ul><li>Vidro soprado (20 cm altura)</li><li>Mini samambaias, musgos e fitônias</li><li>Camadas: pedriscos, carvão ativado, terra</li></ul><p><strong>⚠ Entrega apenas para Salvador e Região Metropolitana.</strong></p>',
    imagens: ['assets/images/produtos/terrario.jpg'],
    tags: ['terrário', 'jardim', 'mini', 'vidro'],
    preco: 150.00,
    regional: true,
    regioes: ['BA', 'Salvador', 'Região Metropolitana'],
    mercado_livre_url: 'https://produto.mercadolivre.com.br/MLB-0011223344-mini-jardim-terrario-vidro-_JM',
    estoque: 3, sku: 'TJ-015', peso: '1.5kg', dimensoes: '20×15 cm', prazo_fabricacao: '12 dias'
  }
];

/* ---------- Mapeamentos de exibição ---------- */
window.CATEGORIAS = {
  utensilios: 'Utensílios',
  mobiliario: 'Mobiliário',
  organizacao: 'Organização',
  jardinagem: 'Jardinagem',
  decoracao: 'Decoração',
  'plantas-vivas': 'Plantas Vivas'
};

window.SUBCATEGORIAS = {
  'tabuas-corte': 'Tábuas de Corte',
  'tabuas-servir': 'Tábuas de Servir',
  'poltronas': 'Poltronas',
  'bancos': 'Bancos',
  'mesas': 'Mesas',
  'cadeiras': 'Cadeiras',
  'prateleiras': 'Prateleiras',
  'moveis': 'Móveis',
  'nichos': 'Nichos',
  'suportes-plantas': 'Suportes para Plantas',
  'casa-passaro': 'Casas de Pássaro',
  'vasos-gesso': 'Vasos de Gesso',
  'vasos-argamassa': 'Vasos de Argamassa',
  'arranjos-vivos': 'Arranjos Vivos'
};

/* ---------- Helpers expostos ---------- */
WA = window.WA || {};

WA.getCategoria = function (k) { return window.CATEGORIAS[k] || k; };
WA.getSubcategoria = function (k) { return window.SUBCATEGORIAS[k] || k; };

/**
 * Placeholder SVG (data URL) — usado quando a imagem de produto não existe ainda.
 * Cada categoria tem uma paleta própria, e a ilustração varia por tipo.
 */
WA.productPlaceholder = function (product) {
  var palettes = {
    utensilios:    { bg: '#d4b896', fg: '#2a1f17' },
    mobiliario:    { bg: '#a8784e', fg: '#2a1f17' },
    organizacao:   { bg: '#c4a27a', fg: '#2a1f17' },
    jardinagem:    { bg: '#9cb08b', fg: '#2a1f17' },
    decoracao:     { bg: '#c7aa8e', fg: '#2a1f17' },
    'plantas-vivas': { bg: '#8ba88b', fg: '#2a1f17' }
  };
  var glyphs = {
    utensilios: '<rect x="120" y="140" width="160" height="14" rx="2" fill="currentColor" opacity=".5"/><circle cx="130" cy="147" r="5" fill="currentColor" opacity=".4"/>',
    mobiliario: '<rect x="120" y="120" width="160" height="8" fill="currentColor" opacity=".5"/><rect x="130" y="128" width="6" height="40" fill="currentColor" opacity=".5"/><rect x="264" y="128" width="6" height="40" fill="currentColor" opacity=".5"/>',
    organizacao: '<rect x="120" y="120" width="160" height="40" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/><line x1="120" y1="140" x2="280" y2="140" stroke="currentColor" stroke-width="2" opacity=".5"/>',
    jardinagem: '<path d="M200 90 Q 180 130 200 170 Q 220 130 200 90" fill="currentColor" opacity=".5"/><path d="M170 130 Q 200 150 230 130" stroke="currentColor" stroke-width="2" fill="none" opacity=".5"/>',
    decoracao: '<path d="M170 110 Q 200 100 230 110 L 225 180 Q 200 190 175 180 Z" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/>',
    'plantas-vivas': '<path d="M195 170 L 195 110 Q 180 90 200 80 Q 220 90 205 110 L 205 170" fill="currentColor" opacity=".5"/>'
  };
  var p = palettes[product.categoria] || palettes.mobiliario;
  var glyph = glyphs[product.categoria] || glyphs.mobiliario;
  var name = WA.escapeHTML(product.nome).slice(0, 40);
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">' +
    '<rect width="400" height="300" fill="' + p.bg + '"/>' +
    '<g color="' + p.fg + '">' + glyph + '</g>' +
    '<text x="200" y="240" font-family="Georgia, serif" font-size="14" text-anchor="middle" fill="' + p.fg + '" opacity="0.7">' + name + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};
