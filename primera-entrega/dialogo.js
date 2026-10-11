let campoConError = null;

/**
 * Muestra el diálogo de error y blanquea el campo que tiene el valor incorrecto.
 * @method mostrarError
 * @param {Object} campo - Input o select que tiene el valor incorrecto (null si el error no es de un campo).
 * @param {string} titulo - Título que se muestra en el diálogo.
 * @param {string} texto - Explicación del error para el usuario.
 * @return {boolean} Siempre false, para indicar que la validación falló.
 */
const mostrarError = (campo, titulo, texto) => {
    campoConError = campo;

    if (campo !== null) {
        campo.value = '';
    }

    document.getElementById('dialogo-titulo').innerText = titulo;
    document.getElementById('dialogo-mensaje').innerText = 'Error: ' + texto;
    document.getElementById('dialogo-error').showModal();

    return false;
};

/**
 * Cierra el diálogo de error y vuelve a posicionar el cursor en el campo incorrecto.
 * @method cerrarDialogo
 * @return {void}
 */
const cerrarDialogo = () => {
    document.getElementById('dialogo-error').close();

    if (campoConError !== null) {
        campoConError.focus();
    }
};
