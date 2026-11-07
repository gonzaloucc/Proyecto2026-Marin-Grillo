# La Pastelier - Cafetería de Especialidad y Patisserie

Repositorio correspondiente al proyecto de la cátedra **Desarrollo Web** (Segundo Año, Segundo Semestre - UCC).  
Sitio web institucional y catálogo interactivo para la cafetería y pastelería artesanal **La Pastelier**.

---

## Índice
1. [Descripción del Proyecto](#descripción-del-proyecto)
   - [Propósito del Sitio](#propósito-del-sitio)
   - [Estructura y Contenido](#estructura-y-contenido)
2. [Entregas](#entregas)
3. [Ejecución del Proyecto](#ejecución-del-proyecto)
   - [Requisitos](#requisitos)
   - [Pasos para ejecutar la segunda entrega](#pasos-para-ejecutar-la-segunda-entrega)
   - [Scripts disponibles](#scripts-disponibles)
   - [Primera entrega](#primera-entrega)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Integrantes del Equipo](#integrantes-del-equipo)
6. [Prototipos del Diseño](#prototipos-del-diseño)
7. [Estructura de Archivos](#estructura-de-archivos)
8. [Despliegue en GitHub Pages](#despliegue-en-github-pages)

---

## Descripción del Proyecto

### Propósito del Sitio
El propósito principal de la página es visibilizar la propuesta gastronómica de **La Pastelier**, facilitando el acceso a su carta digital (café de especialidad, pastelería, cocina salada y experiencias), las tortas personalizadas de atelier, información de contacto, horarios y ubicación física del local, junto con módulos interactivos para reservar una mesa y hacer pedidos para llevar.

### Estructura y Contenido
El sitio web cuenta con las siguientes secciones:
- **Encabezado y Navegación:** Barra con logotipo, accesos directos a las distintas áreas y un ícono con la cantidad de productos del pedido.
- **Hero / Portada:** Presentación de la marca con llamadas a la acción (*Call to Action*): ver la carta, reservar y pedir para llevar.
- **Carta:**
  - Tres accesos desde el inicio: Bebidas, Dulce y salado, y Experiencias.
  - Carta completa generada a partir de un listado de productos (en la segunda entrega se obtiene de un servicio simulado con `json-server`).
  - Filtros por categoría y buscador por palabra.
- **Reservas (Módulo Interactivo):** Formulario con nombre, cantidad de personas, fecha (hasta 14 días desde hoy) y horario. Valida los datos y genera el resumen de la reserva. En la segunda entrega la validación es en tiempo real, con mensajes de error accesibles debajo de cada campo.
- **Take away (pedido y carrito):**
  - Catálogo de productos para llevar con selector de cantidad (hasta 10 unidades por producto).
  - Carrito guardado en `localStorage`, con subtotales y total.
  - Formulario de retiro en el local (solo para el mismo día) que genera el mensaje del pedido, lo muestra en la consola y abre el chat de WhatsApp.
- **Tortas Atelier:** Línea a pedido para bodas, cumpleaños y eventos, con consulta directa por WhatsApp.
- **Ubicación y Horarios:**
  - **Dirección:** Bv. Elías Yofre 1243, Barrio Jardín, X5014 Córdoba, Argentina ([Ver en Google Maps](https://maps.app.goo.gl/PPMGWtvZG7nSE82K6)).
  - **Horarios de Atención:**
    - **Martes a Domingo:** 8:30 a 14:00 hs y 16:00 a 21:00 hs.
    - **Lunes:** 16:00 a 21:00 hs.
- **Pie de Página (Footer):** Íconos con enlaces a Instagram, Facebook, WhatsApp, Google Maps y a las reseñas de Google para dejar una opinión.

---

## Entregas

| Entrega | Carpeta | Descripción |
| :--- | :--- | :--- |
| **Primera** | [`primera-entrega/`](primera-entrega/) | Sitio hecho con HTML, CSS y JavaScript, sin dependencias. |
| **Segunda** | [`segunda-entrega/`](segunda-entrega/) | El mismo sitio migrado a **React** con **Vite**, rutas con **react-router-dom**, estilos en **SASS** y la carta obtenida de un servicio simulado con **json-server**. |

Los requisitos de cada entrega están en su archivo `Requerimientos.md`.

---

## Ejecución del Proyecto

### Requisitos
- **Node.js** versión 20.19 o superior (o 22.12 o superior), que es lo que pide Vite 8.
- **npm** (se instala junto con Node.js).
- **Git**, para clonar el repositorio.

Para ver la versión instalada de Node.js:
```bash
node -v
```

### Pasos para ejecutar la segunda entrega
1. Clonar el repositorio y entrar a la carpeta de la segunda entrega:
```bash
git clone https://github.com/gonzaloucc/Proyecto2026-Marin-Grillo.git
cd Proyecto2026-Marin-Grillo/segunda-entrega
```
2. Instalar las dependencias:
```bash
npm install
```
3. En una terminal, levantar el servicio simulado (json-server en el puerto 4000):
```bash
npm run service
```
4. En **otra** terminal, dentro de `segunda-entrega`, levantar el proyecto:
```bash
npm run dev
```
5. Ingresar a [http://localhost:5173](http://localhost:5173).

> **Importante:** la carta y el pedido obtienen los productos del servicio, por lo que `npm run service` tiene que estar corriendo. Si no lo está, esas páginas muestran un mensaje de error en lugar de los productos.
>
> La dirección del servicio se configura en el archivo `segunda-entrega/.env` con la variable `VITE_BASE_URL` (por defecto `http://localhost:4000/`).

### Scripts disponibles

| Script | Qué hace |
| :--- | :--- |
| `npm run dev` | Levanta el proyecto en modo desarrollo con Vite (`http://localhost:5173`). |
| `npm run service` | Levanta el mock del servicio con json-server a partir de `src/data/db.json` (`http://localhost:4000/productos`). |
| `npm run build` | Genera la versión final del sitio en la carpeta `dist/`. |
| `npm run preview` | Muestra localmente la versión generada con `npm run build`. |
| `npm run lint` | Revisa el código con ESLint. |

### Primera entrega
No necesita instalación: alcanza con abrir `primera-entrega/index.html` en el navegador o ingresar al [sitio publicado](https://gonzaloucc.github.io/Proyecto2026-Marin-Grillo/).

---

## Tecnologías Utilizadas

### Segunda entrega

| Tecnología | Descripción | Uso en el Proyecto |
| :--- | :--- | :--- |
| **React 19** | Biblioteca de JavaScript para interfaces | Componentes, hooks (`useState`, `useEffect`, `useNavigate`, `useLocation`, `useOutletContext`) y renderizado de la carta, el pedido y los formularios |
| **Vite 8** | Herramienta de desarrollo y empaquetado | Creación del proyecto, servidor de desarrollo, alias de imports y build final |
| **React Router (react-router-dom 7)** | Enrutamiento | Rutas `/`, `/carta`, `/pedido`, `/carrito` y página no encontrada, con un `Layout` que usa `Outlet` |
| **SASS** | Preprocesador de CSS | Estilos en archivos `.scss` con variables, mixins, anidamiento y media queries |
| **json-server** | Mock de un servicio REST | Servicio de productos a partir de `db.json`, consumido con `fetch` y `async`/`await` |
| **ESLint 9** | Análisis de código | Detección de errores e imports o variables sin usar |
| **Web Storage API** | Almacenamiento del navegador | Persistencia del carrito mediante `localStorage` |
| **Google Fonts** | Recursos tipográficos e iconos | Tipografía Alegreya e iconos Material Symbols |
| **Git & GitHub** | Control de versiones | Gestión colaborativa mediante ramas, Pull Requests y conventional commits |

### Primera entrega

| Tecnología | Descripción | Uso en el Proyecto |
| :--- | :--- | :--- |
| **HTML5** | Lenguaje de marcado semántico | Estructura del sitio, navegación, cartas y formularios accesibles |
| **CSS3** | Hojas de estilo en cascada | Diseño responsivo, tipografía, paleta de colores y componentes reutilizables |
| **JavaScript (ES6+)** | Lenguaje de programación del cliente | Validaciones, renderizado de productos, filtros, buscador, carrito y generación del mensaje del pedido |
| **Web Storage API** | Almacenamiento del navegador | Persistencia del carrito mediante `localStorage` |
| **Google Fonts** | Recursos tipográficos e iconos | Tipografía Alegreya e iconos Material Symbols |

---

## Integrantes del Equipo

| Apellido y Nombre | Rama de Trabajo | Rol en el Proyecto |
| :--- | :--- | :--- |
| **Grillo, Facundo** | `facundogrilloucc` | Desarrollo Frontend |
| **Marín, Gonzalo** | `gonzaloucc` | Desarrollo Frontend |

---

## Prototipos del Diseño

Los prototipos de baja y alta fidelidad requeridos para la entrega se encuentran organizados en las siguientes carpetas:
- **Sketch (Papel):** Disponibles en [`primera-entrega/Sketch/`](primera-entrega/Sketch/) en versiones Desktop ([`sketch-desktop.png`](primera-entrega/Sketch/sketch-desktop.png)) y Mobile ([`sketch-mobile.png`](primera-entrega/Sketch/sketch-mobile.png)).
- **Mockup (Digital):** Diseñados en Canva con versiones Desktop, Mobile y estados de error. Por su tamaño, los PDF están en Google Drive; el enlace se encuentra en [`primera-entrega/Mockup/enlacedrive.txt`](primera-entrega/Mockup/enlacedrive.txt).
- **Prototipo Interactivo en Canva:** [Ver prototipo online](https://sketchproyecto.my.canva.site)

---

## Estructura de Archivos

### Segunda entrega (`segunda-entrega/`)

```
segunda-entrega/
├── public/              → logo e imágenes de las categorías de la carta
├── src/
│   ├── api/             → productosApi.js: fetch al servicio con async/await
│   ├── assets/home/     → imágenes del inicio (portada, tarjetas y atelier)
│   ├── components/      → Layout, Header, Footer, Card, Portada, Reserva, Atelier, Visitanos,
│   │                      CategoriaCarta y FiltrosCarta
│   ├── data/            → db.json (mock del servicio) y datos fijos de las tarjetas y categorías
│   ├── pages/           → Home, Carta, Pedido, Carrito y NoEncontrada
│   ├── styles/          → estilos .scss (variables, mixins, estilos generales y de cada página)
│   ├── utils/           → funciones auxiliares: precios, validaciones, carrito, retiro y WhatsApp
│   └── main.jsx         → punto de entrada con las rutas de la aplicación
├── .env                 → dirección del servicio (VITE_BASE_URL)
├── vite.config.js       → configuración de Vite y alias de imports (@components, @pages, @styles...)
├── eslint.config.js     → configuración de ESLint
└── package.json         → dependencias y scripts
```

### Primera entrega (`primera-entrega/`)

- `index.html`: página principal, reservas, ubicación y presentación del sitio.
- `carta.html`: carta digital con productos, categorías, filtros y buscador.
- `pedido.html`: selección de productos para pedidos take away.
- `carrito.html`: resumen del carrito y formulario del pedido.
- `estilo.css`: estilos generales y diseño responsive.
- `productos.js`: listado de productos y precios.
- `carta.js`: renderizado, filtros y búsqueda de productos.
- `carrito.js`: gestión del carrito, `localStorage` y generación del pedido.
- `reserva.js`: validación y resumen de reservas.
- `dialogo.js`: mensajes de error mediante diálogos.
- `imagenes/`: imágenes utilizadas por el sitio.
- `Sketch/` y `Mockup/`: prototipos de escritorio, mobile y mensajes de error.

---

## Despliegue en GitHub Pages

El sitio está publicado en GitHub Pages desde la rama `main`:
- **Sitio en vivo:** [https://gonzaloucc.github.io/Proyecto2026-Marin-Grillo/](https://gonzaloucc.github.io/Proyecto2026-Marin-Grillo/)

La página principal de la primera entrega se encuentra en `primera-entrega/index.html`. El `index.html` de la raíz del repositorio redirige automáticamente a esa carpeta.

La segunda entrega se ejecuta de forma local siguiendo los [pasos de ejecución](#pasos-para-ejecutar-la-segunda-entrega), ya que necesita que el servicio de json-server esté corriendo.
