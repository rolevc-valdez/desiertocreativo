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
  { category: "Video promocional",   name: "Rinconcito del Sabor", image: "assets/portfolio/port-002.jpg", url: "https://www.youtube.com/watch?v=kK-jzx7FBJQ", effect: "promo" },
  { category: "Comercial",           name: "Block Master", image: "assets/portfolio/port-003.jpg", url: "https://www.youtube.com/watch?v=eDh1deXEFLM", effect: "comercial" },
  { category: "Cobertura de evento", name: "Animatoons", image: "assets/portfolio/port-005.jpg", url: "https://www.youtube.com/watch?v=vuf1s4aMG7Q", effect: "evento" },
  { category: "Identidad de marca",  name: "D'Kachuchas", image: "assets/portfolio/port-004.jpg", url: "https://www.youtube.com/watch?v=2_4UBIXYl-M", effect: "branding" },
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
    ${item.effect ? `<canvas class="fx-canvas fx-${item.effect}" aria-hidden="true"></canvas>` : ''}
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

// =========================================================
// EFECTOS — VIDEO PROMOCIONAL (shimmer dorado + partículas cálidas)
// =========================================================
(function initPromoEffect() {
  var canvas = document.querySelector('.fx-promo');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var card = canvas.closest('.portfolio-card');

  function resize() {
    canvas.width  = card.offsetWidth;
    canvas.height = card.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Partículas cálidas (vapor/chispas doradas)
  var particles = Array.from({ length: 28 }, function() {
    return {
      x:     Math.random() * canvas.width,
      y:     canvas.height + Math.random() * 40,
      size:  Math.random() * 2.2 + 0.6,
      speed: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.4,
      alpha: 0,
      maxA:  Math.random() * 0.55 + 0.15,
      life:  0,
      maxLife: Math.random() * 180 + 120,
      color: Math.random() > 0.4 ? '201,168,76' : '230,180,80',
    };
  });

  // Shimmer — barra diagonal que barre
  var shimmer = { x: -canvas.width * 1.5, speed: 0.8, pause: 0, pauseMax: 200 };

  var t = 0;
  function drawPromo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;

    // -- Shimmer dorado diagonal --
    if (shimmer.pause > 0) {
      shimmer.pause--;
    } else {
      shimmer.x += shimmer.speed;
      if (shimmer.x > canvas.width * 2) {
        shimmer.x = -canvas.width * 1.5;
        shimmer.pause = shimmer.pauseMax;
      }
      var grd = ctx.createLinearGradient(
        shimmer.x - 80, 0, shimmer.x + 80, canvas.height
      );
      grd.addColorStop(0,   'rgba(201,168,76,0)');
      grd.addColorStop(0.4, 'rgba(201,168,76,0.13)');
      grd.addColorStop(0.5, 'rgba(255,220,100,0.22)');
      grd.addColorStop(0.6, 'rgba(201,168,76,0.13)');
      grd.addColorStop(1,   'rgba(201,168,76,0)');

      ctx.save();
      ctx.transform(1, 0, -0.5, 1, 0, 0); // inclinar diagonal
      ctx.fillStyle = grd;
      ctx.fillRect(shimmer.x, 0, 160, canvas.height);
      ctx.restore();
    }

    // -- Partículas cálidas subiendo --
    particles.forEach(function(p) {
      p.life++;
      p.y     -= p.speed;
      p.x     += p.drift + Math.sin(p.life * 0.04) * 0.3;
      p.alpha  = p.life < 20
        ? (p.life / 20) * p.maxA
        : p.life > p.maxLife - 30
          ? ((p.maxLife - p.life) / 30) * p.maxA
          : p.maxA;

      if (p.life >= p.maxLife || p.y < -10) {
        p.x      = Math.random() * canvas.width;
        p.y      = canvas.height + 10;
        p.life   = 0;
        p.maxLife= Math.random() * 180 + 120;
        p.speed  = Math.random() * 0.6 + 0.2;
        p.size   = Math.random() * 2.2 + 0.6;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ',' + p.alpha.toFixed(2) + ')';
      ctx.shadowColor = 'rgba(255,180,40,0.4)';
      ctx.shadowBlur  = 4;
      ctx.fill();
      ctx.shadowBlur  = 0;
    });

    // -- Borde pulsante dorado --
    var pulse = Math.sin(t * 0.025) * 0.5 + 0.5;
    ctx.strokeStyle = 'rgba(201,168,76,' + (0.15 + pulse * 0.25).toFixed(2) + ')';
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = 'rgba(201,168,76,0.5)';
    ctx.shadowBlur  = pulse * 10;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.shadowBlur  = 0;

    requestAnimationFrame(drawPromo);
  }
  drawPromo();
})();

// =========================================================
// EFECTOS — COMERCIAL (scanlines + borde eléctrico)
// =========================================================
(function initComercialEffect() {
  var canvas = document.querySelector('.fx-comercial');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var card = canvas.closest('.portfolio-card');

  function resize() {
    canvas.width  = card.offsetWidth;
    canvas.height = card.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Scanline
  var scanY = 0;

  // Borde eléctrico — segmentos que recorren el perímetro
  var perim, segments;
  function buildPerim() {
    var W = canvas.width, H = canvas.height;
    perim = W*2 + H*2;
    segments = Array.from({ length: 4 }, function(_, i) {
      return {
        pos:   (perim / 4) * i + Math.random() * 60,
        speed: 1.4 + Math.random() * 1.2,
        tail:  40 + Math.random() * 50,
        alpha: 0.7 + Math.random() * 0.3,
        color: Math.random() > 0.5 ? '80,160,220' : '100,200,255',
      };
    });
  }
  buildPerim();
  window.addEventListener('resize', buildPerim);

  // Convertir posición en el perímetro a coordenadas x,y
  function perimToXY(pos, W, H) {
    var p = ((pos % perim) + perim) % perim;
    if (p < W)              return [p, 0];
    p -= W;
    if (p < H)              return [W, p];
    p -= H;
    if (p < W)              return [W - p, H];
    p -= W;
    return [0, H - p];
  }

  // Glitch ocasional
  var glitchTimer = 0, glitchDur = 0;

  var t = 0;
  function drawComercial() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;
    var W = canvas.width, H = canvas.height;

    // -- Scanlines --
    scanY += 0.7;
    if (scanY > H) scanY = -4;

    for (var y = 0; y < H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      ctx.fillRect(0, y, W, 1);
    }
    // Línea brillante que baja
    var sg = ctx.createLinearGradient(0, scanY - 6, 0, scanY + 6);
    sg.addColorStop(0,   'rgba(100,180,255,0)');
    sg.addColorStop(0.5, 'rgba(100,180,255,0.18)');
    sg.addColorStop(1,   'rgba(100,180,255,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, scanY - 6, W, 12);

    // -- Glitch ocasional --
    if (glitchDur > 0) {
      glitchDur--;
      var sliceH = 3 + Math.random() * 8;
      var sliceY = Math.random() * H;
      var shift  = (Math.random() - 0.5) * 12;
      ctx.save();
      ctx.drawImage(canvas, 0, sliceY, W, sliceH, shift, sliceY, W, sliceH);
      ctx.restore();
      ctx.fillStyle = 'rgba(80,160,220,0.08)';
      ctx.fillRect(0, sliceY, W, sliceH);
    } else {
      glitchTimer++;
      if (glitchTimer > 180 + Math.random() * 300) {
        glitchTimer = 0;
        glitchDur   = 3 + Math.floor(Math.random() * 5);
      }
    }

    // -- Borde eléctrico --
    segments.forEach(function(seg) {
      seg.pos += seg.speed;
      if (seg.pos > perim) seg.pos -= perim;

      var steps = 20;
      for (var s = 0; s < steps; s++) {
        var tA = seg.pos - seg.tail + (seg.tail / steps) * s;
        var tB = seg.pos - seg.tail + (seg.tail / steps) * (s + 1);
        var ptA = perimToXY(tA, W, H);
        var ptB = perimToXY(tB, W, H);
        var alpha = (s / steps);
        alpha = alpha * alpha * seg.alpha;

        // Jitter eléctrico
        var jitter = s === steps - 1 ? (Math.random() - 0.5) * 3 : 0;

        ctx.beginPath();
        ctx.moveTo(ptA[0], ptA[1]);
        ctx.lineTo(ptB[0] + jitter, ptB[1] + jitter);
        ctx.strokeStyle = 'rgba(' + seg.color + ',' + alpha.toFixed(2) + ')';
        ctx.lineWidth   = 1.8;
        ctx.shadowColor = 'rgba(80,160,255,0.7)';
        ctx.shadowBlur  = 8;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(drawComercial);
  }
  drawComercial();
})();

// =========================================================
// EFECTOS — IDENTIDAD DE MARCA (orbe orbital + sello)
// =========================================================
(function initBrandingEffect() {
  var canvas = document.querySelector('.fx-branding');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var card = canvas.closest('.portfolio-card');

  function resize() {
    canvas.width  = card.offsetWidth;
    canvas.height = card.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Orbe que orbita la tarjeta siguiendo el perímetro
  var orbs = [
    { pos: 0,      speed: 0.6, size: 5, color: '201,168,76', tail: 80 },
    { pos: 0.5,    speed: 0.4, size: 3, color: '255,220,120', tail: 50 },
    { pos: 0.75,   speed: 0.9, size: 2.5, color: '63,130,136', tail: 40 },
  ];

  // Estrellas de destello en esquinas — efecto "sello aprobado"
  var sparkles = Array.from({ length: 16 }, function(_, i) {
    var angle = (i / 16) * Math.PI * 2;
    var r = 28 + Math.random() * 18;
    return {
      // Posición fija en esquina superior derecha
      baseX: canvas.width  * 0.82,
      baseY: canvas.height * 0.12,
      angle: angle,
      r:     r,
      size:  Math.random() * 1.8 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.03 + Math.random() * 0.02,
      color: Math.random() > 0.5 ? '201,168,76' : '255,235,150',
    };
  });

  // Círculo de sello (aparece y desaparece)
  var seal = { alpha: 0, dir: 1, phase: 0 };

  function perimToXY(pos, W, H) {
    var perim = W * 2 + H * 2;
    var p = ((pos * perim) % perim + perim) % perim;
    if (p < W)      return [p, 0];
    p -= W;
    if (p < H)      return [W, p];
    p -= H;
    if (p < W)      return [W - p, H];
    p -= W;
    return [0, H - p];
  }

  var t = 0;
  function drawBranding() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;
    var W = canvas.width, H = canvas.height;

    // Actualizar posición de sparkles
    sparkles.forEach(function(s) {
      s.baseX = W * 0.82;
      s.baseY = H * 0.12;
    });

    // -- Orbes orbitales --
    orbs.forEach(function(orb) {
      orb.pos += orb.speed / (W * 2 + H * 2) * 3;
      if (orb.pos > 1) orb.pos -= 1;

      var steps = 30;
      for (var s = 0; s <= steps; s++) {
        var tA = orb.pos - (orb.tail / (W*2+H*2)) + (orb.tail / (W*2+H*2) / steps) * s;
        var tB = orb.pos - (orb.tail / (W*2+H*2)) + (orb.tail / (W*2+H*2) / steps) * (s + 1);
        var ptA = perimToXY(tA, W, H);
        var ptB = perimToXY(tB, W, H);
        var alpha = Math.pow(s / steps, 1.5) * 0.85;

        ctx.beginPath();
        ctx.moveTo(ptA[0], ptA[1]);
        ctx.lineTo(ptB[0], ptB[1]);
        ctx.strokeStyle = 'rgba(' + orb.color + ',' + alpha.toFixed(2) + ')';
        ctx.lineWidth   = orb.size * (s / steps);
        ctx.shadowColor = 'rgba(' + orb.color + ',0.6)';
        ctx.shadowBlur  = 12;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // Punto brillante en la punta
      var tip = perimToXY(orb.pos, W, H);
      ctx.beginPath();
      ctx.arc(tip[0], tip[1], orb.size, 0, Math.PI * 2);
      ctx.fillStyle   = 'rgba(' + orb.color + ',1)';
      ctx.shadowColor = 'rgba(' + orb.color + ',0.9)';
      ctx.shadowBlur  = 15;
      ctx.fill();
      ctx.shadowBlur  = 0;
    });

    // -- Sello circular pulsante --
    seal.phase += 0.018;
    seal.alpha = (Math.sin(seal.phase) * 0.5 + 0.5) * 0.55;
    var sx = W * 0.82, sy = H * 0.12, sr = 32;

    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(201,168,76,' + seal.alpha.toFixed(2) + ')';
    ctx.lineWidth   = 1;
    ctx.shadowColor = 'rgba(201,168,76,0.6)';
    ctx.shadowBlur  = 8;
    ctx.stroke();
    ctx.shadowBlur  = 0;

    // Círculo interior más pequeño
    ctx.beginPath();
    ctx.arc(sx, sy, sr * 0.7, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(201,168,76,' + (seal.alpha * 0.6).toFixed(2) + ')';
    ctx.lineWidth   = 0.5;
    ctx.stroke();

    // -- Destellos de estrellas alrededor del sello --
    sparkles.forEach(function(s) {
      s.phase += s.speed;
      var pulse = Math.sin(s.phase) * 0.5 + 0.5;
      var x = s.baseX + Math.cos(s.angle) * s.r;
      var y = s.baseY + Math.sin(s.angle) * s.r;
      var alpha = pulse * 0.6 * seal.alpha * 2;

      ctx.beginPath();
      ctx.arc(x, y, s.size * pulse, 0, Math.PI * 2);
      ctx.fillStyle   = 'rgba(' + s.color + ',' + Math.min(alpha, 0.7).toFixed(2) + ')';
      ctx.shadowColor = 'rgba(201,168,76,0.5)';
      ctx.shadowBlur  = 4;
      ctx.fill();
      ctx.shadowBlur  = 0;
    });

    requestAnimationFrame(drawBranding);
  }
  drawBranding();
})();

// =========================================================
// EFECTOS — COBERTURA DE EVENTO ANIME
// confetti de colores + flash fotográfico + bordes de película
// =========================================================
(function initEventoEffect() {
  var canvas = document.querySelector('.fx-evento');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var card = canvas.closest('.portfolio-card');

  function resize() {
    canvas.width  = card.offsetWidth;
    canvas.height = card.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Colores anime vibrantes
  var animeColors = [
    '255,80,160',   // rosa
    '80,200,255',   // azul cielo
    '255,220,0',    // amarillo
    '120,255,120',  // verde neón
    '200,80,255',   // morado
    '255,140,0',    // naranja
  ];

  // Confetti
  var confetti = Array.from({ length: 45 }, function() {
    return {
      x:      Math.random() * 800,
      y:      Math.random() * -200 - 10,
      w:      Math.random() * 7 + 3,
      h:      Math.random() * 4 + 2,
      rot:    Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.12,
      speed:  Math.random() * 1.4 + 0.5,
      drift:  (Math.random() - 0.5) * 0.8,
      alpha:  Math.random() * 0.7 + 0.3,
      color:  animeColors[Math.floor(Math.random() * animeColors.length)],
      phase:  Math.random() * Math.PI * 2,
    };
  });

  // Flash fotográfico
  var flash = { alpha: 0, timer: 0, interval: 220 + Math.floor(Math.random() * 180) };

  // Estrellas tipo anime (★ destello)
  var stars = Array.from({ length: 8 }, function() {
    return {
      x:     Math.random(),
      y:     Math.random(),
      size:  Math.random() * 8 + 4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.04 + Math.random() * 0.03,
      color: animeColors[Math.floor(Math.random() * animeColors.length)],
    };
  });

  var t = 0;
  function drawEvento() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;
    var W = canvas.width, H = canvas.height;

    // -- Confetti cayendo --
    confetti.forEach(function(p) {
      p.y   += p.speed;
      p.x   += p.drift + Math.sin(t * 0.02 + p.phase) * 0.5;
      p.rot += p.rotSpeed;

      if (p.y > H + 20) {
        p.y = -10 - Math.random() * 40;
        p.x = Math.random() * W;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha * (0.6 + Math.sin(t * 0.03 + p.phase) * 0.4);
      ctx.fillStyle   = 'rgba(' + p.color + ',1)';
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      ctx.globalAlpha = 1;
    });

    // -- Estrellas de destello anime --
    stars.forEach(function(s) {
      s.phase += s.speed;
      var pulse = Math.sin(s.phase) * 0.5 + 0.5;
      if (pulse < 0.3) return;

      var x = s.x * W, y = s.y * H;
      var size = s.size * pulse;

      // Cruz de destello (★ estilo manga)
      ctx.save();
      ctx.globalAlpha = pulse * 0.85;
      ctx.strokeStyle = 'rgba(' + s.color + ',1)';
      ctx.shadowColor = 'rgba(' + s.color + ',0.8)';
      ctx.shadowBlur  = 8;
      ctx.lineWidth   = 1.5;

      // Línea horizontal
      ctx.beginPath();
      ctx.moveTo(x - size * 1.4, y);
      ctx.lineTo(x + size * 1.4, y);
      ctx.stroke();
      // Línea vertical
      ctx.beginPath();
      ctx.moveTo(x, y - size * 1.4);
      ctx.lineTo(x, y + size * 1.4);
      ctx.stroke();
      // Diagonales más cortas
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - size * 0.8, y - size * 0.8);
      ctx.lineTo(x + size * 0.8, y + size * 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + size * 0.8, y - size * 0.8);
      ctx.lineTo(x - size * 0.8, y + size * 0.8);
      ctx.stroke();

      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;
    });

    // -- Flash fotográfico --
    flash.timer++;
    if (flash.timer >= flash.interval) {
      flash.timer    = 0;
      flash.interval = 200 + Math.floor(Math.random() * 300);
      flash.alpha    = 0.45;
    }
    if (flash.alpha > 0) {
      ctx.fillStyle   = 'rgba(255,255,255,' + flash.alpha.toFixed(2) + ')';
      ctx.fillRect(0, 0, W, H);
      flash.alpha    -= 0.04;
      if (flash.alpha < 0) flash.alpha = 0;
    }

    // -- Borde de película (sprocket holes) --
    var holeSize = 6, holeGap = 16, margin = 5;
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    for (var hy = holeGap; hy < H - holeGap; hy += holeGap) {
      // Izquierda
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(margin, hy, holeSize, holeSize * 0.7, 1)
        : ctx.rect(margin, hy, holeSize, holeSize * 0.7);
      ctx.fill();
      // Derecha
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(W - margin - holeSize, hy, holeSize, holeSize * 0.7, 1)
        : ctx.rect(W - margin - holeSize, hy, holeSize, holeSize * 0.7);
      ctx.fill();
    }

    // Líneas verticales de película
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth   = 2;
    ctx.beginPath(); ctx.moveTo(margin + holeSize + 3, 0); ctx.lineTo(margin + holeSize + 3, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - margin - holeSize - 3, 0); ctx.lineTo(W - margin - holeSize - 3, H); ctx.stroke();

    requestAnimationFrame(drawEvento);
  }
  drawEvento();
})();
