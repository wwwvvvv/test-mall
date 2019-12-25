var mongoose = require("./../config/mongoose");

var Schema = mongoose.Schema;
var goodsSchema = new Schema({ //定义文档构成
  productId: String,
  productName: String,
  salePrice: Number,
  productImage: String,
  checked: Boolean,
  productNum: Number
});

var goodsModel = mongoose.model('goods', goodsSchema); //负责和mongo交互

module.exports = goodsModel;
