const mongoose = require('mongoose');

const userCollection = 'messages'

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
});

const Messages = mongoose.model(userCollection, chatSchema);

module.exports = Messages;
