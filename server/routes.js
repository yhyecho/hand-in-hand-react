module.exports = function(app) {
  app.post('/cat', function(req, res) {
    return res.json({
      cat: req.body.cat,
      color: req.body.color
    });
  });
}
