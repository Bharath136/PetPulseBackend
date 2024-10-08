const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    isBooked: { type: Boolean, default: false }
}, { _id: false });

const LocationSchema = new Schema({
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true, min: -90, max: 90 },
        lng: { type: Number, required: true, min: -180, max: 180 }
    }
}, { _id: false });

const PricingSchema = new Schema({
    model: { type: String, enum: ['flat-rate', 'hourly', 'session-based'], required: true },
    amount: { type: Number, required: true, min: 0 }
}, { _id: false });

const ReviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, maxlength: 1000 },
    createdAt: { type: Date, default: Date.now }
}, { _id: false });

const ServiceProviderSchema = new Schema({
    provider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceType: { type: String, required: true },
    description: { type: String, maxlength: 500 },
    pricing: [PricingSchema],
    availableSlots: [SlotSchema],
    locations: [LocationSchema],
    reviews: [ReviewSchema],
    averageRating: { type: Number, min: 0, max: 5, default: 0 },
    metadata: { type: Map, of: Schema.Types.Mixed }
}, {
    timestamps: true
});

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
