const { Schema, default: mongoose } = require("mongoose")

const Product = new Schema({
   name: { type: String, unique: true },
   price: { type: Number },
   description: { type: String },
   image: { type: String },
})

module.exports = mongoose.model("Product", Product, "products")
