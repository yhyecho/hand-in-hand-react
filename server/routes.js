const User = require('./models/user');
const jwt = require('jsonwebtoken');
const secret = require('./config').secret;

const generateToken = function(user) {
  return jwt.sign(user, secret, {
    expiresIn: 3000
  })
}

module.exports = function(app) {
  // 更新用户类型sql
  // db.users.update({username: 'trump'}, {$set: {admin: true}})
  // 用户登录
  app.post('/auth/login', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) { return console.log(err); }
      if (!user) { return res.status(403).json({msg: '用户名不存在！'}) }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) { return res.status(403).json({msg: '密码错误！'}) }
        return res.json({
          token: generateToken({name: user.username, admin: user.admin}),
          user: {name: user.username, admin: user.admin},
          msg: '登录成功！'
        });
      });
    });
  });
  // 用户注册
  app.post('/auth/signup', function(req, res) {
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(403).json({msg: '创建用户失败！'})
      }
      return res.json({
        token: generateToken({name: user.username}),
        user: { name:user.username },
        msg: '创建用户成功!'
      })
    });
  })

}
