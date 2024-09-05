const mongoose = require('mongoose');

const kitchenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    rating: { type: String},
    totalRatings: { type: String },
    owner: { type: String },
    images: [{ type: String }], // Will store images as base64 strings
    meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
}, { timestamps: true });

module.exports = mongoose.model('Kitchen', kitchenSchema);
