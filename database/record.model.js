const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  chart: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }, 
  axes: { 
    type: Array, 
    required: true
  }, 
  data: { 
    type: Array, 
    required: true
  }
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;