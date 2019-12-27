var express = require('express');
var router = express.Router();
let addressService = require('./../service/address');

var common = require('./../lib/common');

router.get('/getAddressList', common.checkLogin2, function (req, res, next) {
  let userId = req.session.user.userId;
  addressService.getAddressList(userId, function (err, data) {
    common.resJson(res, err, data);
  });
});

router.post('/setDefault', common.checkLogin2, function (req, res, next) {
  let addrId = req.body.addrId;
  let userId = req.session.user.userId;
  addressService.setDefault({userId, addrId}, function (err, data) {
    common.resJson(res, err, data);
  });
});

router.post('/delete', common.checkLogin2, function (req, res, next) {
  let userId = req.session.user.userId;
  let addressId = req.body.addressId;
  addressService.deleteAddr({userId, addressId}, function (err, data) {
    common.resJson(res, err, data);
  });
});

module.exports = router;
