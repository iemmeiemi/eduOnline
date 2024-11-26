const mongoose = require('mongoose');
import { avatarImg } from '/images/avatar.jpg';
const { Schema } = mongoose;
const rateSchema = require('./children/Rate'); 

// schema model
const classSchema = new Schema({
    name: String,
    des: String,
    category: ,
    rates: [rateSchema], // Tài liệu con
    instructor: {
        type: mongoose.Schema.Types.ObjectId, // Liên kết với ID của người dùng
        ref: 'User', // Tên model của người dùng
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Gán giá trị mặc định là thời điểm hiện tại
    },
    deletedAt: {
        type: Date,
        default: null, // Gán giá trị mặc định là null
    },
});

// create a model instance
const Class = mongoose.model('Class', classSchema);

module.exports = Class;
