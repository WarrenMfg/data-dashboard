const faker = require('faker');

const generateTitle = () => {
  return faker.commerce.productName();
};

const generateAxesNames = () => {
  return [ faker.hacker.noun().toLowerCase(), faker.hacker.noun().toLowerCase() ];
};

const pie = () => {
  const chartInfo = ['pie'];

  // generate data
  const title = generateTitle();
  chartInfo.push(title);
  const axes = generateAxesNames();
  chartInfo.push(axes);

  const randomDataPoints = Math.floor( Math.random() * (10 - 5 + 1) + 5);

  const data = [];
  for (let i = 0; i < randomDataPoints; i++) {
    data.push({
      [axes[0]]: faker.random.word().toLowerCase(),
      [axes[1]]: faker.commerce.price()
    });
  }

  chartInfo.push(data);

  return chartInfo;
};


const utils = {
  pie,
  // bar,
  // line,
  // guage
};

module.exports = utils;
