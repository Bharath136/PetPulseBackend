const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    credentials: { type: String, required: true },  // e.g., Medical degrees, certifications
    specialties: { type: [String], required: true },  // e.g., Surgery, Dermatology, etc.
    clinicAddress: { type: String, required: true },
    availability: [
        {
            day: { type: String, required: true },  // e.g., Monday, Tuesday
            startTime: { type: String, required: true },  // e.g., '09:00 AM'
            endTime: { type: String, required: true },  // e.g., '05:00 PM'
        },
    ],
    servicesOffered: { type: [String], required: true },  // e.g., Consultation, Surgery
    consultationFee: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Veterinarian', veterinarianSchema);
