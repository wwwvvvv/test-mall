var express = require('express');
var router = express.Router();
let userService = require("../service/users");
let common = require('../lib/common');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  let {userName, password} = req.body;
  userService.login({userName, password}, function (err, user) {
    if (!err) {
      req.session.user = user;
      // res.cookie('userName', user.userName, {
      //   path: '/',
      //   maxAge: 1000 * 60 * 60
      // });
      // res.cookie('userId', user.userId, {
      //   path: '/',
      //   maxAge: 1000 * 60 * 60
      // });
    }
    common.resJson(res, err, user);
  });
});

router.post('/logout', function (req, res, next) {
  // res.cookie('userId', '', {
  //   path: '/',
  //   maxAge: 0
  // });
  // res.cookie('userName', '', {
  //   path: '/',
  //   maxAge: 0
  // });
  req.session.user = null;
  common.resJson(res, null, '', '退出登录成功！');
});

router.get('/checkLogin', function (req, res, next) {
  // let userName = req.cookies.userName;
  // common.resJson(res, null, {userName})
  let user = req.session.user;
  userService.findUser({userId: user.userId}, function (err, data) {
    common.resJson(res, err, data);
  });
});

module.exports = router;
