const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    state: { type: String, require: true, default: 'In_Stock' },
    avatar: { type: String},
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Product", productSchema);