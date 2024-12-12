const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true,
    },
    feedback: String,
    rater: {
        type: mongoose.Schema.Types.ObjectId, // Liên kết với ID của người dùng
        ref: 'User', // Tên model của người dùng
        required: true,
    },
});

module.exports = rateSchema;
