const crud = require('../database/crud');
const SelectedCharts = require('../database/selectedCharts.model');

// receive object of methods from crud.js
module.exports = crud(SelectedCharts);