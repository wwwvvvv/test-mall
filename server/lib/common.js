var me = {
  resJson(res, err, data, msg) {
    let ret = {};
    if (err) {
      // console.log('err', err);
      if (typeof err === 'object') {
        ret.msg = err.message;
      } else {
        ret.msg = err;
      }
      ret.code = 1;
    }
    if (msg) {
      ret.msg = msg;
    }
    if (data !== undefined) {
      ret.data= data;
      ret.code = 0;
    }
    res.json(ret);
  },
  // orderStatus: {
  //   '0': 0, //未支付
  //   '1': 1 // 已支付
  // },
  checkLogin(req, res, next) {
    let hasLogin = !!req.session.user;
    if (hasLogin) {
      next();
    } else {
      let pathList = [
        '/goods',
        '/users/login',
        '/users/logout'
      ];
      if (pathList.includes(req.path)) {
        next();
      } else {
        me.resJson(res, '当前未登录');
      }
    }
  },
  checkLogin2(req, res, next) {
    let hasLogin = !!req.session.user;
    if (hasLogin) {
      next();
    } else {
      me.resJson(res, '当前未登录');
    }
  }
};

module.exports = me;
