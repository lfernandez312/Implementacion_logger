const Cart = require('../models/carts.model');
const Products = require('../models/products.model');
const mongoose = require('mongoose');
const { customizeError } = require('../services/error.services');

const cartsController = {
    getAllCarts: async () => {
        try {
            const carts = await Cart.find();
            return carts;
        } catch (error) {
            v
            throw error;
        }
    },

    getCartById: async (cartId) => {
        try {
            const cart = await Cart.findById(cartId);
            return cart;
        } catch (error) {
            const errorMessage = customizeError('INVALID_CART_ID');
            throw new Error(errorMessage);
        }
    },

    createCart: async (cartInfo) => {
        try {
            const newCart = await Cart.create(cartInfo);
            return newCart;
        } catch (error) {
            const errorMessage = customizeError('INVALID_CART_CREATE');
            throw new Error(errorMessage);
        }
    },

    updateCart: async (cartId, updatedInfo) => {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(cartId, updatedInfo, { new: true });
            return updatedCart;
        } catch (error) {
            const errorMessage = customizeError('INVALID_CART_UPDATE');
            throw new Error(errorMessage);
        }
    },

    deleteCart: async (cartId) => {
        try {
            await Cart.findByIdAndDelete(cartId);
            return { message: 'Carrito eliminado con éxito' };
        } catch (error) {
            const errorMessage = customizeError('INVALID_CART_DELETE');
            throw new Error(errorMessage);
        }
    },

    getCartByIdPopulated: async (cartId) => {
        try {
            const populatedCart = await Cart.findById(cartId).populate('user'); // Ajusta 'user' según tu esquema
            return populatedCart;
        } catch (error) {
            const errorMessage = customizeError('INVALID_CART_POPULATE');
            throw new Error(errorMessage);
        }
    },

    addToCart: async (user, productId, quantity) => {
        try {
            // Obtén el carrito del usuario (si no existe, créalo)
            let cart = await Cart.findOne({ user });

            if (!cart) {
                cart = new Cart({ user, products: [] });
            }

            // Asegúrate de obtener los detalles del producto desde la base de datos
            const productDetails = await Products.findById(productId);

            if (!productDetails) {
                throw new Error('Producto no encontrado');
            }

            // Agrega el producto al carrito con los detalles requeridos
            cart.products.push({
                productId,
                name: productDetails.name,
                price: productDetails.price,
                quantity// Puedes ajustar la cantidad según tus necesidades
            });

            // Guarda el carrito actualizado en la base de datos
            await cart.save();

            return cart;
        } catch (error) {
            const errorMessage = customizeError('INVALID_CART');
            throw new Error(errorMessage);
        }
    },

    getCartInfo: async (req) => {
        try {
            // Obtener información del carrito del usuario
            const userId = req.user.email;
            const cart = await Cart.findOne({ user: userId }).populate('products');

            return cart;
        } catch (error) {
            const errorMessage = customizeError('ERROR_CART');
            throw new Error(errorMessage);
        }
    },


    removeProductFromCart: async (userEmail, productId) => {
        try {
            // Obtener el carrito del usuario
            let cart = await Cart.findOne({ user: userEmail });
            console.log(cart+'cartt')
            // Verificar si el carrito existe
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            // Encontrar el índice del producto a eliminar
            const productIndex = cart.products.findIndex(product => product._id && product._id.toString() === productId.toString());
            console.log(productIndex);
            // Verificar si se encontró el producto
            if (productIndex !== -1) {
                // Eliminar el producto específico del carrito
                cart.products.splice(productIndex, 1);

                // Recalcular el precio total del carrito
                cart.totalPrice = cart.products.reduce((total, product) => total + product.totalPrice, 0);

                // Guardar los cambios en el carrito
                await cart.save();

                return { message: 'Producto eliminado del carrito correctamente'  ,cart:cart};
            } else {
                return { message: 'Producto no encontrado en el carrito' };
            }
        } catch (error) {
            const errorMessage = customizeError('PRODUCTS_NOT_FOUND_CART');
            throw new Error(errorMessage);
        }
    },


};

module.exports = cartsController;
