const mongoose = require("mongoose");

const schema = mongoose.Schema({
	code: String,
	name: String,
	type: String,
	count: Number,
	unitPrice: Number,
	totalPrice: Number
}, {
	timestamps: true
});

const Product = mongoose.model("Product", schema);

module.exports = Product;