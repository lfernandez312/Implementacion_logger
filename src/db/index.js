const mongoose = require('mongoose');
const { customizeError } = require('../services/error.services');

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.0mdumnn.mongodb.net/ecommerce?retryWrites=true&w=majority'
    )
    console.log('DB is connected')
  } catch (error) {
    const errorMessage = customizeError('ERROR_DB');
    res.status(500).json({ error: errorMessage });
  }
}

module.exports = mongoConnect
