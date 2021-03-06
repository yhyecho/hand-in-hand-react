const User = require('./models/user');
const Post = require('./models/post');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const secret = require('./config').secret;

const upload = multer({dest: './public/uploads/covers'});

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
  app.post('/posts', requireAuth, upload.single('post'), function(req, res) {
    let post = new Post();
    if (req.file && req.file.filename) {
      post.cover = req.file.filename;
    }
    post.name = req.body.name;
    post.content = req.body.content;
    post.save(function(err) {
      if (err) {
        console.log(err);
        return res.status(403).json({msg: '创建文章失败！'});
      }
      res.json({
        post: post,
        msg: '文章创建成功！'
      });
    });
  })

  // 获取所有文章接口
  app.get('/posts', function(req, res) {
    Post.find({}, 'name cover', function(err, posts) {
      if (err) return res.json({msg: '获取文章列表失败！'});
      res.json({
        posts: posts,
        msg: '获取文章列表成功！'
      });
    })
  })

  // 获取单篇文章接口
  app.get('/posts/:postId', function(req, res) {
    Post.findById({_id: req.params.postId}, function(err, post) {
      if (err) {
        // HTTP 状态码422（不可处理实体）意思是说服务器不能处理客户端的请求
        return res.status(422).json({msg: "服务器繁忙！"});
      }
      res.json({ post: post });
    })
  })

  // 更新文章接口
  app.put('/posts/:postId', requireAuth, upload.single('post'), function(req, res) {
    Post.findById({_id: req.params.postId}, function(err, post) {
      if (err) {
        return res.status(422).json({msg: '服务器繁忙！'});
      }
      post.name = req.body.name;
      post.content = req.body.content;
      if (req.file && req.file.filename) {
        post.cover = req.file.filename;
      }
      post.save(function(err) {
        if (err) return res.status(422).json({msg: '更新文章失败！'});
        res.json({
          post: post,
          msg: '文章更新成功了！'
        });
      });
    });
  });

  app.delete('/posts/:postId', requireAuth, function(req, res) {
    const id = req.params.postId;
    Post.findById({_id: id}, function(err, post) {
      post.remove(function(err) {
        if (err) return res.status(422).json({msg: '服务器繁忙！'});
        res.json({
          id: id,
          msg: '文章删除成功！'
        });
      });
    });
  });

}
