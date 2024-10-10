const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who booked the service
    serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true }, // The service provider being booked
    bookingDate: { type: Date, required: true }, // Date of the booking
    startTime: { type: String, required: true }, // Start time of the service
    endTime: { type: String, required: true }, // End time of the service
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'canceled'],
        default: 'pending'
    }, // Booking status
    createdAt: { type: Date, default: Date.now }, // When the booking was created
    updatedAt: { type: Date, default: Date.now } // When the booking was last updated
});

module.exports = mongoose.model('Booking', BookingSchema);
