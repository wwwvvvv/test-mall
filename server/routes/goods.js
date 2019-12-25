var express = require('express');
var router = express.Router();
let common = require('./../lib/common');
let goodsService = require('./../service/goods');
let userService = require('./../service/users');
// var

router.get('/', async function (req, res, next) {
  let {page} = req.query;
  // console.log(req.query.page);
  goodsService.getGoods(JSON.parse(page), function (err, doc) {
    common.resJson(res, err, doc);
  });
});

router.get('/priceFilter', function (req, res, next) {
  let {start, end} = req.query;
  goodsService.getPriceFilterGoods({start, end}, function (err, doc) {
    common.resJson(res, err, doc);
  });
});

router.post('/addCart',common.checkLogin2, function (req, res, next) {
  //假设已经登录了
  let userId = '100000077';
  let productId = req.body.productId;
  goodsService.addCart({userId, productId}, function (err, doc) {
    common.resJson(res, err, doc);
  });
});


module.exports = router;
