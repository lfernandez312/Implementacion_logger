const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Calcula el total de los productos en el carrito
cartSchema.virtual('total').get(function () {
  return this.products.reduce((acc, product) => acc + product.quantity * product.price, 0);
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
