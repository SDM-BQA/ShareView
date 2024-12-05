const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    name: {type: Number, required: true},
});

module.exports = mongoose.model('products', productSchema);
