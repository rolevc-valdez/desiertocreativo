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
  { category: "Podcast", name: "Dando un Rol con el Role", image: "assets/portfolio/port-001.jpg", animated: true, url: "https://rolevaldez.com/episodios" },
  { category: "Video promocional",   name: "Próximamente", image: null },
  { category: "Comercial",           name: "Próximamente", image: null },
  { category: "Cobertura de evento", name: "Próximamente", image: null },
  { category: "Identidad de marca",  name: "Próximamente", image: null },
  { category: "Fotografía",          name: "Próximamente", image: null },
];

const grid = document.getElementById('portfolioGrid');

portfolioItems.forEach(item => {
  const isLink = item.url ? true : false;
  const card = document.createElement(isLink ? 'a' : 'div');
  card.className = 'portfolio-card' + (item.image ? '' : ' placeholder') + (item.animated ? ' portfolio-animated' : '');
  if (isLink) {
    card.href   = item.url;
    card.target = '_blank';
    card.rel    = 'noopener';
  }

  card.innerHTML = `
    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
    ${item.animated ? `
    <div class="pod-effects" aria-hidden="true">
      <canvas class="pod-canvas"></canvas>
      <span class="pod-rec"><span class="pod-dot"></span>REC</span>
    </div>` : ''}
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

// =========================================================
// ANIMACIONES TARJETA PODCAST (ondas, REC, partículas, glow)
// =========================================================
(function initPodcastCard() {
  var card = document.querySelector('.portfolio-animated');
  if (!card) return;
  var canvas = card.querySelector('.pod-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = card.offsetWidth;
    canvas.height = card.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var cx, cy;
  function center() {
    cx = canvas.width  * 0.5;
    cy = canvas.height * 0.38; // un poco arriba del centro (zona de la cabeza)
  }
  center();
  window.addEventListener('resize', center);

  // -- Ondas de audio que pulsan --
  var waves = Array.from({ length: 5 }, function(_, i) {
    return {
      r:     60 + i * 28,
      alpha: 0,
      phase: i * (Math.PI * 2 / 5),
      speed: 0.018 + i * 0.004,
    };
  });

  // -- Partículas flotantes alrededor --
  var particles = Array.from({ length: 30 }, function() {
    var angle = Math.random() * Math.PI * 2;
    var dist  = 55 + Math.random() * 110;
    return {
      angle:  angle,
      dist:   dist,
      size:   Math.random() * 2 + 0.8,
      speed:  (Math.random() - 0.5) * 0.008,
      alpha:  Math.random() * 0.6 + 0.1,
      fade:   Math.random() * 0.012 + 0.004,
      dir:    1,
      color:  Math.random() > 0.5 ? '63,130,136' : '201,168,76',
    };
  });

  // -- Líneas de sonido (ecualizador lateral) --
  var bars = Array.from({ length: 12 }, function(_, i) {
    return {
      h:      Math.random() * 18 + 4,
      target: Math.random() * 22 + 2,
      speed:  Math.random() * 0.12 + 0.04,
    };
  });

  var t = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 0.016;

    // Glow central suave
    var grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140);
    grd.addColorStop(0, 'rgba(63,130,136,0.08)');
    grd.addColorStop(1, 'rgba(63,130,136,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ondas de audio
    waves.forEach(function(w) {
      w.phase += w.speed;
      var pulse = Math.sin(w.phase) * 0.5 + 0.5;
      var alpha = pulse * 0.35;
      var r     = w.r + Math.sin(w.phase * 0.7) * 8;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(63,130,136,' + alpha.toFixed(2) + ')';
      ctx.lineWidth   = 1.2;
      ctx.shadowColor = '#3f8288';
      ctx.shadowBlur  = 8;
      ctx.stroke();
      ctx.shadowBlur  = 0;
    });

    // Partículas
    particles.forEach(function(p) {
      p.angle += p.speed;
      p.alpha += p.fade * p.dir;
      if (p.alpha > 0.75 || p.alpha < 0.05) p.dir *= -1;

      var x = cx + Math.cos(p.angle) * p.dist;
      var y = cy + Math.sin(p.angle) * p.dist * 0.6; // elipse vertical
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ',' + p.alpha.toFixed(2) + ')';
      ctx.fill();
    });

    // Barras de sonido — lado izquierdo de la tarjeta
    var barW  = 3;
    var barGap = 5;
    var startX = 14;
    var baseY  = canvas.height * 0.72;
    bars.forEach(function(b, i) {
      b.h += (b.target - b.h) * b.speed;
      if (Math.random() < 0.03) b.target = Math.random() * 22 + 2;

      var pulse = Math.sin(t * 2 + i * 0.5) * 3;
      var h     = Math.max(3, b.h + pulse);
      var alpha = 0.45 + (h / 28) * 0.5;

      ctx.fillStyle = 'rgba(63,130,136,' + alpha.toFixed(2) + ')';
      ctx.shadowColor = '#3f8288';
      ctx.shadowBlur  = 4;
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(startX + i * (barW + barGap), baseY - h, barW, h, 1)
        : ctx.rect(startX + i * (barW + barGap), baseY - h, barW, h);
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    requestAnimationFrame(draw);
  }

  draw();
})();
