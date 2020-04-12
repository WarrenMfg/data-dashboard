const faker = require('faker');

const generateTitle = () => {
  return faker.commerce.productName();
};

const generateAxesNames = () => {
  return [ faker.hacker.noun().toLowerCase(), faker.hacker.noun().toLowerCase() ];
};

const generateDatasets = (type, dataPoints) => {
  const datasets = [];
  const backgroundColors = ['rgb(57,106,177)', 'rgb(218,124,48)', 'rgb(62,150,81)', 'rgb(204,37,41)', 'rgb(83,81,84)', 'rgb(107,76,154)', 'rgb(146,36,40)', 'rgb(148,139,61)'];
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


const utils = {
  chart
};

module.exports = utils;
