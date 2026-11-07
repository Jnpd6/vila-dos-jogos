/**
 * VILA DOS JOGOS — Script Principal
 * - Controla a transição da Tela de Abertura ("JOGAR") para a Tela Principal
 * - Renderiza as janelas reservadas para os futuros jogos (sem diminutivos e sem emojis)
 * - Filtra pelas categorias do cabeçalho e pela barra de busca
 */

const GAME_SLOTS = [
  {
    id: 'slot-01',
    slotNumber: 'Jogo 01',
    title: 'Fazenda das Palavras',
    category: 'portugues',
    categoryLabel: 'Português',
    audience: 'Infantil (6 a 10 anos)',
    themeClass: 'theme-portugues',
    description: 'Desafio educativo de formar sílabas, rimas e vocabulário na fazenda.'
  },
  {
    id: 'slot-02',
    slotNumber: 'Jogo 02',
    title: 'Colheita da Matemática',
    category: 'matematica',
    categoryLabel: 'Matemática',
    audience: 'Infantil e Jovens',
    themeClass: 'theme-matematica',
    description: 'Desafios dinâmicos de somar, multiplicar e organizar a produção do pomar.'
  },
  {
    id: 'slot-03',
    slotNumber: 'Jogo 03',
    title: 'Fliperama do Bosque',
    category: 'nostalgia',
    categoryLabel: 'Nostalgia e Retrô',
    audience: 'Jovens e Adultos',
    themeClass: 'theme-nostalgia',
    description: 'Jogo clássico em estilo arcade dos anos 90 e 2000 para recordar bons momentos.'
  },
  {
    id: 'slot-04',
    slotNumber: 'Jogo 04',
    title: 'Green Café English',
    category: 'ingles',
    categoryLabel: 'Inglês',
    audience: 'Todas as idades',
    themeClass: 'theme-ingles',
    description: 'Aprenda vocabulário e expressões em inglês preparando pedidos no café da vila.'
  },
  {
    id: 'slot-05',
    slotNumber: 'Jogo 05',
    title: 'Recanto dos Animais',
    category: 'infantil',
    categoryLabel: 'Infantil',
    audience: 'Crianças',
    themeClass: 'theme-infantil',
    description: 'Jogo tranquilo de cuidar da fazenda, explorar cenários e personalizar mascotes.'
  },
  {
    id: 'slot-06',
    slotNumber: 'Jogo 06',
    title: 'Trilha de Ladrilhos e Memória',
    category: 'passatempos',
    categoryLabel: 'Quebra-Cabeças',
    audience: 'Jovens e Adultos',
    themeClass: 'theme-passatempos',
    description: 'Passatempo relaxante de lógica, memória visual e combinação estratégica de peças.'
  },
  {
    id: 'slot-07',
    slotNumber: 'Jogo 07',
    title: 'Corrida Clássica na Estrada',
    category: 'nostalgia',
    categoryLabel: 'Nostalgia e Retrô',
    audience: 'Adolescentes e Adultos',
    themeClass: 'theme-nostalgia',
    description: 'Clássico desafio de reflexo rápido e velocidade pelas estradas do interior.'
  },
  {
    id: 'slot-08',
    slotNumber: 'Jogo 08',
    title: 'Desafio da Tabuada',
    category: 'matematica',
    categoryLabel: 'Matemática',
    audience: 'Educativo (7 a 12 anos)',
    themeClass: 'theme-matematica',
    description: 'Pratique raciocínio rápido e cálculo mental resolvendo enigmas matemáticos.'
  },
  {
    id: 'slot-09',
    slotNumber: 'Jogo 09',
    title: 'Novo Jogo em Breve',
    category: 'infantil',
    categoryLabel: 'Em Breve',
    audience: 'Todos os Públicos',
    themeClass: 'theme-infantil',
    description: 'Espaço preparado para receber um novo lançamento da Vila dos Jogos.'
  }
];

const CATEGORY_INFO = {
  todos: {
    title: 'Todos os Jogos da Vila',
    desc: 'Escolha uma opção abaixo para explorar os jogos para crianças, jovens e adultos.'
  },
  infantil: {
    title: 'Jogos Infantis',
    desc: 'Jogos seguros, criativos e acolhedores voltados para o público infantil.'
  },
  nostalgia: {
    title: 'Nostalgia e Retrô',
    desc: 'Clássicos inspirados nos portais dos anos 2000 e fliperamas para jovens e adultos.'
  },
  matematica: {
    title: 'Lições de Matemática',
    desc: 'Pratique operações, lógica e números de forma interativa nos desafios da vila.'
  },
  portugues: {
    title: 'Lições de Português',
    desc: 'Jogos educativos de palavras, leitura, sílabas e interpretação.'
  },
  ingles: {
    title: 'Lições de Inglês',
    desc: 'Aprenda novas palavras e frases em inglês de um jeito prático e acessível.'
  },
  passatempos: {
    title: 'Quebra-Cabeças e Passatempos',
    desc: 'Jogos relaxantes de memória, atenção e raciocínio para todas as idades.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const splashScreen = document.getElementById('splash-screen');
  const portalScreen = document.getElementById('portal-screen');
  const btnEnterPortal = document.getElementById('btn-enter-portal');
  const btnBackSplash = document.getElementById('btn-back-splash');
  const gamesGrid = document.getElementById('games-grid');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const searchInput = document.getElementById('game-search-input');
  const currentCatTitle = document.getElementById('current-category-title');
  const currentCatDesc = document.getElementById('current-category-desc');
  const visibleSlotsCount = document.getElementById('visible-slots-count');

  // Modal Elements
  const slotModal = document.getElementById('game-slot-modal');
  const modalBackdropClose = document.getElementById('modal-backdrop-close');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnModalBack = document.getElementById('btn-modal-back');
  const modalGameBadge = document.getElementById('modal-game-badge');
  const modalGameTitle = document.getElementById('modal-game-title');
  const modalGameDesc = document.getElementById('modal-game-desc');

  let activeCategory = 'todos';
  let searchQuery = '';

  // 1. Transição da Tela de Abertura -> Tela Principal
  btnEnterPortal.addEventListener('click', () => {
    splashScreen.classList.add('fade-out');
    portalScreen.classList.remove('hidden');
    setTimeout(() => {
      splashScreen.classList.add('hidden');
    }, 520);
  });

  // Voltar para a Tela de Abertura
  btnBackSplash.addEventListener('click', () => {
    splashScreen.classList.remove('hidden');
    requestAnimationFrame(() => {
      splashScreen.classList.remove('fade-out');
    });
    portalScreen.classList.add('hidden');
  });

  // 2. Renderização das Janelas dos Jogos
  function renderGameSlots() {
    const filtered = GAME_SLOTS.filter((item) => {
      const matchesCat = activeCategory === 'todos' || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.categoryLabel.toLowerCase().includes(searchQuery);
      return matchesCat && matchesSearch;
    });

    visibleSlotsCount.textContent = filtered.length;
    gamesGrid.innerHTML = '';

    if (filtered.length === 0) {
      gamesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; border: 2.5px dashed #a67c52; border-radius: 20px; background: #fffdf5;">
          <h3 style="font-family: var(--font-display); color: var(--wood-dark);">Nenhum jogo encontrado</h3>
          <p style="color: var(--wood-brown); margin-top: 0.25rem;">Tente buscar outro termo ou selecione "Todos" no topo.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((slot) => {
      const card = document.createElement('article');
      card.className = 'game-window-card';
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <div class="game-win-topbar">
          <div class="game-win-dots" aria-hidden="true">
            <span class="win-dot red"></span>
            <span class="win-dot yellow"></span>
            <span class="win-dot green"></span>
          </div>
          <span class="game-slot-tag">${slot.slotNumber}</span>
        </div>

        <div class="game-thumbnail-slot ${slot.themeClass}">
          <span class="slot-reserved-stamp">Em Breve</span>
        </div>

        <div class="game-win-body">
          <div class="game-audience-row">
            <span class="game-cat-pill">${slot.categoryLabel}</span>
            <span class="game-age-pill">${slot.audience}</span>
          </div>
          <h3 class="game-win-title">${slot.title}</h3>
          <p class="game-win-desc">${slot.description}</p>
          <button type="button" class="btn-card-slot">
            <span>Abrir Jogo</span>
          </button>
        </div>
      `;

      card.addEventListener('click', () => openSlotModal(slot));
      gamesGrid.appendChild(card);
    });
  }

  // 3. Filtro por Categorias do Cabeçalho
  function setCategory(catKey) {
    activeCategory = catKey;
    categoryTabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.category === catKey);
    });

    const info = CATEGORY_INFO[catKey] || CATEGORY_INFO.todos;
    currentCatTitle.textContent = info.title;
    currentCatDesc.textContent = info.desc;

    renderGameSlots();
  }

  categoryTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setCategory(tab.dataset.category);
    });
  });

  // Botão Todos no topo reseta filtro
  document.querySelectorAll('[data-reset-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      setCategory('todos');
    });
  });

  document.getElementById('logo-home-click').addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    setCategory('todos');
  });

  // 4. Busca em tempo real
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderGameSlots();
  });

  // 5. Modal da Janela do Jogo
  function openSlotModal(slot) {
    modalGameBadge.textContent = `${slot.categoryLabel} • ${slot.audience}`;
    modalGameTitle.textContent = slot.title;
    modalGameDesc.textContent = slot.description;
    slotModal.classList.remove('hidden');
  }

  function closeSlotModal() {
    slotModal.classList.add('hidden');
  }

  btnCloseModal.addEventListener('click', closeSlotModal);
  btnModalBack.addEventListener('click', closeSlotModal);
  modalBackdropClose.addEventListener('click', closeSlotModal);

  // Inicializa a grade de jogos
  renderGameSlots();
});
