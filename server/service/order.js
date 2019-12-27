var userService = require('./users');

var me = {
  payment({userId, addressId, orderTotal}, cb) {
    userService.findOne({userId}, function (err, user) {
      if (err) {
        return cb(err);
      }
      let goodsList = user.cartList.filter(item => {
        return item.checked;
      });
      let addressInfo = '';
      for(let item of user.addressList) {
        if (item.addressId === addressId) {
          addressInfo = item;
          break;
        }
      }
      let r1 = Math.floor(Math.random() * 10);
      let r2 = Math.floor(Math.random() * 10);
      let createTime = Date.now();
      let orderId = userId + r1 + createTime + r2;

      let orderInfo = {
        addressInfo,
        goodsList,
        orderTotal: Number(orderTotal),
        createDate: new Date(createTime),
        orderStatus: '1', //
        orderId //其实这种计算不对！
      };
      user.orderList.push(orderInfo);
      user.cartList = user.cartList.filter(item => {
        return !item.checked
      });
      user.save(function (err2, data) {
        if (err2) {
          return cb(err2);
        }
        cb(err2, orderInfo);
      });
    });
  },
  getDetail({orderId, userId}, cb) {
    userService.findOne({userId}, function (err, user) {
      if (err) {
        return cb(err);
      }
      let orderInfo = null;
      for(item of user.orderList) {
        if (item.orderId === orderId) {
          orderInfo = item;
          break;
        }
      }
      cb(null, orderInfo);
    });
  }
};

module.exports = me;
