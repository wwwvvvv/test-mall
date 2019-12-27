let mongoose = require('./../config/mongoose');
var Schema = mongoose.Schema;
let userSchema = new Schema({
  userId: String,
  userName: String,
  password: String,
  orderList: [
//     orderStatus: {
//   '0': 0, //未支付
//     '1': 1 // 已支付
// },
    {
      addressInfo: {},
      goodsList: Array,
      orderStatus: String,
      createDate: Date,
      orderId: String,
      orderTotal: Number
    }
  ],
  cartList: [
    {
      productId: String,
      productName: String,
      salePrice: Number,
      productImage: String,
      checked: {
        type: Boolean,
        default: true
      },
      productNum: Number
    }
  ],
  addressList: [{
    isDefault: {
      type: Boolean,
      default: false
    },
    addressId: String,
    userName: String,
    streetName: String,
    postCode: String,
    tel: String
  }]
});

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;
