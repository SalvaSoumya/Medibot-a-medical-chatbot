const mongoose = require('mongoose');

const HealthRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['symptom_check', 'diagnosis', 'medication', 'allergy', 'note']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  }
});

module.exports = mongoose.model('HealthRecord', HealthRecordSchema);
