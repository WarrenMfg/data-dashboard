const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  data: { 
    type: Object, 
    required: true
  },
  options: {
    type: Object,
    required: false
  }
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;