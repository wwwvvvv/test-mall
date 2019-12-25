let mongoose = require('./../config/mongoose');
var Schema = mongoose.Schema;
let userSchema = new Schema({
  userId: String,
  userName: String,
  password: String,
  orderList: Array,
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
  addressList: Array
});

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;
