const Router = require('express').Router();
const recordController = require('./record.controller');
const selectedChartsController = require('./selectedCharts.controller');
require('../database/index.js');

// Global
Router.route('/display/:chart')
  .get(recordController.getDisplayCharts);

// Dashboard
Router.route('/dashboard/:selectedCharts')
  .get(recordController.getSelectedChartsData);

// Pie
Router.route('/automatically/pie')
  .get(recordController.generateNewDataAutomatically);

// Bar
// Router.route('/bar')
//   .get(recordController.getOne);

// Line
// Router.route('/line')
//   .get(recordController.getOne);

// Guage
// Router.route('/guage')
//   .get(recordController.getOne);

// Selected Charts
Router.route('/selected/charts')
  .get(selectedChartsController.getSelectedCharts)
  .post(selectedChartsController.updateSelectedCharts);


module.exports = Router;