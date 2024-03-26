const mongoose = require('mongoose');

// Definir el esquema del Ticket
const ticketSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
});

// Crear el modelo Ticket
const Ticket = mongoose.model('Ticket', ticketSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Ticket;
