const mongoose = require('mongoose');
const { Schema } = mongoose;
const gpaSchema = require('./children/GPA');


// schema model
const studentSchema = new Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId, // Liên kết với ID của người dùng
        ref: 'User', // Tên model của người dùng
        required: true,
    },
    classCount: Number, //classes that that student attended in
    gpaRecord: {
        type: [gpaSchema], 
        default: [],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, //?
        ref: 'Category', 
        required: true,
    },
});

// create a model instance
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
