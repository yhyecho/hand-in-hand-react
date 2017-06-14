const User = require('./models/user');
const jwt = require('jsonwebtoken');
const secret = require('./config').secret;

const generateToken = function(user) {
  return jwt.sign(user, secret, {
    expiresIn: 3000
  })
}

module.exports = function(app) {
  app.post('/auth/login', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) { return console.log(err); }
      if (!user) { return res.status(403).json({msg: '用户名不存在！'}) }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) { return res.status(403).json({msg: '密码错误！'}) }
        return res.json({
          token: generateToken({name: user.username}),
          user: {name: user.username}
        });
      });
    });
  });
}
