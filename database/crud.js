const utils = require('./utils');

const createOneAutomatically = model => (data) => {
  return model.create({
    chart: data[0],
    title: data[1],
    axes: data[2],
    data: data[3]
  })
};

// const createOne = model => (req, res) => {

// };


const generateNewDataAutomatically = model => async (req, res) => {
  const { chart } = req.params;

  // generate data
  const data = utils[chart]();

  // add to db
  const doc = await createOneAutomatically(model)(data);

  // send it
  // res.send(doc);
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

  model.find({ chart }).sort({ _id: -1 }).lean().exec()
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
  getSelectedChartsData: getSelectedChartsData(model),
  getSelectedCharts: getSelectedCharts(model),
  getDisplayCharts: getDisplayCharts(model),
  updateSelectedCharts: updateSelectedCharts(model)
});