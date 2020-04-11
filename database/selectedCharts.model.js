const mongoose = require('mongoose');

const selectedChartsSchema = new mongoose.Schema({
  selectedCharts: {
    type: Object,
    required: true
  }
});

const SelectedCharts = mongoose.model('SelectedChart', selectedChartsSchema);
module.exports = SelectedCharts;