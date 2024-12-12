const mongoose = require('mongoose');

const gpaSchema = new mongoose.Schema({
    point: Number,
    feedback: String,
    classRef: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class',
        required: true,
    },
});

module.exports = gpaSchema;