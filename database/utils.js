const faker = require('faker');


const backgroundColors = ['rgb(57,106,177)', 'rgb(218,124,48)', 'rgb(62,150,81)', 'rgb(204,37,41)', 'rgb(83,81,84)', 'rgb(107,76,154)', 'rgb(146,36,40)', 'rgb(148,139,61)'];

const generateTitle = () => {
  return faker.commerce.productName();
};

const generateAxesNames = () => {
  return [ faker.hacker.noun().toLowerCase(), faker.hacker.noun().toLowerCase() ];
};

const generateDatasets = (type, dataPoints) => {
  const datasets = [];
  const numberOfDatasets = type === 'pie' ? 1 : Math.floor( Math.random() * (3 - 1 + 1) ) + 1;

  for (let i = 0; i < numberOfDatasets; i++) {
    const dataset = {
      label: generateTitle(),
      data: [],
      backgroundColor: type === 'pie' ? backgroundColors : backgroundColors[i],
      borderColor: type === 'pie' ? backgroundColors : backgroundColors[i]
    };

    for (let j = 0; j < dataPoints; j++) {
      if (type === 'bubble') {
        dataset.data.push({
          x: faker.commerce.price(),
          y: faker.commerce.price(),
          r: Math.floor( Math.random() * (10 - 2 + 1) ) + 2
        });
      } else if (type === 'scatter') {
        dataset.data.push({
          x: faker.commerce.price(),
          y: faker.commerce.price()
        })
      } else {
        dataset.data.push(faker.commerce.price());
      }
    }

    datasets.push(dataset);
  }

  return datasets;
};

const chart = (type) => {
  const chartInfo = { type }; // type, data, options


  // chartInfo.data
  const randomDataPoints = type === 'scatter' ? Math.floor( Math.random() * (50 - 20 + 1)) + 20 : Math.floor( Math.random() * (8 - 3 + 1)) + 3;
  const data = {
    datasets: [...generateDatasets(type, randomDataPoints)],
    labels: []
  };

  for (let i = 0; i < randomDataPoints; i++) {
    data.labels.push(faker.random.word().toLowerCase());
  }

  chartInfo.data = data;


  // chartInfo.options
  chartInfo.options = {
    title: {
      display: true,
      text: generateTitle()
    }
  };


  return chartInfo;
};


const makePie = (chart, userData) => {
  chart.type = 'pie';
  chart.data.datasets[0].label = generateTitle();
  chart.data.datasets[0].data = userData.data;
  chart.data.datasets[0].backgroundColor = backgroundColors;
  chart.data.datasets[0].borderColor = backgroundColors;
  chart.data.labels = userData.labels;
  chart.options.title.text = userData.title;
  return chart;
};


const makeLine = (chart, userData) => {
  chart.type = 'line';
  chart.data.datasets = []; // reset datasets
  userData.datasets.forEach((dataset, i) => {
    chart.data.datasets.push({
      label: dataset.lineName,
      data: dataset.data,
      backgroundColor: backgroundColors[i],
      borderColor: backgroundColors[i]
    });
  });
  chart.data.labels = userData.labels;
  chart.options.title.text = userData.title;

  return chart;
};


const chartManually = (type, userData) => {
  // general data shape
  let chart = {
    type: '',
    data: {
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: []
        }
      ],
      labels: []
    },
    options: {
      title: {
        display: true,
        text: ''
      }
    }
  };

  if (type === 'pie') {
    chart = makePie(chart, userData);
  } else if (type === 'line') {
    chart = makeLine(chart, userData);
  }


  return chart;
};


const utils = {
  chart,
  chartManually
};

module.exports = utils;
