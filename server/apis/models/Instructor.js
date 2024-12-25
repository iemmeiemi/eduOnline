const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema model
const instructorSchema = new Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId, // Liên kết với ID của người dùng
        ref: 'User', // Tên model của người dùng
        required: true,
    },
    experience: Date,
    classCount:  {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, //?
        ref: 'Category', 
    },
});

// create a model instance
const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
