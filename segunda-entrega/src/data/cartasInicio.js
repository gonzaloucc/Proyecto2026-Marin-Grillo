import cafeArteLatte from '@assets/home/cafe-arte-latte.jpeg'
import laminados from '@assets/home/laminados-artesanales.jpg'

export const cartasInicio = [
    {
        id: 'bebidas',
        imagen: cafeArteLatte,
        alt: 'Café con arte latte en taza de porcelana floreada',
        etiqueta: '01 · Para tomar',
        titulo: 'Bebidas',
        texto: 'Café de especialidad, cafés fríos, té en hebras, limonadas y licuados.',
        enlace: '/carta#bebidas',
        textoEnlace: 'Ver bebidas',
    },
    {
        id: 'comer',
        imagen: laminados,
        alt: 'Croissants y medialunas artesanales sobre platos blancos',
        etiqueta: '02 · Para comer',
        titulo: 'Dulce y salado',
        texto: 'Laminados, pastelería de autor, porciones de torta, croissants rellenos y tostones.',
        enlace: '/carta#comer',
        textoEnlace: 'Ver dulce y salado',
    },
    {
        id: 'experiencias',
        imagen: '/imagenes/merienda.jpeg',
        alt: 'Mesa de merienda con cafés, porciones de torta y tostadas',
        etiqueta: '03 · Combos',
        titulo: 'Experiencias',
        texto: 'Desayunos, meriendas, brunch y la Torre de Reinas para compartir.',
        enlace: '/carta#experiencias',
        textoEnlace: 'Ver experiencias',
    },
]
