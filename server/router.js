const Router = require('express').Router();
const recordController = require('./record.controller');
const selectedChartsController = require('./selectedCharts.controller');
require('../database/index.js');

// selectedCharts
Router.route('/selected/charts')
  .get(selectedChartsController.getSelectedCharts) // componentDidMount
  .post(selectedChartsController.updateSelectedCharts);


// Global
Router.route('/display/:chart')
  .get(recordController.getDisplayCharts); // dropdown

Router.route('/automatically/:chart')
  .post(recordController.generateNewDataAutomatically);

Router.route('/manually/:chart')
  .post(recordController.generateNewDataManually)
  .put(recordController.updateData);

  
// Dashboard
Router.route('/dashboard/:selectedCharts')
  .get(recordController.getSelectedChartsData);

// Pie


// Bar
// Router.route('/bar')
//   .get(recordController.getOne);

// Line
// Router.route('/line')
//   .get(recordController.getOne);

// Guage
// Router.route('/guage')
//   .get(recordController.getOne);




module.exports = Router;