const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
    serviceDate: { type: Date, required: true },
    serviceTime: { type: String, required: true },
    bookingStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Refunded'], default: 'Pending' },
    amountPaid: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
