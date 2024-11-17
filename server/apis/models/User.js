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
    role: {
        type: String,
        enum: ['user', 'admin', 'instructor', 'submin'],
        default: 'user',
    },
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

});

// create a model instance
const User = mongoose.model('User', userSchema);

module.exports = User;
