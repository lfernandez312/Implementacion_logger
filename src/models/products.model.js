const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    availasbility: { type: Boolean, required: true },
    status: {
        type: Boolean,
        required: true,
      },
    discount: { type: Boolean, required: true }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('products', productSchema);

module.exports = Product;
