const mongoose = require("mongoose");
const config = require('../config');

module.exports = {
	mongoose: mongoose,
	dbURL: config.dbURL,
	models: {
		products: require("./product.js"),
		users: require("./user.js")
	}
}