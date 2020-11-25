const mongoose = require("mongoose");
const crypto = require("crypto");

const schema = mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    username: String,
    password: String,
    salt: String
}, {
    timestamps: true
});

schema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

schema.methods.verifyPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.password == hash;
};

const User = mongoose.model("User", schema);

module.exports = User;