// Encabezados de cada categoría de la carta (las imágenes están en /public/imagenes)
export const categoriasCarta = [
    {
        id: 'bebidas',
        imagen: '/imagenes/cafe-latte-con-postre.jpeg',
        alt: 'Café con arte latte servido en taza de porcelana',
        etiqueta: '01 · Para tomar',
        titulo: 'Bebidas',
        texto: 'Café de especialidad, opciones frías, té en hebras, limonadas y licuados.'
    },
    {
        id: 'dulce',
        imagen: '/imagenes/cookies-artesanales.jpg',
        alt: 'Cookies artesanales de pistacho, Nutella, red velvet y Oreo',
        etiqueta: '02 · Para comer',
        titulo: 'Dulce',
        texto: 'Laminados, pastelería individual y porciones de nuestras tortas.'
    },
    {
        id: 'salado',
        imagen: '/imagenes/toston-palta-huevo.jpg',
        alt: 'Tostón de masa madre con huevos revueltos, queso crema y palta',
        etiqueta: '02 · Para comer',
        titulo: 'Salado',
        texto: 'Croissants rellenos, sándwiches tostados y tostones de masa madre.'
    },
    {
        id: 'experiencias',
        imagen: '/imagenes/merienda.jpeg',
        alt: 'Mesa de merienda con cafés, porciones de torta y tostadas',
        etiqueta: '03 · Combos',
        titulo: 'Experiencias',
        texto: 'Desayunos, meriendas y brunch: tu infusión con algo rico para acompañar.'
    }
]

// Opciones del filtro por categoría
export const filtrosCarta = [
    { valor: 'todo', texto: 'Todo', icono: 'menu_book' },
    { valor: 'bebidas', texto: 'Bebidas', icono: 'local_cafe' },
    { valor: 'comer', texto: 'Dulce y salado', icono: 'restaurant' },
    { valor: 'dulce', texto: 'Dulce', icono: 'bakery_dining' },
    { valor: 'salado', texto: 'Salado', icono: 'egg_alt' },
    { valor: 'experiencias', texto: 'Experiencias', icono: 'brunch_dining' }
]
