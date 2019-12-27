let userService = require('./users');

let me = {
  getAddressList(userId, cb) {
    userService.findOne({userId}, function (err, user) {
      if (err) {
        return cb(err);
      }
      cb(null, user.addressList);
    });
  },
  setDefault({userId, addrId}, cb) {
    userService.findOne({userId}, function (err, user) {
      if (err) {
        return cb(err);
      }
      user.addressList.forEach(item => {
        item.isDefault = item.addressId === addrId;
      });
      user.save(function (err2, data) {
        if (err2) {
          return cb(err2);
        }
        cb(null, data);
      });
    });
  },
  deleteAddr({userId, addressId}, cb) {
    userService.updateOne({userId}, {$pull: {addressList: {addressId}}}, cb);
  }
};

module.exports = me;
