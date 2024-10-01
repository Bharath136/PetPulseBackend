// models/Like.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who liked the post
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // The post that was liked
    createdAt: { type: Date, default: Date.now } // Timestamp for when the like was created
});

module.exports = mongoose.model('Like', likeSchema);
