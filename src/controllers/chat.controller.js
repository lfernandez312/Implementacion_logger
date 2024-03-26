const FilesDao = require('../dao/files.dao');
const Messages = require('../models/messages.model');

const chatFile = new FilesDao('chats.json');

const chatController = {
  getChatMessages: async () => {
    try {
      const messages = await chatFile.getItems();
      return messages;
    } catch (error) {
        const errorMessage = customizeError('ERROR_LOAD_CHAT');
        throw new Error(errorMessage);
    }
  },

  createChatMessage: async (userInfo) => {
    try {
      const newUser = await Messages.create(userInfo);
      return newUser;
    } catch (error) {
        const errorMessage = customizeError('ERROR_CREATE_CHAT_MS');
        throw new Error(errorMessage);
    }
  },
};


module.exports = chatController;