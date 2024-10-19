const mongoose = require('mongoose');

const ServiceProviderReview = require('./ServiceProviderReview');

const ServiceProviderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceType: { type: String, enum: ['groomer', 'trainer', 'pet_sitter'], required: true },
    qualifications: { type: String },  // Any certifications or training
    servicesProvided: { type: [String], required: true },  // e.g., Bathing, Obedience training, Boarding
    experience: { type: Number, required: true },  // Years of experience
    serviceArea: { type: String, required: true },  // City or region served
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true, min: -90, max: 90 },
        lng: { type: Number, required: true, min: -180, max: 180 }
    },
    availability: [
        {
            day: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
        },
    ],
    // reviews: [ServiceProviderReview.schema],
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
