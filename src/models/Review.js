
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReviewSchema = new mongoose.Schema({
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetType: { type: String, enum: ['PetListing', 'ServiceProvider', 'Purchase'], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);
