// models/Follow.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const followSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    followedAt: { type: Date, default: Date.now } 
});

// Create a compound index to ensure a user cannot follow the same pet multiple times
followSchema.index({ user: 1, pet: 1 }, { unique: true });

module.exports = mongoose.model('Follow', followSchema);
