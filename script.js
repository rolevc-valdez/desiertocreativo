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
  const COUNT  = 110;

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
// LÍNEAS DE CONTORNO BRILLANTES (monitor, micrófono, cámara, audífonos)
// =========================================================
(function initOutlineLines() {
  var canvas = document.getElementById('heroLines');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Contornos definidos como porcentajes del canvas (x%, y%)
  // Ajustados a la imagen: monitor centro-derecha, micrófono centro,
  // cámara derecha, audífonos abajo-centro
  function pct(x, y) {
    return [canvas.width * x, canvas.height * y];
  }

  // Cada objeto es un array de puntos que forman el contorno
  function getShapes() {
    return [
      // Monitor (rectángulo aproximado)
      {
        pts: [
          pct(0.50, 0.28), pct(0.72, 0.28),
          pct(0.72, 0.62), pct(0.50, 0.62),
          pct(0.50, 0.28),
        ],
        color: '#ffffff',
        glowColor: 'rgba(180,230,255,0.8)',
      },
      // Cámara (contorno aproximado)
      {
        pts: [
          pct(0.74, 0.30), pct(0.92, 0.30),
          pct(0.92, 0.72), pct(0.74, 0.72),
          pct(0.74, 0.30),
        ],
        color: '#c9a84c',
        glowColor: 'rgba(201,168,76,0.7)',
      },
      // Micrófono (línea vertical central)
      {
        pts: [
          pct(0.58, 0.45), pct(0.60, 0.45),
          pct(0.60, 0.88), pct(0.58, 0.88),
        ],
        color: '#ffffff',
        glowColor: 'rgba(255,255,255,0.6)',
      },
      // Audífonos (arco inferior)
      {
        pts: [
          pct(0.52, 0.82), pct(0.56, 0.78),
          pct(0.60, 0.80), pct(0.64, 0.76),
          pct(0.68, 0.82),
        ],
        color: '#3f8288',
        glowColor: 'rgba(63,130,136,0.8)',
      },
    ];
  }

  // Cada línea tiene una partícula que recorre el contorno
  var lines = getShapes().map(function(shape, i) {
    return {
      shape:    shape,
      progress: Math.random(), // posición inicial aleatoria
      speed:    0.0015 + Math.random() * 0.002,
      tail:     0.18 + Math.random() * 0.12, // longitud de la estela
      active:   true,
      waitFrames: Math.floor(Math.random() * 120), // pausa inicial
    };
  });

  // Interpolar un punto en el contorno dado un progreso 0-1
  function getPointOnPath(pts, t) {
    var total = pts.length - 1;
    var seg   = t * total;
    var i     = Math.floor(seg);
    var f     = seg - i;
    if (i >= total) i = total - 1;
    var a = pts[i], b = pts[i + 1] || pts[i];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  }

  function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(function(line) {
      if (line.waitFrames > 0) { line.waitFrames--; return; }

      var pts   = line.shape.pts;
      var color = line.shape.color;
      var glow  = line.shape.glowColor;

      // Avanzar la partícula
      line.progress += line.speed;
      if (line.progress > 1) line.progress -= 1;

      var p    = line.progress;
      var tail = line.tail;

      // Dibujar estela: segmentos desde p-tail hasta p
      var steps = 40;
      for (var s = 0; s <= steps; s++) {
        var t0 = p - tail + (tail / steps) * s;
        if (t0 < 0) t0 += 1;
        var t1 = p - tail + (tail / steps) * (s + 1);
        if (t1 < 0) t1 += 1;

        var pt0 = getPointOnPath(pts, t0);
        var pt1 = getPointOnPath(pts, t1);

        // Opacidad: crece hacia la punta
        var alpha = (s / steps);
        alpha = alpha * alpha; // curva cuadrática más natural

        ctx.beginPath();
        ctx.moveTo(pt0[0], pt0[1]);
        ctx.lineTo(pt1[0], pt1[1]);

        // Línea exterior con glow
        ctx.shadowColor  = glow;
        ctx.shadowBlur   = 12;
        ctx.strokeStyle  = color;
        ctx.globalAlpha  = alpha * 0.9;
        ctx.lineWidth    = 1.5;
        ctx.lineCap      = 'round';
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;
    });

    requestAnimationFrame(drawLines);
  }

  window.addEventListener('resize', function() {
    resize();
  });

  drawLines();
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
