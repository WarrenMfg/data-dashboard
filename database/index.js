const mongoose = require('mongoose');
const URI = require('./URI'); // .gitignore

mongoose.connect(process.env.URI || URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', (err) => console.log('connection error:', err));
db.once('open', () => console.log('Connected to MongoDB!'));