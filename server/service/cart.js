var goodsService = require('./goods');
var userService = require('./users');

var me = {
  addCart({userId, productId}, cb) {
    userService.findUser({userId}, (userErr, user) => {
      if (userErr) {
        return cb(userErr);
      }
      goodsService.findOne({productId}, (productErr, product) => {
        if (productErr) {
          return cb(productErr);
        }
        let goodItem = '';
        for(let item of user.cartList) {
          if (item.productId === productId) {
            goodItem = item;
            item.productNum++;
            break;
          }
        }
        if (!goodItem){
          product.checked = true;
          product.productNum = 1;
          user.cartList.push(product);
        }
        user.save(cb);
        // console.log(user);
      });
    });
  },
  delCartProduct({userId, productId}, cb) {
    userService.updateOne({userId}, {$pull: {cartList: { productId}}}, cb);
  },
  getCartList(query,cb) {
    userService.findOne(query, function (err, doc) {
      if (err) {
        return cb(err);
      }
      let cartList = doc? doc.cartList : []
      cb(null, cartList);
    });
  },
  updateCartNum({userId, productId, productNum, checked}, cb) {
    userService.updateOne(
      {userId, 'cartList.productId': productId},
      {'cartList.$.productNum': productNum, 'cartList.$.checked': checked}, cb);
  },
  updateCheckAll({userId, checked}, cb) {
    userService.findOne({userId}, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb('未能获取到用户数据')
      }
      user.cartList.forEach(item => {
        item.checked = checked;
      });
      user.save(function (err2, data) {
        if (err2) {
          return cb(err2);
        }
        cb(err, data);
      });
    })
  }
};

module.exports = me;
