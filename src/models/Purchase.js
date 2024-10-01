const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    petListing: { type: mongoose.Schema.Types.ObjectId, ref: 'PetListing', required: true },
    reservationStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Refunded'], default: 'Pending' },
    amountPaid: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
