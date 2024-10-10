const mongoose = require('mongoose');

// Review Schema
const ServiceProviderReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider', // Reference to the ServiceProvider model
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating value
        max: 5  // Maximum rating value
    },
    comment: {
        type: String,
        maxlength: 1000 // Limit the comment length
    },
    createdAt: {
        type: Date,
        default: Date.now // Default to the current date and time
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Export the Review model
module.exports = mongoose.model('ServiceProviderReview', ServiceProviderReviewSchema);
