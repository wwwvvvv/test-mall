<template>
  <div class="order-confirm-ctn">
    <nav-header></nav-header>
    <div class="container">
      <div class="checkout-order">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
          </ul>
        </div>

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>订单详情</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>商品</li>
                <li>单价</li>
                <li>数量</li>
                <li>总价</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList" :key="item.productId">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img v-lazy="'/static/' + item.productImage" alt="">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">×{{item.productNum}}</span>
                      </div>
                    </div>
                    <div class="item-stock item-stock-no">In Stock</div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">${{item.productNum * item.salePrice}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>商品总价:</span>
                <span>${{totalPrice | currency}}</span>
              </li>
              <li>
                <span>运费:</span>
                <span>{{shipPrice | currency}}</span>
              </li>
              <li>
                <span>折扣:</span>
                <span>-{{discount | currency}}</span>
              </li>
              <li>
                <span>税费:</span>
                <span>{{taxPrice | currency}}</span>
              </li>
              <li class="order-total-price">
                <span>订单总价:</span>
                <span>{{orderTotalPrice | currency}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <router-link to="/address" class="btn btn--m">上一步</router-link>
          </div>
          <div class="next-btn-wrap">
            <button @click="payment" class="btn btn--m btn--red">去支付</button>
          </div>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader';
  import PageFooter from '@/components/PageFooter';
  import NavBread from '@/components/NavBread';
  // import Modal from '@/components/Modal';

  import API from './../api/index';
  export default {
    name: "orderConfirm",
    data() {
      return {
        cartList: [],
        totalPrice:0,
        shipPrice: 100,
        taxPrice: 400,
        discount: 200,
        
        orderTotalPrice: 0
      }
    },
    components: {
      NavHeader,
      PageFooter
    },
    computed: {
      // totalPrice() {
      //   let price = 0;
      // }
    },
    mounted() {
      this.getCartList();
    },
    methods: {
      async getCartList() {
        let {code, data} = await API.cart.getCartList();
        if (code === 0) {
          let totalPrice = 0;
          this.cartList = data.filter(item => {
            if (item.checked) {
              totalPrice += (item.salePrice * item.productNum);
            }
            return item.checked;
          });
          if (this.cartList.length === 0) {
            this.$router.replace('/cart');
          }
          this.totalPrice = totalPrice;
          this.orderTotalPrice = totalPrice - this.discount + this.taxPrice + this.shipPrice;
        }
      },
      async payment() {
        let order = {
          addressId: this.$route.params.addressId,
          orderTotal: this.orderTotalPrice
        };
        let {code, data} = await API.order.payment({order});
        if (code === 0) {
          this.$router.replace({path: '/orderSuccess', query: {orderId: data.orderId}});
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-foot-wrap{
    .btn--m.btn{
      padding-left: 40px;
      padding-right: 40px;
    }
  }
</style>
