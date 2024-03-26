const form = document.getElementById('signupForm')

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))

  const url = '/users'
  const headers = {
    'Content-Type': 'application/json',
  }
  const method = 'POST'
  const body = JSON.stringify(obj)

  fetch(url, {
    headers,
    method,
    body,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada correctamente.',
        }).then(() => {
          window.location.href = '/login';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Ya hay una cuenta creada con ese usuario: ${data.error}`,
        });
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Ha ocurrido un error: ${error.message}`,
      });
    });
});
document.getElementById('password').addEventListener('input', function () {
  document.getElementById('readonlyPassword').value = this.value;
});
function unificarTelefonos() {
  // Obtener los valores de los campos
  var prefijo = document.getElementById('prefijo').value;
  var numero = document.getElementById('numero').value;

  // Unificar los valores y actualizar el campo 'telefonoCompleto'
  var telefonoCompleto = prefijo + numero;
  document.getElementById('phone').value = telefonoCompleto;
}
