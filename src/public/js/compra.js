function removeFromCart(productId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres eliminar este producto del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/cart/remove/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                // Recargar la página para actualizar la información del carrito
                location.reload(); 
            })
            .then(() => {
                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    text: 'El producto se eliminó correctamente del carrito.'
                });
            })
            .catch(error => console.error('Error al eliminar producto del carrito:', error));
        }
    });
}

function finishCart() {
    Swal.fire({
        title: '¿Finalizar compra?',
        text: '¿Quieres finalizar tu compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                // Obtén la información del carrito del usuario utilizando la función del controlador
                fetch(' /cart/info/compra', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    // Asegúrate de que la respuesta contenga la información del carrito
                    const cartInfo = data.cartInfo;

                    // Realiza la solicitud POST para finalizar la compra
                    fetch(`/cart/${cartInfo._id}/purchase`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ cartInfo }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message);
                        // Recargar el carrito a vacío
                        location.reload(); 
                    })
                    .then(() => {
                        // Mostrar mensaje de éxito
                        Swal.fire({
                            icon: 'success',
                            title: 'Compra exitosa',
                            text: 'Tu compra se realizó con éxito.'
                        });
                    })
                    .catch(error => {
                        console.error('Error al finalizar la compra:', error);
                    });
                })
                .catch(error => {
                    console.error('Error al obtener información del carrito:', error);
                });
            } catch (error) {
                console.error('Error general:', error);
            }
        }
    });
}