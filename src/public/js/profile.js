const logoutButton = document.getElementById('logout')

logoutButton.addEventListener('click', () => {
  fetch('/login/logout', {
    method: 'GET',
    credentials: 'same-origin', // Incluye cookies en la solicitud si el dominio es el mismo
  })
  .then(response => {
    if (response.ok) {
      console.log('Logout successful');
      // Puedes redirigir a una página de inicio de sesión o actualizar la página
      window.location.href = '/login';
    } else {
      console.error('Logout failed');
    }
  })
  .catch(error => {
    console.error('Error during logout:', error);
  });
});