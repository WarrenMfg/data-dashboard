const utils = require('./utils');

const createOne = model => (data) => {
  return model.create(data);
};

// const createOne = model => (req, res) => {

// };


const generateNewDataAutomatically = model => async (req, res) => {
  const { chart } = req.params;

  // generate data
  const data = utils.chart(chart);

  // add to db
  const doc = await createOne(model)(data);

  // send it
  // res.send(doc);
  getDisplayCharts(model)(req, res);
};


const generateNewDataManually = model => async (req, res) => {
  const { chart } = req.params;

  // generate data
  const data = utils.chartManually(chart, req.body);

  // add to db
  await createOne(model)(data);

  // send it
  getDisplayCharts(model)(req, res);
};


const getSelectedChartsData = model => (req, res) => {
  const selectedCharts = JSON.parse(req.params.selectedCharts);
  const charts = Object.keys(selectedCharts);
  const selectedChartsData = [];
  charts.forEach(chart => {
    selectedCharts[chart].forEach(id => {
      const doc = model.findOne({ _id: id }).lean().exec();
        selectedChartsData.push(doc);
    });
  });

  Promise.all(selectedChartsData)
    .then(data => res.send(data))
    .catch(err => res.send(err));
};


// for componentDidMount to display persisted charts
const getSelectedCharts = model => async (req, res) => {
  const doc = await model.findOne({ selectedCharts: { $exists: true } }).lean().exec();
  if (doc) {
    res.send(doc.selectedCharts);
  } else {
    res.send({});
  }
};


const getDisplayCharts = model => (req, res) => {
  const { chart } = req.params;

  model.find({ type: chart }).sort({ _id: -1 }).lean().exec()
    .then(docs => res.send(docs))
    .catch(err => res.send(err));

};


const updateSelectedCharts = model => async (req, res) => {
  const doc = await model.findOneAndUpdate({ selectedCharts: { $exists: true } }, {selectedCharts: req.body}, { new: true });
  if (doc) {
    res.send(doc);
  } else {
    model.create({ selectedCharts: req.body })
      .then(doc => res.send(doc))
      .catch(err => res.send(err));
  }
};


// property values create closure over req/res functions
module.exports = model => ({
  generateNewDataAutomatically: generateNewDataAutomatically(model),
  generateNewDataManually: generateNewDataManually(model),
  getSelectedChartsData: getSelectedChartsData(model),
  getSelectedCharts: getSelectedCharts(model),
  getDisplayCharts: getDisplayCharts(model),
  updateSelectedCharts: updateSelectedCharts(model)
});