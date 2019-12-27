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
