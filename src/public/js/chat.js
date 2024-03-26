const socket = io({ transports: ['polling'] });
const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');
const connectedUsersElement = document.getElementById('connectedUsers');

const getUsername = async () => {
  try {
    const result = await Swal.fire({
      title: 'Bienvenido al CoderChat',
      text: 'Ingresa tu usuario para identificarte',
      input: 'text',
      icon: 'success',
    });

    const username = result.value;

    socket.emit('newUser', { username });

    socket.on('userConnected', (user) => {
      Swal.fire({
        text: `Se acaba de conectar ${user.username}`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'success',
      });

      // Actualizar el mensajeLogs con el color verde
      messageLogs.innerHTML = `<span style="color:green;">${user.username} </span> se ha conectado<br>` + messageLogs.innerHTML;

      // Actualizar la lista de usuarios conectados
      updateConnectedUsers(user.connectedUsers);
    });

    socket.on('userDisconnected', (user) => {
      Swal.fire({
        text: `${user.username} se ha desconectado`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'error',
      });

      // Actualizar el mensajeLogs con el color rojo
      messageLogs.innerHTML = `<span style="color:red;">${user.username} </span> se ha desconectado<br>` + messageLogs.innerHTML;

      // Actualizar la lista de usuarios conectados
      updateConnectedUsers(user.connectedUsers);
    });

    const enviarMensaje = () => {
      const data = {
        username: username,
        message: chatBox.value,
      };
      chatBox.value = '';

      socket.emit('message', data);
    };

    chatBox.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        enviarMensaje();
      }
    });

    const botonEnviarChat = document.getElementById('botonEnviarChat');
    botonEnviarChat.addEventListener('click', enviarMensaje);
  } catch (error) {
    console.log(error);
  }
};

getUsername();

socket.on('messageLogs', (chats) => {
  const messageLogs = document.getElementById('messageLogs');
  let messages = '';

  chats.forEach((chat) => {
    messages += `<span>${chat.username} dice: ${chat.message}</span><br>`;
  });

  // Actualiza el contenido con todos los mensajes acumulados
  messageLogs.innerHTML = messages;
});

function updateConnectedUsers(users) {
  // Mostrar la lista de usuarios conectados
  connectedUsersElement.innerHTML = `Usuarios Conectados: ${users.join(', ')}`;
}
