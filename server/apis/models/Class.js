const mongoose = require('mongoose');
const { Schema } = mongoose;
const rateSchema = require('./children/Rate');

// schema model
const classSchema = new Schema({
    name: String,
    des: String,
    photoURL: String,
    category: {
        type: mongoose.Schema.Types.ObjectId, //?
        ref: 'Category',
        required: true,
    },
    times: Number, //the class instances
    students: Number, //the total student attend in
    rate: Number,
    rates: {
        type: [rateSchema], // Mảng tài liệu con
        default: [], // Gán giá trị mặc định là mảng rỗng
    },
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
