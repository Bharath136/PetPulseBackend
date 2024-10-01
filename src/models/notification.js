const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['like', 'comment', 'follow', 'mood-sync'], required: true },
    message: { type: String },
    referenceId: { type: Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now },
    readStatus: { type: Boolean, default: false }
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
