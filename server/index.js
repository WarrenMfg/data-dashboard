const express = require('express');
const morgan = require('morgan');
const path = require('path');
const zlib = require('zlib');
const fs = require('fs');
const router = require('./router');

const PORT = process.env.PORT || 50000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));


// routes and middleware
app.use('/api', router);

app.get('/bundle.js', (req, res) => {
  const gzip = zlib.createGzip();
  const bundle = fs.createReadStream(path.resolve(__dirname, '../client/public/bundle.js'));
  res.set({ 'Content-Encoding': 'gzip' /*, 'Cache-Control': 'max-age=86400' */ });
  bundle.pipe(gzip).pipe(res);
});

app.use('/', express.static(path.resolve(__dirname, '../client/public')));


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
