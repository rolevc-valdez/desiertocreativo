# Desierto Creativo — Sitio web

Sitio estático (HTML/CSS/JS puro, sin frameworks ni build). Fondo negro,
tipografía editorial, con un hilo/aro animado en el hero como guiño al
isotipo de la marca.

---

## Estructura del proyecto

```
/
├── index.html      → todo el contenido y las secciones
├── styles.css      → estilos (colores, tipografía, layout)
├── script.js       → menú móvil, animaciones al hacer scroll, portafolio
└── assets/
    └── logo.png    → tu logo oficial
```

---

## Paso 1 — Subir el proyecto a GitHub

1. Copia estos 4 elementos (`index.html`, `styles.css`, `script.js`, `assets/`)
   a tu repo local o súbelos directo desde la interfaz web de GitHub
   ("Add file" → "Upload files", arrastrando todo junto, manteniendo la
   carpeta `assets/`).
2. Commit a la rama `main`.

---

## Paso 2 — Conectar el repo a Cloudflare Pages

1. Entra a **dash.cloudflare.com** → selecciona tu cuenta.
2. Ve a **Workers & Pages** → **Create** → pestaña **Pages** → **Connect to Git**.
3. Autoriza el acceso a GitHub y selecciona el repo de este sitio.
4. En la configuración de build:
   - **Framework preset**: None (ninguno, es HTML plano)
   - **Build command**: (déjalo vacío)
   - **Build output directory**: `/` (la raíz del repo)
5. Clic en **Save and Deploy**. En 1-2 minutos tendrás una URL tipo
   `tu-proyecto.pages.dev` funcionando.

---

## Paso 3 — Conectar tu dominio desiertocreativo.com

1. Dentro del proyecto en Cloudflare Pages, ve a la pestaña **Custom domains**.
2. Clic en **Set up a custom domain**.
3. Escribe `desiertocreativo.com` (y si quieres, agrega también `www.desiertocreativo.com`).
4. Como el dominio ya está en Cloudflare, la conexión del DNS se hace
   automática — no tienes que tocar registros manualmente.

Con esto, cada vez que hagas **push a GitHub**, Cloudflare Pages
despliega la nueva versión automáticamente. Sin Vercel, sin Supabase,
sin cuentas de más.

---

## Cómo actualizamos el contenido cada mes

Como no hay panel de administración, las actualizaciones se hacen editando
el código directamente — yo te ayudo con esto cuando me pases los detalles
nuevos (texto, imágenes, proyectos de portafolio). El flujo es:

1. Me pasas lo nuevo (texto, imágenes, enlaces).
2. Edito los archivos correspondientes.
3. Subes los cambios a GitHub (o yo te dejo el archivo actualizado para
   que lo subas).
4. Cloudflare Pages despliega solo, en automático.

### Para agregar un proyecto al portafolio

Abre `script.js`, busca el arreglo `portfolioItems` (cerca de la línea 40)
y agrega un bloque nuevo:

```js
{ category: "Podcast", name: "Nombre del cliente", image: "assets/portfolio/nombre-archivo.jpg" }
```

Sube la imagen del proyecto a una carpeta `assets/portfolio/` (créala si no
existe) con el mismo nombre de archivo que pusiste en `image`.

---

## Datos de contacto

Ya están cargados los datos reales en `index.html` (sección Contacto) y en
el footer:

- Correo: `desiertocreativoap@gmail.com`
- WhatsApp: `633 124 4172`
- Instagram: `@desiertocreativo`
- Facebook: `DESIERTOCREATIVO`

Si alguno cambia, avísame y lo actualizo.

---

## Notas de diseño

- El "hilo" animado del hero y el marcador circular (aro + punto) en cada
  servicio son un guiño directo al isotipo del logo — la idea de que las
  historias necesitan un hilo que las conecte.
- Los 6 espacios de portafolio están marcados como "Próximamente" — es
  intencional, listos para que subamos las imágenes reales de tus proyectos
  cuando las tengas.
- Todo el sitio funciona sin JavaScript también (con animaciones
  desactivadas) para máxima compatibilidad.
