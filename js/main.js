// ========== UMAMI ANALYTICS ==========
(function() {
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.setAttribute('data-website-id', '7bf763fd-7645-40a9-8cfb-404a69f86da5');
    document.head.appendChild(script);
})();

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(122, 12, 23, 0.08)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.92)';
    navbar.style.boxShadow = 'none';
  }
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== FILTROS DE RECURSOS ==========
(function() {
  const materiaButtons = document.querySelectorAll('#materiaFilters .filter-btn');
  const tipoButtons = document.querySelectorAll('#tipoFilters .filter-btn');
  const cards = document.querySelectorAll('.recurso-card');
  const noResults = document.getElementById('noResults');

  if (!materiaButtons.length || !cards.length) return;

  let activeMateria = 'all';
  let activeTipo = 'all';

  function filterCards() {
    let visibleCount = 0;

    cards.forEach(card => {
      const materia = card.dataset.materia;
      const tipo = card.dataset.tipo;

      const matchMateria = activeMateria === 'all' || materia === activeMateria;
      const matchTipo = activeTipo === 'all' || tipo === activeTipo;

      if (matchMateria && matchTipo) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  materiaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      materiaButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMateria = btn.dataset.filter;
      filterCards();
    });
  });

  tipoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tipoButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTipo = btn.dataset.filter;
      filterCards();
    });
  });
})();
