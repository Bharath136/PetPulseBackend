const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    petOwnerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    veterinarianId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ServiceProvider' },
    petId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pet' },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
    notes: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field before saving
appointmentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
