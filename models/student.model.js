const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String},
  age: { type: Number},
  major: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

