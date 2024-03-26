$('.add-to-cart-btn').on('click', function () {
    const productId = $(this).data('product-id');
    const quantity = $(this).siblings('.quantity-input').val();

    // Enviar solicitud al servidor para agregar el producto al carrito
    jQuery.ajax({
        type: 'POST',
        url: '/cart/agregar',  // Ajusta según tu ruta
        data: { productId, quantity },
        success: function (response) {
            // Aquí puedes manejar la respuesta del servidor, si es necesario
            if (response.status === 'success') {
                // Muestra un SweetAlert de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado al carrito con éxito',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // Muestra un SweetAlert de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar al carrito',
                    text: 'Hubo un problema al agregar el producto al carrito.',
                });
            }
        },
        error: function (error) {
            console.error(error);
            // Manejar errores, si es necesario
            // Muestra un SweetAlert de error en caso de fallo en la solicitud AJAX
            Swal.fire({
                icon: 'error',
                title: 'Registrate o inicia sesion',
                text: 'Para agregar al carrito',
            });
        }
    });
});