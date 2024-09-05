const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    kitchen: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen' },
    images: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);
