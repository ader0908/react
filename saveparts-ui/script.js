/* Saveparts UI Interactions */
(() => {
  const grid = document.getElementById('grid');
  const loadMoreBtn = document.getElementById('loadMore');
  const sorter = document.getElementById('sorter');
  const chipBar = document.querySelector('.chip-bar');
  const navToggle = document.querySelector('.nav-toggle');
  const globalNav = document.getElementById('global-nav');

  // Demo dataset
  let page = 0;
  const pageSize = 12;
  const allItems = Array.from({ length: 60 }).map((_, i) => {
    const price = 30000 + (i % 7) * 15000 + (i * 133) % 9000;
    const conditions = ['new', 'used', 'refurb'];
    const cond = conditions[i % conditions.length];
    return {
      id: `part-${i + 1}`,
      title: `브레이크 패드 세트 ${i + 1}`,
      price,
      condition: cond,
      brand: ['Hyundai', 'Kia', 'GM', 'Toyota'][i % 4],
      model: ['Avante', 'Sonata', 'Sportage', 'Camry'][i % 4],
      year: 2018 + (i % 7),
      compat: i % 2 === 0 ? ['OEM'] : ['Aftermarket'],
      images: [1, 2, 3].map(n => `https://picsum.photos/seed/${i}-${n}/600/450`)
    };
  });

  const state = {
    filters: { brand: '', model: '', year: '', cond: [], compat: [] },
    sort: 'relevance',
    items: []
  };

  function formatPrice(krw) {
    return new Intl.NumberFormat('ko-KR').format(krw) + '원';
  }

  function badgeClass(condition) {
    return condition === 'new' ? 'new' : condition === 'used' ? 'used' : 'refurb';
  }

  function renderSkeletons(count = pageSize) {
    grid.setAttribute('aria-busy', 'true');
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const div = document.createElement('div');
      div.className = 'card skeleton collapsed';
      div.style.minHeight = '200px';
      div.style.gridColumn = 'span 12';
      grid.appendChild(div);
    }
  }

  function applySort(items) {
    const list = [...items];
    switch (state.sort) {
      case 'priceAsc':
        return list.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return list.sort((a, b) => b.price - a.price);
      case 'newest':
        return list.sort((a, b) => b.year - a.year);
      default:
        return list; // relevance (noop)
    }
  }

  function itemMatchesFilters(item) {
    const { brand, model, year, cond, compat } = state.filters;
    if (brand && item.brand !== brand) return false;
    if (model && item.model !== model) return false;
    if (year && item.year.toString() !== String(year)) return false;
    if (cond.length && !cond.includes(item.condition)) return false;
    if (compat.length) {
      const norm = item.compat.map(c => c.toLowerCase());
      if (!compat.some(c => norm.includes(c))) return false;
    }
    return true;
  }

  function renderChips() {
    chipBar.innerHTML = '';
    const { brand, model, year, cond, compat } = state.filters;
    const chips = [];
    if (brand) chips.push(['brand', brand]);
    if (model) chips.push(['model', model]);
    if (year) chips.push(['year', year]);
    cond.forEach(c => chips.push(['cond', c]));
    compat.forEach(c => chips.push(['compat', c]));

    for (const [k, v] of chips) {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.role = 'listitem';
      chip.innerHTML = `${v}<button class="remove" aria-label="${v} 필터 제거" data-key="${k}" data-value="${v}">✕</button>`;
      chipBar.appendChild(chip);
    }
  }

  function renderCards(items) {
    grid.innerHTML = '';
    grid.setAttribute('aria-busy', 'false');
    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card collapsed';
      card.role = 'listitem';
      card.tabIndex = 0;

      const media = document.createElement('div');
      media.className = 'media';
      media.style.background = `url(${item.images[0]}) center/cover`;

      const badgeWrap = document.createElement('div');
      badgeWrap.className = 'badge-wrap';
      const badge = document.createElement('span');
      badge.className = `badge ${badgeClass(item.condition)}`;
      badge.textContent = item.condition === 'new' ? '새상품' : item.condition === 'used' ? '중고' : '리퍼';
      badgeWrap.appendChild(badge);

      const gallery = document.createElement('div');
      gallery.className = 'gallery';
      item.images.slice(0, 3).forEach((img, idx) => {
        const t = document.createElement('div');
        t.className = 'thumb';
        t.style.background = `url(${img}) center/cover`;
        t.setAttribute('aria-label', `이미지 ${idx + 1}`);
        t.addEventListener('click', () => {
          media.style.background = `url(${img}) center/cover`;
        });
        gallery.appendChild(t);
      });

      media.appendChild(badgeWrap);
      media.appendChild(gallery);

      // 카드 헤더 (클릭 가능한 영역)
      const cardHeader = document.createElement('div');
      cardHeader.className = 'card-header';
      
      const content = document.createElement('div');
      content.className = 'content';
      const title = document.createElement('h3');
      title.className = 'title';
      title.textContent = item.title;

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = `<span>${item.brand} ${item.model}</span><span>${item.year}</span>`;

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = formatPrice(item.price);

      // 토글 버튼
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'card-toggle';
      toggleBtn.innerHTML = '▼';
      toggleBtn.setAttribute('aria-label', '상세정보 펼치기/접기');
      toggleBtn.setAttribute('aria-expanded', 'false');

      content.append(title, meta, price);
      cardHeader.append(content, toggleBtn);

      // 상세 정보 (접힘/펼침 영역)
      const cardDetails = document.createElement('div');
      cardDetails.className = 'card-details';

      const compat = document.createElement('div');
      compat.className = 'compat';
      item.compat.forEach(c => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = c;
        compat.appendChild(tag);
      });

      const actions = document.createElement('div');
      actions.className = 'actions';
      const add = document.createElement('button');
      add.className = 'btn secondary';
      add.textContent = '담기';
      const buy = document.createElement('button');
      buy.className = 'btn primary';
      buy.textContent = '구매';
      actions.append(add, buy);

      cardDetails.append(compat, actions);

      // 카드 구조 조립
      const cardContent = document.createElement('div');
      cardContent.style.flex = '1';
      cardContent.style.display = 'flex';
      cardContent.style.flexDirection = 'column';
      cardContent.append(cardHeader, cardDetails);

      card.append(media, cardContent);

      // 토글 이벤트
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isCollapsed = card.classList.contains('collapsed');
        card.classList.toggle('collapsed');
        toggleBtn.setAttribute('aria-expanded', String(isCollapsed));
        toggleBtn.innerHTML = isCollapsed ? '▲' : '▼';
      });

      // 카드 헤더 클릭으로도 토글 가능
      cardHeader.addEventListener('click', (e) => {
        if (e.target === toggleBtn) return;
        toggleBtn.click();
      });

      grid.appendChild(card);
    });
  }

  function applyFiltersAndRender({ append = false } = {}) {
    const filtered = allItems.filter(itemMatchesFilters);
    const sorted = applySort(filtered);
    const start = append ? state.items.length : 0;
    const end = start + pageSize;
    if (!append) state.items = [];
    state.items = state.items.concat(sorted.slice(start, end));
    renderCards(state.items);
    loadMoreBtn.style.display = state.items.length < sorted.length ? 'inline-flex' : 'none';
  }

  function syncFilterStateFromControls() {
    state.filters.brand = document.getElementById('brandFilter').value;
    state.filters.model = document.getElementById('modelFilter').value;
    state.filters.year = document.getElementById('yearFilter').value;
    state.filters.cond = Array.from(document.querySelectorAll('input[name="cond"]:checked')).map(
      (i) => i.value
    );
    state.filters.compat = Array.from(document.querySelectorAll('input[name="compat"]:checked')).map(
      (i) => i.value
    );
    renderChips();
  }

  function removeFilterChip(key, value) {
    if (key === 'brand') document.getElementById('brandFilter').value = '';
    if (key === 'model') document.getElementById('modelFilter').value = '';
    if (key === 'year') document.getElementById('yearFilter').value = '';
    if (key === 'cond') document.querySelector(`input[name="cond"][value="${value}"]`).checked = false;
    if (key === 'compat') document.querySelector(`input[name="compat"][value="${value}"]`).checked = false;
    syncFilterStateFromControls();
    applyFiltersAndRender();
  }

  // Events
  document.getElementById('applyFilters').addEventListener('click', () => {
    page = 0;
    syncFilterStateFromControls();
    applyFiltersAndRender();
  });

  document.getElementById('resetFilters').addEventListener('click', () => {
    document.getElementById('brandFilter').value = '';
    document.getElementById('modelFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.querySelectorAll('input[name="cond"]').forEach(i => (i.checked = false));
    document.querySelectorAll('input[name="compat"]').forEach(i => (i.checked = false));
    syncFilterStateFromControls();
    applyFiltersAndRender();
  });

  chipBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button.remove');
    if (!btn) return;
    removeFilterChip(btn.dataset.key, btn.dataset.value);
  });

  sorter.addEventListener('change', () => {
    state.sort = sorter.value;
    applyFiltersAndRender();
  });

  loadMoreBtn.addEventListener('click', () => {
    page += 1;
    applyFiltersAndRender({ append: true });
  });

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    globalNav.style.display = expanded ? 'none' : 'block';
  });

  // Initialize
  renderSkeletons();
  setTimeout(() => {
    syncFilterStateFromControls();
    applyFiltersAndRender();
  }, 500);
})();

