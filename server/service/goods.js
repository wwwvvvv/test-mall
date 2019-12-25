let BaseService = require('./BaseService');
let goodsModel = require('./../models/goods');
let userService = require('./users');

class GoodsService extends BaseService{
  constructor(){
    super(goodsModel);
  }

  getGoods(query, cb) {
    let searchQuery = {};
    let {pageNum, pageSize, sort, priceRange} = query;
    if (priceRange && (priceRange.start !== '' || priceRange.end !== '')) {
      searchQuery.salePrice = {};
      if (priceRange.start) {
        searchQuery.salePrice["$gte"] = Number(priceRange.start);
      }
      if (priceRange.end) {
        searchQuery.salePrice["$lt"] = Number(priceRange.end);
      }
    }
    this.findSkipAndSort({pageNum, pageSize, sort, searchQuery}, function (err, doc) {
      if (err) {
       return cb(err);
      }
      cb(null, doc);
    });
  }

  addCart({userId, productId}, cb) {
    userService.findUser({userId}, (userErr, user) => {
      if (userErr) {
        return cb(userErr);
      }
      this.findOne({productId}, (productErr, product) => {
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
  }

  // getPriceFilterGoods(query, cb) {
  //   let q = {salePrice: {}};
  //   if (query.start) {
  //     q.salePrice.$gte = Number(query.start);
  //   }
  //   if (query.end) {
  //     q.salePrice.$lt = Number(query.end);
  //   }
  //   this.findMany(q, cb);
  // }

}

module.exports = new GoodsService();
