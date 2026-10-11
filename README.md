# La Pastelier - Cafetería de Especialidad y Patisserie

Repositorio correspondiente al proyecto de la cátedra **Desarrollo Web** (Segundo Año, Segundo Semestre - UCC).  
Sitio web institucional y catálogo interactivo para la cafetería y pastelería artesanal **La Pastelier**.

---

## Índice
1. [Descripción del Proyecto](#descripción-del-proyecto)
   - [Propósito del Sitio](#propósito-del-sitio)
   - [Estructura y Contenido](#estructura-y-contenido)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Integrantes del Equipo](#integrantes-del-equipo)
4. [Prototipos del Diseño](#prototipos-del-diseño)
5. [Estructura de Archivos](#estructura-de-archivos)
6. [Despliegue en GitHub Pages](#despliegue-en-github-pages)

---

## Descripción del Proyecto

### Propósito del Sitio
El propósito principal de la página es visibilizar la propuesta gastronómica de **La Pastelier**, facilitando el acceso a su carta digital (café de especialidad, pastelería, cocina salada y experiencias), las tortas personalizadas de atelier, información de contacto, horarios y ubicación física del local, junto con módulos interactivos para reservar una mesa y hacer pedidos para llevar.

### Estructura y Contenido
El sitio web cuenta con las siguientes secciones:
- **Encabezado y Navegación:** Barra con logotipo, accesos directos a las distintas áreas y un ícono con la cantidad de productos del pedido.
- **Hero / Portada:** Presentación de la marca con llamadas a la acción (*Call to Action*): ver la carta, reservar y pedir para llevar.
- **Carta (`carta.html`):**
  - Tres accesos desde el inicio: Bebidas, Dulce y salado, y Experiencias.
  - Carta completa generada con JavaScript a partir de un listado de productos.
  - Filtros por categoría y buscador por palabra.
- **Reservas (Módulo Interactivo):** Formulario con nombre, cantidad de personas, fecha (hasta 14 días desde hoy) y horario. Valida los datos, muestra un mensaje de error en un diálogo y genera el resumen de la reserva.
- **Take away (`pedido.html` y `carrito.html`):**
  - Catálogo de productos para llevar con selector de cantidad.
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

## Tecnologías Utilizadas

| Tecnología | Descripción | Uso en el Proyecto |
| :--- | :--- | :--- |
| **HTML5** | Lenguaje de marcado semántico | Estructura del sitio, navegación, cartas y formularios accesibles |
| **CSS3** | Hojas de estilo en cascada | Diseño responsivo, tipografía, paleta de colores y componentes reutilizables |
| **JavaScript (ES6+)** | Lenguaje de programación del cliente | Validaciones, renderizado de productos, filtros, buscador, carrito y generación del mensaje del pedido |
| **Web Storage API** | Almacenamiento del navegador | Persistencia del carrito mediante `localStorage` |
| **Google Fonts** | Recursos tipográficos e iconos | Tipografía Alegreya e iconos Material Symbols |
| **Git & GitHub** | Control de versiones | Gestión colaborativa mediante ramas, Pull Requests y conventional commits |

---

## Integrantes del Equipo

| Apellido y Nombre | Rama de Trabajo | Rol en el Proyecto |
| :--- | :--- | :--- |
| **Grillo, Facundo** | `facundogrilloucc` | Desarrollo Frontend |
| **Marín, Gonzalo** | `gonzaloucc` | Desarrollo Frontend |

---

## Prototipos del Diseño

Los prototipos de baja y alta fidelidad requeridos para la entrega se encuentran organizados en las siguientes carpetas:
- **Sketch (Papel):** Disponibles en [`primera-entrega/Sketch/`](primera-entrega/Sketch/) en versiones Desktop y Mobile.
- **Mockup (Digital):** Diseñados en Canva con versiones Desktop, Mobile y estados de error. Por su tamaño, los PDF están en Google Drive; el enlace se encuentra en [`primera-entrega/Mockup/enlacedrive.txt`](primera-entrega/Mockup/enlacedrive.txt).
- **Prototipo Interactivo en Canva:** [Ver prototipo online](https://sketchproyecto.my.canva.site)

---

## Estructura de Archivos

La entrega principal se encuentra organizada dentro de `primera-entrega/`:

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

El sitio se publicará en GitHub Pages una vez configurada la fuente de publicación del repositorio:
- **Sitio en vivo:** [https://gonzaloucc.github.io/Proyecto2026-Marin-Grillo-Gimenez/primera-entrega/](https://gonzaloucc.github.io/Proyecto2026-Marin-Grillo-Gimenez/primera-entrega/)

La publicación queda pendiente de habilitarse desde la configuración de GitHub Pages del repositorio. La página principal de la entrega se encuentra en `primera-entrega/index.html`.
