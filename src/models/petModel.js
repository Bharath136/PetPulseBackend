const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a medicalHistory schema for better clarity
const medicalHistorySchema = new Schema({
    condition: { type: String, required: true },
    treatment: { type: String, required: true },
    date: { type: Date, required: true }
}, { _id: false });

// Define healthMetrics schema
const healthMetricsSchema = new Schema({
    weight: { type: Number, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now } 
}, { _id: false });

const petSchema = new Schema({
    name: { type: String, required: true, trim: true },
    species: { type: String, required: true, enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Other'] }, 
    breed: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0, max: 50 }, 
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    profilePicture: {
        type: String,
        default: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/775c1b96352685.5eac4787ab295.jpg',
        validate: {
            validator: function (url) {
                // Simple regex to check valid URL format
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url);
            },
            message: 'Invalid URL format for profile picture.'
        }
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    medicalHistory: [medicalHistorySchema],
    healthMetrics: [healthMetricsSchema], 
}, {
    timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
