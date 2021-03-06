const express = require('express');
const app = express();
const port = require('./config').port;
const dbURL = require('./config').dbURL;
const mongoose = require('mongoose');
const User = require('./models/user');
const routes = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(dbURL);
let db = mongoose.connection;
db.on('error', function(err) {
  console.log('db connect failed', err);
});
db.once('open', function () {
  console.log('mongodb connect success');
});

routes(app);

app.listen(port, function() {
  console.log(`running on port ${port}....`);
});
