const mongoose = require('mongoose');
const { Schema } = mongoose;

const classInstanceSchema = new Schema({
    name: String,
    des: String,
    photoURL: String,
    pendingStudents: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
        default: null,
    }, // Student chưa được accept
    students: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
        default: null,
    },
    timeSlots: [timeSlotSchema], // Mảng chứa các khoảng thời gian học
    class: {
        type: mongoose.Schema.Types.ObjectId, //?
        ref: 'Class',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    endedAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

// create a model instance
const ClassInstance = mongoose.model('ClassInstance', classInstanceSchema);

module.exports = ClassInstance;
