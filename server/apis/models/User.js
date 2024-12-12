const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema model
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        trim: true,
        minlength: 3,
    },
    photoURL: String,
    authMethod: {
        type: String,
        enum: ['tradi', 'gg', 'fb'],
        default: 'tradi',
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'instructor', 'submin'],
        default: 'student',
    },
    birthdate: Date,
    phone: Number,
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        default: 'others',
    },
    wishlist: {
        type: [String],
        default: [],
    },
    history: {
        type: [String],
        default: [],
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
const User = mongoose.model('User', userSchema);

module.exports = User;
