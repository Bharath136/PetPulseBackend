const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a medicalHistory schema
const medicalHistorySchema = new Schema({
    condition: { type: String, required: true },
    treatment: { type: String, required: true },
    date: { type: Date, required: true }
}, { _id: false });

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);
