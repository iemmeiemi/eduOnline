const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  day: {
    type: String, // Ví dụ: 'Thứ Hai', 'Thứ Ba', ...
    required: true
  },
  startTime: {
    type: Date, // Thời gian bắt đầu
    required: true
  },
  endTime: {
    type: Date, // Thời gian kết thúc
    required: true
  }
});

module.exports = timeSlotSchema;