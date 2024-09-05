const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // Will store image as base64 string
    phone: { type: String },
    age: { type: String },
    gender: { type: String },
    address: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
