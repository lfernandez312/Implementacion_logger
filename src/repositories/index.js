const MessageFactory = require('../adapters/factory');
const MessageRepository = require('./messages.repository');

const messageFactory = new MessageFactory();
const messageManager = messageFactory.getMessageManager();
const messageRepository = new MessageRepository(messageManager);

const newUserInfo = { /* información del nuevo usuario */ };

// Llama al método create en el repositorio para añadir el nuevo usuario y enviar el mensaje
messageRepository.create(newUserInfo);
