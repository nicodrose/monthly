const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  description: {type: String, required: true},
  date: {type: Date, required: true},
  time: {type: String, required: true},
  duration: {type: Number},
  complete: {type: Boolean},
  category: {type: String, enum:['Exercise', 'Study', 'Jobs', 'Read']}
}, {
  timestamps: true,
});

module.exports = mongoose.model('ToDo', toDoSchema);