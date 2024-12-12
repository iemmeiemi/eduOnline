const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema model
const categorySchema = new Schema({
    name: String,
    des: String,
    photoURL : String,
    creator: {
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
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
