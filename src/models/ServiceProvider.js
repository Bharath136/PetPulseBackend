const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceProviderSchema = new mongoose.Schema({
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceType: { type: String, required: true }, // Grooming, Training, etc.
    description: { type: String },
    price: { type: Number, required: true },
    availableSlots: [
        {
            date: Date,
            time: String,
            isBooked: { type: Boolean, default: false },
        }
    ],
    location: {
        city: String,
        state: String,
        country: String,
        coordinates: { lat: Number, lng: Number },
    },
    ratings: { type: Number, default: 0 }, // Average rating from reviews
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
