// models/Post.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tags: [{ type: String }]
});

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Post', postSchema);
