const express = require('express');
const app = express();
const port = require('./config').port;
const dbURL = require('./config').dbURL;
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect(dbURL);
let db = mongoose.connection;
db.on('error', function(err) {
  console.log('db connect failed', err);
});
db.once('open', function () {
  console.log('mongodb connect success');
  let user = new User({
    username: 'echo',
    password: '666666'
  });
  user.save();
});

app.get('/api', function(req, res) {
  res.send('Welcome to here!');
});

app.listen(port, function() {
  console.log(`running on port ${port}....`);
});
