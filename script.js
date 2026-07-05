// =========================================================
// Confirmar que JavaScript está activo
// =========================================================
document.documentElement.classList.remove('no-js');

// =========================================================
// Año automático en el footer
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Menú móvil
// =========================================================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// PORTAFOLIO
// =========================================================
// Para agregar un proyecto nuevo cada mes, copia un bloque
// dentro de este arreglo y llena los datos:
//
//   {
//     category: "Podcast",              -> tipo de servicio
//     name: "Nombre del proyecto",      -> nombre del cliente/proyecto
//     image: "assets/portfolio/foo.jpg" -> ruta de la imagen (subela a assets/portfolio/)
//   }
//
// Si todavia no tienes la imagen, deja image: null y se muestra
// como espacio reservado ("Proximamente").

const portfolioItems = [
  { category: "Podcast",             name: "Próximamente", image: null },
  { category: "Video promocional",   name: "Próximamente", image: null },
  { category: "Comercial",           name: "Próximamente", image: null },
  { category: "Cobertura de evento", name: "Próximamente", image: null },
  { category: "Identidad de marca",  name: "Próximamente", image: null },
  { category: "Fotografía",          name: "Próximamente", image: null },
];

const grid = document.getElementById('portfolioGrid');

portfolioItems.forEach(item => {
  const card = document.createElement('div');
  card.className = 'portfolio-card' + (item.image ? '' : ' placeholder');

  card.innerHTML = `
    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
    <div class="portfolio-meta">
      <span class="portfolio-cat">${item.category}</span>
      <span class="portfolio-name">${item.name}</span>
    </div>
  `;

  grid.appendChild(card);
});

// =========================================================
// =========================================================
// PARTÍCULAS FLOTANTES EN EL HERO
// =========================================================
(function initParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(63,130,136,', 'rgba(201,168,76,', 'rgba(245,243,238,'];
  const COUNT  = 55;

  const particles = Array.from({ length: COUNT }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.6 + 0.4,
    speed: Math.random() * 0.35 + 0.08,
    drift: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1,
    fade:  Math.random() * 0.004 + 0.001,
    dir:   1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.alpha += p.fade * p.dir;
      if (p.alpha >= 0.65 || p.alpha <= 0.05) p.dir *= -1;
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -5) {
        p.y = canvas.height + 5;
        p.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha.toFixed(2) + ')';
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();

// =========================================================
// ECUALIZADOR DE AUDIO ANIMADO
// =========================================================
(function initEqualizer() {
  var svg = document.getElementById('eqBars');
  if (!svg) return;

  var BAR_COUNT = 18;
  var BAR_W     = 4;
  var GAP       = 2.5;
  var MAX_H     = 46;
  var colors    = ['#3f8288', '#c9a84c', '#3f8288'];
  var totalW    = BAR_COUNT * (BAR_W + GAP) - GAP;

  svg.closest('svg').setAttribute('viewBox', '0 0 ' + totalW + ' ' + MAX_H);

  var bars = Array.from({ length: BAR_COUNT }, function(_, i) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', i * (BAR_W + GAP));
    rect.setAttribute('width', BAR_W);
    rect.setAttribute('rx', '1');
    rect.setAttribute('fill', colors[i % colors.length]);
    svg.appendChild(rect);
    return {
      el:      rect,
      current: Math.random() * 20 + 4,
      target:  Math.random() * MAX_H,
      speed:   Math.random() * 2.5 + 1,
    };
  });

  function animEq() {
    bars.forEach(function(b) {
      if (Math.random() < 0.04) {
        b.target = Math.random() * MAX_H * 0.9 + MAX_H * 0.05;
        b.speed  = Math.random() * 3 + 1;
      }
      b.current += (b.target - b.current) * 0.08 * b.speed;
      var h = Math.max(2, b.current);
      b.el.setAttribute('height', h);
      b.el.setAttribute('y', MAX_H - h);
      b.el.setAttribute('opacity', 0.55 + (h / MAX_H) * 0.45);
    });
    requestAnimationFrame(animEq);
  }
  animEq();
})();

// =========================================================
// Header: fondo mas solido al hacer scroll
// =========================================================
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.background = 'rgba(10,10,10,0.92)';
  } else {
    header.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.92), rgba(10,10,10,0))';
  }
});

// =========================================================
// Revelado de secciones al hacer scroll
// (todo lo anterior ya corrio, asi que aunque esto falle
// en un navegador muy viejo, el resto del sitio ya funciona)
// =========================================================
const revealTargets = document.querySelectorAll(
  '.kicker, .section-title, .body-text, .service-item, .portfolio-card, .contact-link'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  // Salvaguarda: si algo impide que el observer dispare a tiempo,
  // no dejamos contenido oculto para siempre.
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 2000);
} else {
  // Navegador sin soporte de IntersectionObserver: mostrar todo directo
  revealTargets.forEach(el => el.classList.add('in'));
}
