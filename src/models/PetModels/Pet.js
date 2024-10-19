const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Import the medical history and health metrics schemas
const HealthMetrics = require('./HealthMatrics');
const MedicalHistory = require('./MedicalHistory');


// Define pet schema
const petSchema = new Schema({
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    species: { type: String, required: true, enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Other'] },
    breed: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0, max: 50 },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    profile: {
        type: String,
        default: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/775c1b96352685.5eac4787ab295.jpg',
    },
    height: { type: String, required: true, trim: true },
    weight: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    medicalHistory: [MedicalHistory.schema],  // Reference to medical history schema
    healthMetrics: [HealthMetrics.schema],    // Reference to health metrics schema
}, {
    timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
