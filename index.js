const express = require('express');
const app = express();
const port = require('./config.js').port;

app.get('/api', function(req, res) {
  res.send('Welcome to here');
});

app.listen(port, function() {
  console.log(`running on port ${port}....`);
});
