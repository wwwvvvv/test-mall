let express = require('express');
let router = express.Router();
let orderService = require('./../service/order');
let common = require('./../lib/common');

router.post('/payment', common.checkLogin2, function (req, res, next) {
  let order = req.body.order;
  let userId = req.session.user.userId;
  orderService.payment({userId, ...order}, function (err, data) {
    common.resJson(res, err, data);
  });
});

router.get('/getDetail', common.checkLogin2, function (req, res, next) {
  let orderId = req.query.orderId;
  let userId = req.session.user.userId;
  orderService.getDetail({orderId, userId}, function (err, data) {
    common.resJson(res, err, data);
  });
});

module.exports = router;
