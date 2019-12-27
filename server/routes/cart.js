var express = require('express');
var router = express.Router();
var common = require('./../lib/common');
var cartService = require('./../service/cart');


// 查询当前用户的购物车数据
router.get('/cartList', common.checkLogin2, function (req, res, next) {
  let user = req.session.user;
  if (!user) {
    common.resJson(res, '用户未登录');
  } else {
    // common.resJson(res, null, user.cartList);
    cartService.getCartList({userId: user.userId},(err, data) => {
      common.resJson(res, err, data);
    });
  }
});

router.post('/addCart',common.checkLogin2, function (req, res, next) {
  //假设已经登录了
  let userId = req.session.user.userId;
  let productId = req.body.productId;
  cartService.addCart({userId, productId}, function (err, doc) {
    req.session.user = doc;
    common.resJson(res, err, doc);
  });
});

router.post('/del', common.checkLogin2, function (req, res, next) {
  let userId = req.session.user.userId;
  let productId = req.body.productId;
  cartService.delCartProduct({userId, productId}, function (err, data) {
    common.resJson(res, err, data, '商品删除成功！');
  });
});

router.post('/updateCartNum', common.checkLogin2, function (req, res, next) {
  let userId = req.session.user.userId;
  let {productNum, productId, checked} = req.body;
  cartService.updateCartNum({userId, productNum, productId, checked}, function (err, data) {
    common.resJson(res, err, data, '商品数量更新成功！');
  });
});

router.post('/updateCheckAll', common.checkLogin2, function (req, res, next) {
  let userId = req.session.user.userId;
  let checked = req.body.checked;
  cartService.updateCheckAll({userId, checked}, function (err, data) {
    common.resJson(res, err, data);
  })
});



module.exports = router;
