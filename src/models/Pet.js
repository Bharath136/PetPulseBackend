
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const petSchema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    profilePicture: { type: String, default: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/775c1b96352685.5eac4787ab295.jpg' },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    medicalHistory: [{ condition: String, treatment: String, date: Date }],
    healthMetrics: [{ // Store health metrics for tracking
        weight: Number,
        height: Number,
        date: Date
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Pet', petSchema);
