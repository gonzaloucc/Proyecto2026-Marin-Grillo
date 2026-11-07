export const TELEFONO_WHATSAPP = '5493510000000'

/**
 * Arma el link para abrir un chat de WhatsApp con La Pastelier y un mensaje ya escrito.
 * @method crearLinkWhatsApp
 * @param {string} mensaje - Texto que aparece cargado en el chat.
 * @return {string} Link de wa.me con el mensaje codificado.
 */
export const crearLinkWhatsApp = (mensaje) => {
    return 'https://wa.me/' + TELEFONO_WHATSAPP + '?text=' + encodeURIComponent(mensaje)
}
