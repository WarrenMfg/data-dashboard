const crud = require('../database/crud');
const Record = require('../database/record.model');

// receive object of methods from crud.js
module.exports = crud(Record);