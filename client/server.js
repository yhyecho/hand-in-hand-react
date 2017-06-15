const express = require('express');
const path = require('path');
const webpack = require('webpack');
const app = express();

const static_path = path.join(__dirname, 'public');

app.use(express.static(static_path))
  .get('*', function(req, res) {
    res.sendFile('index.html', {
      root: static_path
    });
  })
  .listen(process.env.PORT || 8000, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Client server Listening at http://localhost:8000");
  });
