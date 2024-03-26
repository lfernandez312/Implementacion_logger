document.getElementById('password').addEventListener('input', function () {
  document.getElementById('readonlyPassword').value = this.value;
});

const form = document.getElementById('forgotPassword')

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))
  
  fetch('/auth/forgotpassword', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(obj),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // Muestra un mensaje de éxito con SweetAlert 2
        Swal.fire({
          icon: 'success',
          title: 'Solicitud exitosa',
          text: 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.',
        }).then(() => {
          // Redirige al usuario al inicio de sesión o a donde desees
          window.location.href = '/login';
        });
      } else {
        // Muestra un mensaje de error con SweetAlert 2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Ha ocurrido un error: ${data.error}`,
        });
      }
    })
    .catch(error => {
      // Muestra un mensaje de error con SweetAlert 2 si hay un error de red o servidor
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Ha ocurrido un error: ${error.message}`,
      });
    });
});