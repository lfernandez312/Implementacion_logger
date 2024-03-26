const mongoose = require('mongoose');

const userCollection = 'users';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  password: String,
  age: {
    type: Number,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user'
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
});

const Users = mongoose.model(userCollection, userSchema);

module.exports = Users;
