const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AIInteractionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    interactionType: { type: String, required: true }, // 'CustomerSupport', 'PetAdvice', etc.
    question: { type: String, required: true },
    response: { type: String, required: true },
    interactionDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AIInteraction', AIInteractionSchema);
