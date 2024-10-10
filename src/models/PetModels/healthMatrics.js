const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define healthMetrics schema
const HealthMetricsSchema = new Schema({
    weight: { type: Number, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now }
}, { _id: false });

module.exports = mongoose.model('HealthMetrics', HealthMetricsSchema);
