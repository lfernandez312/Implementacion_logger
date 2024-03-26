const errorDictionary = {
    CATEGORY_NOT_FOUND: 'La categoria no se encontró correctamente.',
    PRODUCTS_NOT_FOUND: 'Los productos no se encontraron correctamente.',
    PRODUCT_NOT_FOUND: 'El producto no se encontró en la base de datos.',
    ERROR_SEND_MAIL: 'Error al enviar Email',
    ERROR_LOAD_CHAT: 'Error al cargar chat',
    ERROR_LOAD_CHAT_MS: 'Error al cargar el mensaje del chat',
    ERROR_CREATE_CHAT_MS: 'Error al crear el mensaje del chat',
    ERROR_CART: 'Error al obtener información del carrito',
    ERROR_CLEAN_CART: 'Error al limpiar información del carrito',
    UNAUTHORIZED_ACCESS: 'Acceso no autorizado a la página o recurso solicitado.',
    INTERNAL_SERVER_ERROR: 'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.',
    INVALID_CART: 'No se puede agregar al carrito.',
    INVALID_REMOVE_CART: 'No se puede eliminar del carrito.',
    INVALID_PURCHASE: 'Error al realizar la compra.',
    ERROR_DB: 'Logout Erroneo',
    BAD_REQUEST: 'Error interno del sistema',
    INVALID_CART_ID: 'El ID del carrito proporcionado no es válido.',
    INVALID_CART_CREATE: 'Error al crear un nuevo carrito',
    INVALID_CART_UPDATE: 'Error al actualizar carrito por id.',
    INVALID_CART_DELETE: 'Error al eliminar carrito por id.',
    INVALID_CART_POPULATE: 'Error al obtener carrito por populate.',
    PRODUCTS_NOT_FOUND_CART: 'Los productos no se encontraron correctamente en el carrito.',
};

// Función para personalizar errores
function customizeError(errorType) {
    return errorDictionary[errorType] || 'Error desconocido';
}

// Exporta la función y el diccionario para su uso en otros archivos
module.exports = {
    customizeError,
    errorDictionary,
};
