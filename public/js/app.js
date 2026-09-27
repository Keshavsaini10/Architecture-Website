/**
 * EXPLOREMORE STONES - Client Application Logic
 * Integrates with Express REST API Backend
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// App State
const state = {
  stones: [],
  filteredStones: [],
  currentCategory: 'All',
  architecture: [],
  timeline: [],
  activeEraIndex: 0,
  applications: {},
  currentAppTab: 'modern',
  gallery: [],
  selectedStone: null,
  activeVisualizerStone: null,
  activeVisualizerApp: 'flooring',
  activeVisualizerFinish: 'polished'
};

async function initApp() {
  setupNavbar();
  setupHero();
  await loadStones();
  await loadArchitecture();
  await loadTimeline();
  await loadApplications();
  await loadVisualizerPresets();
  await loadGallery();
  await loadStats();
  setupNewsletter();
  setupInquiryModal();
  setupSearchModal();
  setupVisualizerControls();
}

/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = 'gold') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-gem';
  toast.innerHTML = `<i class="fas ${icon}" style="color: var(--gold);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ==========================================================================
   NAVBAR & SCROLL
   ========================================================================== */
function setupNavbar() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          const headerHeight = header.offsetHeight;
          const targetPos = targetElem.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 200;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ==========================================================================
   HERO SLIDER
   ========================================================================== */
function setupHero() {
  const heroSlides = [
    {
      title: "India's Heritage, Carved in Stone.",
      badge: "TIMELESS. NATURAL. INDIAN.",
      desc: "Discover timeless Indian marble, sandstone and granite crafted for architecture that lasts for generations.",
      image: "/assets/images/hero_taj_mahal.jpg",
      page: "01 / 04"
    },
    {
      title: "Pristine Makrana. The Imperial White.",
      badge: "ROYAL RAJASTHANI QUARRIES",
      desc: "The very calcium marble chosen by Shah Jahan for the Taj Mahal, retaining its sacred glow across four centuries.",
      image: "/assets/images/corridor_heritage.jpg",
      page: "02 / 04"
    },
    {
      title: "Desert Gold of Jaisalmer.",
      badge: "FOSSILIFEROUS JURASSIC STONE",
      desc: "Warm honey hues quarried from deep within the Thar Desert, sculpting palatial facades and pierced jali screens.",
      image: "/assets/images/stone_jaisalmer.jpg",
      page: "03 / 04"
    },
    {
      title: "Celestial Black Galaxy Granite.",
      badge: "IGNEOUS LUXURY MASTERY",
      desc: "Obsidian deep stones sparkling with bronze enstatite crystals, defining modern architectural supremacy.",
      image: "/assets/images/room_visualizer_living.jpg",
      page: "04 / 04"
    }
  ];

  let currentSlide = 0;
  const heroBg = document.querySelector('.hero-bg-image');
  const heroTitle = document.querySelector('.hero-title');
  const heroBadge = document.querySelector('.hero-badge');
  const heroDesc = document.querySelector('.hero-desc');
  const heroPage = document.querySelector('.hero-page-index');
  const prevBtn = document.querySelector('.hero-prev-btn');
  const nextBtn = document.querySelector('.hero-next-btn');

  function renderSlide(index) {
    const s = heroSlides[index];
    if (!s) return;
    
    // Smooth transition
    if (heroBg) {
      heroBg.style.opacity = '0.4';
      setTimeout(() => {
        heroBg.src = s.image;
        heroBg.style.opacity = '1';
      }, 200);
    }
    if (heroTitle) heroTitle.innerHTML = s.title;
    if (heroBadge) heroBadge.innerHTML = `<i class="fas fa-gem" style="color: var(--gold); font-size: 0.65rem;"></i> ${s.badge}`;
    if (heroDesc) heroDesc.textContent = s.desc;
    if (heroPage) heroPage.textContent = s.page;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      renderSlide(currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      renderSlide(currentSlide);
    });
  }

  // Scroll down button
  const scrollDownBtn = document.querySelector('.scroll-indicator');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const collectionSec = document.querySelector('#collection');
      if (collectionSec) {
        collectionSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   STONES CATALOG & FILTERS
   ========================================================================== */
async function loadStones() {
  try {
    const res = await fetch('/api/stones');
    const json = await res.json();
    if (json.success && json.data) {
      state.stones = json.data;
      renderStonesGrid(state.stones);
      setupFilterPills();
    }
  } catch (err) {
    console.error('Failed to load stones from backend:', err);
  }
}

function renderStonesGrid(stones) {
  const grid = document.querySelector('#stonesGrid');
  if (!grid) return;

  grid.innerHTML = '';
  stones.forEach(stone => {
    const card = document.createElement('div');
    card.className = 'stone-card';
    card.setAttribute('data-category', stone.category);

    card.innerHTML = `
      <div class="stone-img-box">
        <img src="${stone.image}" alt="${stone.name}" class="stone-img" loading="lazy">
        <button class="stone-loupe-btn" title="Inspect Texture Specs" data-id="${stone.id}">
          <i class="fas fa-search-plus"></i>
        </button>
      </div>
      <div class="stone-content">
        <h3 class="stone-card-title">${stone.name}</h3>
        <p class="stone-card-sub">${stone.subtitle}</p>
        <div class="stone-card-origin">
          <i class="fas fa-map-marker-alt"></i> Origin: ${stone.origin}
        </div>
        <button class="btn-stone-explore" data-id="${stone.id}">
          Explore Stone <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;

    // Event listeners
    card.querySelector('.stone-loupe-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openStoneDetailModal(stone);
    });

    card.querySelector('.btn-stone-explore').addEventListener('click', (e) => {
      e.stopPropagation();
      openStoneDetailModal(stone);
    });

    card.addEventListener('click', () => openStoneDetailModal(stone));

    grid.appendChild(card);
  });
}

function setupFilterPills() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const category = pill.getAttribute('data-filter');
      state.currentCategory = category;

      if (category.toLowerCase() === 'all') {
        renderStonesGrid(state.stones);
      } else {
        const filtered = state.stones.filter(s => s.category.toLowerCase() === category.toLowerCase());
        renderStonesGrid(filtered);
      }
    });
  });
}

/* ==========================================================================
   STONE DETAIL / INSPECTION MODAL
   ========================================================================== */
function openStoneDetailModal(stone) {
  state.selectedStone = stone;
  const modal = document.querySelector('#stoneModal');
  if (!modal) return;

  const contentBox = modal.querySelector('.modal-dialog');
  contentBox.innerHTML = `
    <button class="modal-close-btn"><i class="fas fa-times"></i></button>
    <div class="stone-detail-grid">
      <div>
        <div class="stone-detail-texture-box">
          <img src="${stone.image}" alt="${stone.name}" style="width:100%; height:100%; object-fit:cover;">
          <div style="position: absolute; bottom: 1rem; left: 1rem; right: 1rem; background: rgba(13,15,18,0.85); backdrop-filter: blur(8px); padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--border-gold); font-size: 0.8rem; color: #fff;">
            <i class="fas fa-microscope" style="color: var(--gold); margin-right: 0.4rem;"></i> High Resolution Quarry Texture Inspection
          </div>
        </div>
        <div style="margin-top: 1.25rem; display: flex; gap: 0.75rem;">
          <button class="btn-hero-primary" id="btnOrderSample" style="flex:1; justify-content:center; padding: 0.75rem 1rem; font-size: 0.82rem;">
            <i class="fas fa-box-open"></i> Request Free Sample
          </button>
          <button class="btn-hero-secondary" id="btnRequestQuote" style="flex:1; justify-content:center; padding: 0.75rem 1rem; font-size: 0.82rem;">
            <i class="fas fa-file-invoice-dollar"></i> Get Project Quote
          </button>
        </div>
      </div>
      <div>
        <div class="section-tag">${stone.category} • ${stone.priceTier || 'Heritage Premium'}</div>
        <h2 style="font-family: var(--font-serif); font-size: 2rem; color: #ffffff; margin-bottom: 0.35rem;">${stone.name}</h2>
        <p style="color: var(--gold); font-size: 0.95rem; margin-bottom: 1rem;">"${stone.subtitle}"</p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;">${stone.description}</p>
        
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.78rem; text-transform: uppercase; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 0.5rem;">
            <i class="fas fa-landmark" style="margin-right: 0.4rem;"></i> Historical Significance
          </h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">${stone.historicalSignificance}</p>
        </div>

        <h4 style="font-size: 0.78rem; text-transform: uppercase; color: #ffffff; letter-spacing: 0.1em; margin-bottom: 0.4rem;">
          Technical Specifications
        </h4>
        <table class="spec-table">
          <tbody>
            <tr>
              <td class="spec-label">Quarry Origin</td>
              <td class="spec-value">${stone.quarryLocation || stone.origin}</td>
            </tr>
            <tr>
              <td class="spec-label">Compressive Strength</td>
              <td class="spec-value">${stone.compressiveStrength || '1,860 kg/cm²'}</td>
            </tr>
            <tr>
              <td class="spec-label">Water Absorption</td>
              <td class="spec-value">${stone.waterAbsorption || '0.04%'}</td>
            </tr>
            <tr>
              <td class="spec-label">Mohs Hardness</td>
              <td class="spec-value">${stone.hardness || '3.5 - 4.0'}</td>
            </tr>
            <tr>
              <td class="spec-label">Available Finishes</td>
              <td class="spec-value">${(stone.finishAvailable || []).join(', ')}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 1rem;">
          <h4 style="font-size: 0.78rem; text-transform: uppercase; color: #ffffff; letter-spacing: 0.1em; margin-bottom: 0.5rem;">
            Recommended Applications
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${(stone.recommendedUses || []).map(u => `
              <span style="font-size: 0.75rem; background: rgba(200,155,83,0.12); color: var(--gold-light); border: 1px solid var(--border-gold); padding: 0.25rem 0.65rem; border-radius: 9999px;">
                ${u}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach modal close
  contentBox.querySelector('.modal-close-btn').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Action buttons
  contentBox.querySelector('#btnOrderSample').addEventListener('click', () => {
    modal.classList.remove('active');
    openInquiryModal({
      title: 'Order Free Stone Sample Box',
      stoneName: stone.name,
      type: 'Sample Box Order'
    });
  });

  contentBox.querySelector('#btnRequestQuote').addEventListener('click', () => {
    modal.classList.remove('active');
    openInquiryModal({
      title: 'Request Project Quote',
      stoneName: stone.name,
      type: 'Commercial/Residential Quote'
    });
  });

  modal.classList.add('active');
}

// Close modals when clicking backdrop
document.querySelectorAll('.modal-backdrop').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

/* ==========================================================================
   ICONIC ARCHITECTURE
   ========================================================================== */
async function loadArchitecture() {
  try {
    const res = await fetch('/api/architecture');
    const json = await res.json();
    if (json.success && json.data) {
      state.architecture = json.data;
      renderArchitecture(state.architecture);
    }
  } catch (err) {
    console.error('Failed to load architecture data:', err);
  }
}

function renderArchitecture(items) {
  const track = document.querySelector('#archTrack');
  if (!track) return;

  track.innerHTML = '';
  items.forEach(arch => {
    const card = document.createElement('div');
    card.className = 'arch-card';
    card.innerHTML = `
      <div class="arch-img-box">
        <img src="${arch.image}" alt="${arch.name}" class="arch-img" loading="lazy">
        <div class="arch-badge">${arch.stoneUsed}</div>
      </div>
      <div class="arch-content">
        <h4 class="arch-title">${arch.name}</h4>
        <div class="arch-stone-info">${arch.stoneUsed}</div>
        <div class="arch-location">
          <i class="fas fa-map-marker-alt" style="color: var(--gold); font-size: 0.75rem;"></i>
          ${arch.location}
        </div>
      </div>
    `;

    card.addEventListener('click', () => openArchModal(arch));
    track.appendChild(card);
  });
}

function openArchModal(arch) {
  const modal = document.querySelector('#archModal');
  if (!modal) return;

  const contentBox = modal.querySelector('.modal-dialog');
  contentBox.innerHTML = `
    <button class="modal-close-btn"><i class="fas fa-times"></i></button>
    <div style="padding: 2.25rem;">
      <div style="position: relative; height: 320px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-gold);">
        <img src="${arch.image}" alt="${arch.name}" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; background: linear-gradient(0deg, rgba(13,15,18,0.95), transparent);">
          <div style="font-size: 0.75rem; color: var(--gold); text-transform: uppercase; letter-spacing: 0.15em;">
            ${arch.era}
          </div>
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: #ffffff;">${arch.name}</h2>
          <div style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">
            <i class="fas fa-map-marker-alt" style="color: var(--gold); margin-right: 0.35rem;"></i> ${arch.location} • Stone: <strong style="color: var(--gold);">${arch.stoneUsed}</strong>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.1rem; color: #ffffff; margin-bottom: 0.6rem;">Monument Architecture & Heritage</h3>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem;">
          ${arch.summary}
        </p>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.65; background: rgba(200,155,83,0.06); border-left: 3px solid var(--gold); padding: 0.85rem 1.25rem; border-radius: 4px;">
          <strong>Stone Sourcing & Craftsmanship:</strong> ${arch.stoneDetails}
        </p>
      </div>

      <div>
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: #ffffff; letter-spacing: 0.1em; margin-bottom: 0.75rem;">
          Key Architectural Highlights
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${(arch.keyFeatures || []).map(f => `
            <li style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.88rem; color: rgba(255,255,255,0.85);">
              <i class="fas fa-check-circle" style="color: var(--gold); font-size: 0.8rem;"></i> ${f}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem;">
        <button class="btn-hero-primary" id="btnArchInquire" style="padding: 0.65rem 1.5rem; font-size: 0.85rem;">
          <i class="fas fa-envelope"></i> Inquire About Stones from this Monument
        </button>
      </div>
    </div>
  `;

  contentBox.querySelector('.modal-close-btn').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  contentBox.querySelector('#btnArchInquire').addEventListener('click', () => {
    modal.classList.remove('active');
    openInquiryModal({
      title: `Inquiry: ${arch.name} Heritage Stone`,
      stoneName: arch.stoneUsed,
      type: 'Heritage Replication Project'
    });
  });

  modal.classList.add('active');
}

/* ==========================================================================
   HERITAGE TIMELINE
   ========================================================================== */
async function loadTimeline() {
  try {
    const res = await fetch('/api/heritage/timeline');
    const json = await res.json();
    if (json.success && json.data) {
      state.timeline = json.data;
      renderTimeline(state.timeline);
    }
  } catch (err) {
    console.error('Failed to load timeline:', err);
  }
}

function renderTimeline(timeline) {
  const nav = document.querySelector('#timelineNav');
  const card = document.querySelector('#timelineDisplayCard');
  if (!nav || !card) return;

  nav.innerHTML = '';
  timeline.forEach((era, idx) => {
    const btn = document.createElement('button');
    btn.className = `timeline-btn ${idx === state.activeEraIndex ? 'active' : ''}`;
    btn.innerHTML = `
      <span>${era.eraName}</span>
      <span class="era-year">${era.period}</span>
    `;

    btn.addEventListener('click', () => {
      state.activeEraIndex = idx;
      document.querySelectorAll('.timeline-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTimelineCard(era);
    });

    nav.appendChild(btn);
  });

  if (timeline.length > 0) {
    renderTimelineCard(timeline[state.activeEraIndex]);
  }
}

function renderTimelineCard(era) {
  const card = document.querySelector('#timelineDisplayCard');
  if (!card) return;

  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';

  setTimeout(() => {
    card.innerHTML = `
      <span class="timeline-era-badge">${era.period} • ${era.eraName}</span>
      <h3 class="timeline-card-title">${era.title}</h3>
      <p class="timeline-card-desc">${era.description}</p>
      <div class="timeline-meta-row">
        <div class="timeline-meta-item">
          <span class="timeline-meta-label">Primary Stones</span>
          <span class="timeline-meta-value">${era.stoneHero}</span>
        </div>
        <div class="timeline-meta-item">
          <span class="timeline-meta-label">Iconic Exemplars</span>
          <span class="timeline-meta-value">${era.exemplar}</span>
        </div>
      </div>
    `;
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 180);
}

/* ==========================================================================
   APPLICATIONS SECTION
   ========================================================================== */
async function loadApplications() {
  try {
    const res = await fetch('/api/applications');
    const json = await res.json();
    if (json.success && json.data) {
      state.applications = json.data;
      renderApplications(state.currentAppTab);
      setupAppTabs();
    }
  } catch (err) {
    console.error('Failed to load applications:', err);
  }
}

function setupAppTabs() {
  const tabs = document.querySelectorAll('.app-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentAppTab = tab.getAttribute('data-tab');
      renderApplications(state.currentAppTab);
    });
  });
}

function renderApplications(tabName) {
  const grid = document.querySelector('#appsGrid');
  if (!grid || !state.applications[tabName]) return;

  const items = state.applications[tabName];
  grid.innerHTML = '';

  items.forEach(app => {
    const itemElem = document.createElement('button');
    itemElem.className = 'app-card-btn';
    itemElem.innerHTML = `
      <div class="app-icon-wrap">
        <i class="fas ${app.icon || 'fa-gem'}"></i>
      </div>
      <div class="app-text-wrap">
        <div class="app-name">${app.title}</div>
        <div class="app-sub">${app.subtitle}</div>
      </div>
    `;

    itemElem.addEventListener('click', () => {
      openInquiryModal({
        title: `Inquire: ${app.title}`,
        application: app.title,
        type: 'Application Consultation'
      });
    });

    grid.appendChild(itemElem);
  });
}

/* ==========================================================================
   INTERACTIVE STONE VISUALIZER
   ========================================================================== */
async function loadVisualizerPresets() {
  try {
    const res = await fetch('/api/visualizer/presets');
    const json = await res.json();
    if (json.success && json.data) {
      state.visualizerPresets = json.data;
      renderVisualizerSwatches(json.data.stonesAvailable);
      populateVisualizerSelect(json.data.stonesAvailable);
      if (json.data.stonesAvailable && json.data.stonesAvailable.length > 0) {
        setVisualizerStone(json.data.stonesAvailable[0]);
      }
    }
  } catch (err) {
    console.error('Failed to load visualizer presets:', err);
  }
}

function renderVisualizerSwatches(stones) {
  const container = document.querySelector('#visSwatches');
  if (!container || !stones) return;

  container.innerHTML = '';
  stones.forEach((stone, idx) => {
    const swatch = document.createElement('div');
    swatch.className = `swatch-item ${idx === 0 ? 'active' : ''}`;
    swatch.title = stone.name;
    swatch.innerHTML = `<img src="${stone.texture}" alt="${stone.name}">`;

    swatch.addEventListener('click', () => {
      document.querySelectorAll('.swatch-item').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      setVisualizerStone(stone);
      const sel = document.querySelector('#visStoneSelect');
      if (sel) sel.value = stone.id;
    });

    container.appendChild(swatch);
  });
}

function populateVisualizerSelect(stones) {
  const sel = document.querySelector('#visStoneSelect');
  if (!sel || !stones) return;

  sel.innerHTML = '';
  stones.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    sel.appendChild(opt);
  });

  sel.addEventListener('change', () => {
    const selected = stones.find(s => s.id === sel.value);
    if (selected) {
      setVisualizerStone(selected);
      // Update swatches
      document.querySelectorAll('.swatch-item').forEach(sw => {
        if (sw.title === selected.name) sw.classList.add('active');
        else sw.classList.remove('active');
      });
    }
  });
}

function setVisualizerStone(stone) {
  state.activeVisualizerStone = stone;
  const overlay = document.querySelector('.vis-texture-overlay');
  const badge = document.querySelector('#visActiveStoneBadge');

  if (overlay) {
    overlay.style.backgroundImage = `url(${stone.texture})`;
    overlay.style.opacity = '0.9';
    overlay.style.filter = state.activeVisualizerFinish === 'honed' 
      ? 'contrast(0.9) brightness(0.95)' 
      : 'contrast(1.15) brightness(1.05)';
  }

  if (badge) {
    badge.textContent = `${stone.name} • ${state.activeVisualizerApp.toUpperCase()}`;
  }
}

function setupVisualizerControls() {
  const appBtns = document.querySelectorAll('.vis-app-btn');
  appBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      appBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeVisualizerApp = btn.getAttribute('data-app');

      const overlay = document.querySelector('.vis-texture-overlay');
      if (overlay) {
        if (state.activeVisualizerApp === 'flooring') {
          overlay.style.top = 'auto';
          overlay.style.bottom = '0';
          overlay.style.height = '52%';
          overlay.style.width = '100%';
        } else if (state.activeVisualizerApp === 'wall') {
          overlay.style.top = '0';
          overlay.style.bottom = '0';
          overlay.style.left = '0';
          overlay.style.width = '35%';
          overlay.style.height = '100%';
        } else if (state.activeVisualizerApp === 'countertop') {
          overlay.style.top = '58%';
          overlay.style.left = '42%';
          overlay.style.width = '24%';
          overlay.style.height = '16%';
        } else {
          overlay.style.top = '0';
          overlay.style.bottom = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
        }
      }

      if (state.activeVisualizerStone) {
        setVisualizerStone(state.activeVisualizerStone);
      }
    });
  });

  // In-page Room Space Selector
  const inpageRoomBtns = document.querySelectorAll('[data-inpage-room]');
  inpageRoomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      inpageRoomBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const room = btn.getAttribute('data-inpage-room');
      const roomImg = document.querySelector('#inpageVisRoomImg');
      const overlay = document.querySelector('.vis-texture-overlay');
      if (room === 'living') {
        if (roomImg) roomImg.src = '/assets/images/room_visualizer_living.jpg';
        if (overlay) overlay.style.height = '52%';
      } else if (room === 'corridor') {
        if (roomImg) roomImg.src = '/assets/images/corridor_heritage.jpg';
        if (overlay) overlay.style.height = '45%';
      } else if (room === 'bath') {
        if (roomImg) roomImg.src = '/assets/images/gallery_luxury_bath.jpg';
        if (overlay) overlay.style.height = '48%';
      }
    });
  });

  // In-page Lighting Selector
  const inpageLightBtns = document.querySelectorAll('[data-inpage-light]');
  inpageLightBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      inpageLightBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const light = btn.getAttribute('data-inpage-light');
      const roomImg = document.querySelector('#inpageVisRoomImg');
      const overlay = document.querySelector('.vis-texture-overlay');
      if (light === 'golden') {
        if (roomImg) roomImg.style.filter = 'brightness(0.98) sepia(0.25) saturate(1.3)';
        if (overlay) overlay.style.filter = 'brightness(1.05) contrast(1.1) sepia(0.2)';
      } else if (light === 'night') {
        if (roomImg) roomImg.style.filter = 'brightness(0.85) contrast(1.25) hue-rotate(-10deg)';
        if (overlay) overlay.style.filter = 'brightness(0.88) contrast(1.25)';
      } else {
        if (roomImg) roomImg.style.filter = 'none';
        if (overlay) overlay.style.filter = 'contrast(1.15) brightness(1.05)';
      }
    });
  });

  const expandBtn = document.querySelector('#btnOpenFullVisualizer');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      openFullVisualizerModal();
    });
  }
}

function openFullVisualizerModal() {
  const modal = document.querySelector('#visualizerModal');
  if (!modal) return;

  const content = modal.querySelector('.modal-dialog');
  const availableStones = state.visualizerPresets?.stonesAvailable || [];
  let stoneLeft = state.activeVisualizerStone || availableStones[0] || { name: 'Makrana Marble', texture: '/assets/images/stone_makrana.jpg' };
  let stoneRight = availableStones[1] || availableStones[0] || stoneLeft;
  let activeRoom = (state.visualizerPresets?.rooms && state.visualizerPresets.rooms[0]) || {
    id: "living",
    name: "Luxury Living Room",
    baseImage: "/assets/images/room_visualizer_living.jpg",
    floorHeight: "52%"
  };

  content.innerHTML = `
    <button class="modal-close-btn"><i class="fas fa-times"></i></button>
    <div style="padding: 2.25rem;">
      <div class="section-tag">Interactive Architectural Simulation Studio</div>
      <h2 style="font-family: var(--font-serif); font-size: 2rem; color: #ffffff; margin-bottom: 0.35rem;">
        Studio Room Visualizer & Stone Comparison
      </h2>
      <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.25rem;">
        Explore Indian heritage stones across diverse luxury architectural settings with real-time lighting, finishes, and side-by-side comparison.
      </p>

      <!-- Room Environment Switcher Tabs -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
        <div class="vis-room-tabs-bar" style="margin-bottom: 0;">
          ${(state.visualizerPresets?.rooms || []).map((r, i) => `
            <button class="vis-room-tab ${i === 0 ? 'active' : ''}" data-room-id="${r.id}" data-img="${r.baseImage}" data-height="${r.floorHeight || '52%'}">
              <i class="fas fa-cube" style="margin-right: 0.35rem;"></i> ${r.name}
            </button>
          `).join('')}
        </div>

        <!-- Lighting Mode Toggle -->
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Lighting:</span>
          <button class="vis-pill-btn active" data-lighting="daylight" title="Daylight Sun">☀️ Day</button>
          <button class="vis-pill-btn" data-lighting="golden-hour" title="Sunset Warmth">🌅 Golden</button>
          <button class="vis-pill-btn" data-lighting="evening" title="Evening Architectural">🌙 Night</button>
        </div>
      </div>

      <!-- Split Screen Visualizer Viewport -->
      <div class="vis-split-container" id="visSplitContainer">
        <img id="studioRoomBase" src="${activeRoom.baseImage}" class="vis-split-base-img" alt="Room View">
        
        <!-- Left Stone Layer -->
        <div id="splitLeftOverlay" class="vis-split-left-overlay" style="background-image: url('${stoneLeft.texture}');"></div>
        
        <!-- Right Stone Layer -->
        <div id="splitRightOverlay" class="vis-split-right-overlay" style="background-image: url('${stoneRight.texture}');"></div>

        <!-- Draggable Divider Handle -->
        <div class="vis-split-divider" id="visSplitDivider">
          <div class="vis-split-handle"><i class="fas fa-arrows-alt-h"></i></div>
        </div>

        <!-- Surface Labels -->
        <div style="position: absolute; top: 1rem; left: 1rem; background: rgba(13,15,18,0.85); backdrop-filter: blur(8px); padding: 0.35rem 0.85rem; border-radius: 9999px; border: 1px solid var(--border-gold); font-size: 0.75rem; color: #fff; z-index: 5;">
          Side A: <strong style="color: var(--gold);" id="labelSideA">${stoneLeft.name}</strong>
        </div>

        <div style="position: absolute; top: 1rem; right: 1rem; background: rgba(13,15,18,0.85); backdrop-filter: blur(8px); padding: 0.35rem 0.85rem; border-radius: 9999px; border: 1px solid var(--border-gold); font-size: 0.75rem; color: #fff; z-index: 5;">
          Side B: <strong style="color: var(--gold-light);" id="labelSideB">${stoneRight.name}</strong>
        </div>
      </div>

      <!-- Dual Stone Selectors & Finish Controls -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
        <!-- Left Side Controls -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px; padding: 1rem;">
          <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--gold); letter-spacing: 0.08em; margin-bottom: 0.65rem;">
            Configure Side A (Left)
          </div>
          <select id="selStoneA" style="width: 100%; background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.55rem; color: #fff; font-size: 0.85rem; margin-bottom: 0.75rem;">
            ${availableStones.map(s => `<option value="${s.id}" ${s.name === stoneLeft.name ? 'selected' : ''}>${s.name} (${s.category || 'Stone'})</option>`).join('')}
          </select>
          <div style="display: flex; gap: 0.4rem; overflow-x: auto;">
            ${availableStones.slice(0, 6).map(s => `
              <button class="mini-swatch-a" data-id="${s.id}" style="width: 32px; height: 32px; border-radius: 6px; border: 1px solid var(--border-light); overflow: hidden; cursor: pointer;">
                <img src="${s.texture}" style="width: 100%; height: 100%; object-fit: cover;">
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Right Side Controls -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 8px; padding: 1rem;">
          <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--gold-light); letter-spacing: 0.08em; margin-bottom: 0.65rem;">
            Configure Side B (Right)
          </div>
          <select id="selStoneB" style="width: 100%; background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.55rem; color: #fff; font-size: 0.85rem; margin-bottom: 0.75rem;">
            ${availableStones.map(s => `<option value="${s.id}" ${s.name === stoneRight.name ? 'selected' : ''}>${s.name} (${s.category || 'Stone'})</option>`).join('')}
          </select>
          <div style="display: flex; gap: 0.4rem; overflow-x: auto;">
            ${availableStones.slice(0, 6).map(s => `
              <button class="mini-swatch-b" data-id="${s.id}" style="width: 32px; height: 32px; border-radius: 6px; border: 1px solid var(--border-light); overflow: hidden; cursor: pointer;">
                <img src="${s.texture}" style="width: 100%; height: 100%; object-fit: cover;">
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Area & Slab Quantity Calculator -->
      <div class="calc-widget-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-size: 0.92rem; color: #ffffff; margin-bottom: 0.2rem;">
              <i class="fas fa-calculator" style="color: var(--gold); margin-right: 0.4rem;"></i>
              Instant Stone Slab & Area Estimator
            </h4>
            <p style="font-size: 0.78rem; color: var(--text-secondary);">
              Calculate square footage, estimated slabs required, and recommended cutting wastage for your floor plan.
            </p>
          </div>
          <span style="font-size: 0.72rem; background: rgba(200,155,83,0.15); color: var(--gold); padding: 0.25rem 0.65rem; border-radius: 9999px;">
            Standard Gangsaw Slab: ~45 sq ft
          </span>
        </div>

        <div class="calc-grid">
          <div>
            <label style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Room Length (Feet)</label>
            <input type="number" id="calcLength" value="25" min="1" class="calc-input">
          </div>
          <div>
            <label style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Room Width (Feet)</label>
            <input type="number" id="calcWidth" value="20" min="1" class="calc-input">
          </div>
          <div>
            <label style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Cutting Wastage</label>
            <select id="calcWastage" class="calc-input">
              <option value="0.10">10% (Standard Rectangles)</option>
              <option value="0.15" selected>15% (Bookmatch / Diagonal)</option>
              <option value="0.20">20% (Complex Arches / Waterjet)</option>
            </select>
          </div>
        </div>

        <div class="calc-result-box">
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Net Surface Area</div>
            <div style="font-size: 1.25rem; font-weight: 600; color: #ffffff;" id="calcNetArea">500 sq. ft.</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Gross Area (Incl. Wastage)</div>
            <div style="font-size: 1.25rem; font-weight: 600; color: var(--gold);" id="calcGrossArea">575 sq. ft.</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Estimated Slabs</div>
            <div style="font-size: 1.25rem; font-weight: 600; color: #ffffff;" id="calcSlabsCount">~13 Jumbo Slabs</div>
          </div>
          <div>
            <button class="btn-hero-primary" id="btnApplyCalcToQuote" style="padding: 0.6rem 1.25rem; font-size: 0.82rem;">
              <i class="fas fa-paper-plane"></i> Quote for this Area
            </button>
          </div>
        </div>
      </div>

    </div>
  `;

  // Attach modal close
  content.querySelector('.modal-close-btn').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Split Divider Drag Logic
  const container = content.querySelector('#visSplitContainer');
  const divider = content.querySelector('#visSplitDivider');
  const leftOverlay = content.querySelector('#splitLeftOverlay');
  const rightOverlay = content.querySelector('#splitRightOverlay');
  let isDragging = false;

  function updateSplitPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    let pct = (offsetX / rect.width) * 100;
    pct = Math.max(10, Math.min(90, pct));

    divider.style.left = `${pct}%`;
    leftOverlay.style.width = `${pct}%`;
    rightOverlay.style.width = `${100 - pct}%`;
  }

  divider.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (isDragging) updateSplitPosition(e.clientX);
  });

  // Touch support for drag
  divider.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length > 0) {
      updateSplitPosition(e.touches[0].clientX);
    }
  });

  // Room Environment tabs
  content.querySelectorAll('.vis-room-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      content.querySelectorAll('.vis-room-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const imgPath = tab.getAttribute('data-img');
      const height = tab.getAttribute('data-height');
      content.querySelector('#studioRoomBase').src = imgPath;
      leftOverlay.style.height = height;
      rightOverlay.style.height = height;
    });
  });

  // Lighting Mode buttons
  content.querySelectorAll('[data-lighting]').forEach(btn => {
    btn.addEventListener('click', () => {
      content.querySelectorAll('[data-lighting]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-lighting');
      const baseImg = content.querySelector('#studioRoomBase');
      if (mode === 'golden-hour') {
        baseImg.style.filter = 'brightness(0.98) sepia(0.25) saturate(1.3)';
        leftOverlay.style.filter = 'brightness(1.05) contrast(1.1) sepia(0.2)';
        rightOverlay.style.filter = 'brightness(1.05) contrast(1.1) sepia(0.2)';
      } else if (mode === 'evening') {
        baseImg.style.filter = 'brightness(0.85) contrast(1.2) hue-rotate(-10deg)';
        leftOverlay.style.filter = 'brightness(0.9) contrast(1.25)';
        rightOverlay.style.filter = 'brightness(0.9) contrast(1.25)';
      } else {
        baseImg.style.filter = 'none';
        leftOverlay.style.filter = 'contrast(1.15) brightness(1.02)';
        rightOverlay.style.filter = 'contrast(1.15) brightness(1.02)';
      }
    });
  });

  // Stone Selector A
  const selA = content.querySelector('#selStoneA');
  selA.addEventListener('change', () => {
    const s = availableStones.find(item => item.id === selA.value);
    if (s) {
      stoneLeft = s;
      leftOverlay.style.backgroundImage = `url('${s.texture}')`;
      content.querySelector('#labelSideA').textContent = s.name;
    }
  });

  content.querySelectorAll('.mini-swatch-a').forEach(btn => {
    btn.addEventListener('click', () => {
      selA.value = btn.getAttribute('data-id');
      selA.dispatchEvent(new Event('change'));
    });
  });

  // Stone Selector B
  const selB = content.querySelector('#selStoneB');
  selB.addEventListener('change', () => {
    const s = availableStones.find(item => item.id === selB.value);
    if (s) {
      stoneRight = s;
      rightOverlay.style.backgroundImage = `url('${s.texture}')`;
      content.querySelector('#labelSideB').textContent = s.name;
    }
  });

  content.querySelectorAll('.mini-swatch-b').forEach(btn => {
    btn.addEventListener('click', () => {
      selB.value = btn.getAttribute('data-id');
      selB.dispatchEvent(new Event('change'));
    });
  });

  // Calculator Logic
  const calcLength = content.querySelector('#calcLength');
  const calcWidth = content.querySelector('#calcWidth');
  const calcWastage = content.querySelector('#calcWastage');

  function updateCalculator() {
    const l = parseFloat(calcLength.value) || 0;
    const w = parseFloat(calcWidth.value) || 0;
    const wastage = parseFloat(calcWastage.value) || 0.15;

    const net = l * w;
    const gross = Math.round(net * (1 + wastage));
    const slabs = Math.ceil(gross / 45);

    content.querySelector('#calcNetArea').textContent = `${net.toLocaleString()} sq. ft.`;
    content.querySelector('#calcGrossArea').textContent = `${gross.toLocaleString()} sq. ft.`;
    content.querySelector('#calcSlabsCount').textContent = `~${slabs} Jumbo Slabs`;
  }

  calcLength.addEventListener('input', updateCalculator);
  calcWidth.addEventListener('input', updateCalculator);
  calcWastage.addEventListener('change', updateCalculator);

  content.querySelector('#btnApplyCalcToQuote').addEventListener('click', () => {
    const net = parseFloat(calcLength.value) * parseFloat(calcWidth.value);
    modal.classList.remove('active');
    openInquiryModal({
      title: `Quote: ${stoneLeft.name} vs ${stoneRight.name}`,
      stoneName: `${stoneLeft.name}`,
      squareFootage: `${net} sq. ft. (plus ${Math.round(parseFloat(calcWastage.value) * 100)}% wastage)`,
      application: 'Luxury Flooring',
      type: 'Floor Plan Estimate'
    });
  });

  modal.classList.add('active');
}


/* ==========================================================================
   OUR GALLERY LIGHTBOX
   ========================================================================== */
async function loadGallery() {
  try {
    const res = await fetch('/api/gallery');
    const json = await res.json();
    if (json.success && json.data) {
      state.gallery = json.data;
      renderGallery(state.gallery);
    }
  } catch (err) {
    console.error('Failed to load gallery:', err);
  }
}

function renderGallery(items) {
  const mosaic = document.querySelector('#galleryMosaic');
  if (!mosaic) return;

  mosaic.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-item-overlay">
        <div class="gallery-item-title">${item.title}</div>
        <div class="gallery-item-stone">${item.stone}</div>
      </div>
    `;

    div.addEventListener('click', () => openGalleryLightbox(item));
    mosaic.appendChild(div);
  });
}

function openGalleryLightbox(item) {
  const modal = document.querySelector('#galleryModal');
  if (!modal) return;

  const content = modal.querySelector('.modal-dialog');
  content.innerHTML = `
    <button class="modal-close-btn"><i class="fas fa-times"></i></button>
    <div style="padding: 1.5rem; text-align: center;">
      <div style="max-height: 70vh; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem;">
        <img src="${item.image}" alt="${item.title}" style="max-height: 70vh; margin: 0 auto; object-fit: contain; border-radius: 8px;">
      </div>
      <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #ffffff; margin-bottom: 0.35rem;">${item.title}</h3>
      <p style="color: var(--gold); font-size: 0.9rem; margin-bottom: 0.5rem;">Stone: ${item.stone} • Category: ${item.category}</p>
      <p style="color: var(--text-secondary); font-size: 0.88rem; max-width: 600px; margin: 0 auto 1.5rem;">${item.caption}</p>
      <button class="btn-hero-primary" id="btnGalleryInquire" style="padding: 0.6rem 1.5rem; font-size: 0.85rem;">
        <i class="fas fa-layer-group"></i> Inquire About this Finish
      </button>
    </div>
  `;

  content.querySelector('.modal-close-btn').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  content.querySelector('#btnGalleryInquire').addEventListener('click', () => {
    modal.classList.remove('active');
    openInquiryModal({
      title: `Gallery Inquiry: ${item.title}`,
      stoneName: item.stone,
      type: `${item.category} Installation`
    });
  });

  modal.classList.add('active');
}

/* ==========================================================================
   STATS SECTION
   ========================================================================== */
async function loadStats() {
  try {
    const res = await fetch('/api/stats');
    const json = await res.json();
    if (json.success && json.data) {
      const d = json.data;
      const elYears = document.querySelector('#statYears');
      const elVarieties = document.querySelector('#statVarieties');
      const elProjects = document.querySelector('#statProjects');
      const elCities = document.querySelector('#statCities');

      if (elYears) elYears.textContent = d.yearsExperience || '25+';
      if (elVarieties) elVarieties.textContent = d.stoneVarieties || '100+';
      if (elProjects) elProjects.textContent = d.projectsCompleted || '500+';
      if (elCities) elCities.textContent = d.citiesServed || '20+';
    }
  } catch (err) {
    console.error('Failed to load stats:', err);
  }
}

/* ==========================================================================
   NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function setupNewsletter() {
  const form = document.querySelector('#newsletterForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const email = input.value.trim();

    if (!email) {
      showToast('Please enter your email address.', 'warning');
      return;
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (data.success) {
        showToast(data.message, 'success');
        input.value = '';
      } else {
        showToast(data.message || 'Subscription failed', 'warning');
      }
    } catch (err) {
      showToast('Network error while subscribing. Please try again.', 'warning');
    }
  });
}

/* ==========================================================================
   INQUIRY & QUOTE MODAL
   ========================================================================== */
function setupInquiryModal() {
  // Global buttons triggering inquiry
  document.querySelectorAll('[data-open-inquiry]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openInquiryModal({
        title: 'Bespoke Stone Consultation',
        type: 'General Project Consultation'
      });
    });
  });
}

function openInquiryModal(preset = {}) {
  const modal = document.querySelector('#inquiryModal');
  if (!modal) return;

  const content = modal.querySelector('.modal-dialog');
  content.innerHTML = `
    <button class="modal-close-btn"><i class="fas fa-times"></i></button>
    <div style="padding: 2.5rem;">
      <div class="section-tag">${preset.type || 'Stone Consultation & Samples'}</div>
      <h2 style="font-family: var(--font-serif); font-size: 2rem; color: #ffffff; margin-bottom: 0.4rem;">
        ${preset.title || 'Request a Personalized Quote'}
      </h2>
      <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.75rem;">
        Connect directly with our master stone artisans and geological specialists. We ship authentic sample boxes worldwide.
      </p>

      <form id="inquiryForm" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;">
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em;">Full Name *</label>
          <input type="text" name="name" required placeholder="e.g. Maharaja Vikramaditya / John Doe" style="background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.75rem; color: #fff; font-size: 0.88rem;">
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em;">Email Address *</label>
          <input type="email" name="email" required placeholder="architect@studio.com" style="background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.75rem; color: #fff; font-size: 0.88rem;">
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em;">Phone / WhatsApp</label>
          <input type="tel" name="phone" placeholder="+91 98765 43210" style="background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.75rem; color: #fff; font-size: 0.88rem;">
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em;">Stone of Interest</label>
          <select name="stoneInterest" style="background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.75rem; color: #fff; font-size: 0.88rem;">
            <option value="Makrana Marble" ${preset.stoneName === 'Makrana Marble' ? 'selected' : ''}>Makrana Marble</option>
            <option value="Kota Stone" ${preset.stoneName === 'Kota Stone' ? 'selected' : ''}>Kota Stone</option>
            <option value="Jaisalmer Yellow" ${preset.stoneName === 'Jaisalmer Yellow' ? 'selected' : ''}>Jaisalmer Yellow</option>
            <option value="Black Galaxy Granite" ${preset.stoneName === 'Black Galaxy Granite' ? 'selected' : ''}>Black Galaxy Granite</option>
            <option value="Indian Green Marble" ${preset.stoneName === 'Indian Green Marble' ? 'selected' : ''}>Indian Green Marble</option>
            <option value="Rajasthan Sandstone" ${preset.stoneName === 'Rajasthan Sandstone' ? 'selected' : ''}>Rajasthan Sandstone</option>
            <option value="Multiple Variety Sample Box" ${!preset.stoneName ? 'selected' : ''}>Multiple Variety Sample Box</option>
          </select>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em;">Application Area</label>
          <select name="application" style="background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.75rem; color: #fff; font-size: 0.88rem;">
            <option value="Luxury Flooring">Luxury Flooring</option>
            <option value="Kitchen Countertops">Kitchen Countertops</option>
            <option value="Bathroom Surfaces">Bathroom Surfaces</option>
            <option value="Exterior Facade">Exterior Facade</option>
            <option value="Temple / Spiritual Sanctum">Temple / Spiritual Sanctum</option>
            <option value="Bespoke Jali Screen & Sculptures">Bespoke Jali Screen & Sculptures</option>
          </select>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em;">Estimated Quantity (Sq. Ft.)</label>
          <input type="text" name="squareFootage" placeholder="e.g. 2,500 sq ft or 1 container" style="background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.75rem; color: #fff; font-size: 0.88rem;">
        </div>

        <div style="grid-column: span 2; display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.08em;">Project Details / Special Requirements</label>
          <textarea name="message" rows="3" placeholder="Tell us about your project vision, timeline, destination delivery city, or custom cut sizes..." style="background: #191e26; border: 1px solid var(--border-medium); border-radius: 6px; padding: 0.75rem; color: #fff; font-size: 0.88rem; resize: vertical;"></textarea>
        </div>

        <div style="grid-column: span 2; display: flex; justify-content: flex-end; margin-top: 0.5rem;">
          <button type="submit" class="btn-hero-primary" style="padding: 0.85rem 2.25rem;">
            <i class="fas fa-paper-plane"></i> Submit Request
          </button>
        </div>
      </form>
    </div>
  `;

  content.querySelector('.modal-close-btn').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  const form = content.querySelector('#inquiryForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        showToast(data.message, 'success');
        modal.classList.remove('active');
      } else {
        showToast(data.message || 'Submission failed', 'warning');
      }
    } catch (err) {
      showToast('Network error submitting inquiry.', 'warning');
    }
  });

  modal.classList.add('active');
}

/* ==========================================================================
   GLOBAL SEARCH MODAL
   ========================================================================== */
function setupSearchModal() {
  const searchTrigger = document.querySelector('#btnSearchTrigger');
  const modal = document.querySelector('#searchModal');
  if (!searchTrigger || !modal) return;

  searchTrigger.addEventListener('click', () => {
    modal.classList.add('active');
    const input = modal.querySelector('#globalSearchInput');
    if (input) {
      input.value = '';
      input.focus();
      renderSearchResults(state.stones);
    }
  });

  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  const input = modal.querySelector('#globalSearchInput');
  if (input) {
    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const q = input.value.trim().toLowerCase();
        if (!q) {
          renderSearchResults(state.stones);
          return;
        }
        try {
          const res = await fetch(`/api/stones?search=${encodeURIComponent(q)}`);
          const json = await res.json();
          if (json.success) {
            renderSearchResults(json.data);
          }
        } catch (e) {
          console.error(e);
        }
      }, 250);
    });
  }
}

function renderSearchResults(results) {
  const container = document.querySelector('#searchResultsList');
  if (!container) return;

  if (!results || results.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No stones found matching your query.</div>`;
    return;
  }

  container.innerHTML = '';
  results.forEach(stone => {
    const item = document.createElement('div');
    item.style.cssText = 'display: flex; align-items: center; gap: 1rem; padding: 0.85rem; border-radius: 8px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); cursor: pointer; transition: all 0.2s;';
    item.innerHTML = `
      <img src="${stone.image}" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover;">
      <div style="flex: 1;">
        <div style="font-weight: 600; color: #ffffff; font-size: 0.95rem;">${stone.name}</div>
        <div style="font-size: 0.78rem; color: var(--gold);">${stone.category} • Origin: ${stone.origin}</div>
      </div>
      <i class="fas fa-arrow-right" style="color: var(--text-muted);"></i>
    `;

    item.addEventListener('mouseenter', () => {
      item.style.background = 'rgba(200,155,83,0.1)';
      item.style.borderColor = 'var(--gold)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.background = 'rgba(255,255,255,0.03)';
      item.style.borderColor = 'var(--border-light)';
    });

    item.addEventListener('click', () => {
      const searchModal = document.querySelector('#searchModal');
      if (searchModal) searchModal.classList.remove('active');
      openStoneDetailModal(stone);
    });

    container.appendChild(item);
  });
}
