const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
