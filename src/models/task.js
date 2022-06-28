const mongoose = require('mongoose');

const taskScheme = mongoose.Schema({
  text: String,
  isCheck: Boolean
});

module.exports = Task = mongoose.model('Tasks', taskScheme);