let BaseService = require('./BaseService');
let userModel = require('./../models/users');

class userService extends BaseService{
  constructor(){
    super(userModel);
  }

  login(params, cb) {
    let {userName, password} = params;
    this.findUser({userName}, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user || user.password !== password) {
        return cb('用户名或密码错误');
      }
      // req.session.user = user;
      cb(null, user);
    });
  }

  findUser(query, cb) {
    this.findOne(query, function (err, doc) {
      if (err) {
        return cb(err);
      }
      cb(null, doc);
    });
  }

  saveUser(user, cb) {
    let entity = new this.model(user);
    entity.save(cb);
  }

  // getCartList(query,cb) {
  //   this.findOne(query, function (err, doc) {
  //     if (err) {
  //       return cb(err);
  //     }
  //    let cartList = doc? doc.cartList : []
  //     cb(null, cartList);
  //   });
  // }

}

module.exports = new userService();
