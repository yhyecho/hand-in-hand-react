const User = require('./models/user');
const Post = require('./models/post');
const jwt = require('jsonwebtoken');
const secret = require('./config').secret;

const generateToken = function(user) {
  return jwt.sign(user, secret, {
    expiresIn: 3000
  })
}

// 认证授权
// curl -H "Content-Type: application/json" -H "Authorization: xxx.xxx.xxx" -X POST -d '{"name":"受保护接口","content":"protected api"}' http://localhost:4000/posts
const requireAuth = function(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({msg: '请提供认证码！'});
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({msg: 'token过期,请重新登录！'});
        } else {
          return res.status(401).json({msg: '认证失败！'});
        }
      } else {
        if (decoded.admin === true) {
          next();
        } else {
          return res.status(401).json({msg: '认证失败！'});
        }
      }
    });
  }
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
        return res.status(403).json({msg: '创建用户失败！'});
      }
      return res.json({
        token: generateToken({name: user.username}),
        user: { name:user.username },
        msg: '创建用户成功!'
      })
    });
  })

  // 创建文章
  // 接口测试
  // curl -H "Content-Type: application/json" -X POST -d '{"name":"前后端分离","content":"express+react+redux"}' http://localhost:4000/posts
  app.post('/posts', requireAuth, function(req, res) {
    let post = new Post();
    post.name = req.body.name;
    post.content = req.body.content;
    post.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(403).json({msg: '创建文章失败！'});
      }
      res.json({
        msg: '文章创建成功！'
      });
    });
  })

}
