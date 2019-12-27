<template>
  <div class="cart-ctn">
    <nav-header></nav-header>
    <nav-bread>
      <span>Cart</span>
    </nav-bread>
    <div class="container">
      <div v-if="cartList.length > 0" class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(item, index) in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn"
                       :class="{check: item.checked}" @click="toggleProductChecked(item, index)">
                      <!--v-bind:class="{'check':item.checked=='1'}" @click="editCart('checked',item)"-->
                      <!--<svg class="icon icon-ok">-->
                      <!--<use xlink:href="#icon-ok"></use>-->
                      <!--</svg>-->
                      <i style="font-size: 14px; line-height: 20px; color: #fff;" class="iconfont iconqueren"></i>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-lazy="'/static/' + item.productImage" :alt="item.productName">
                    <!--v-lazy="'/static/'+item.productImage" v-bind:alt="item.productName"-->
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name"></div>
                    {{item.productName}}
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice | currency}}</div>
                  <!--{{item.salePrice | currency('$')}}-->
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="subProductNum(item, index)">-</a>
                        <!--@click="editCart('minu',item)"-->
                        <span class="select-ipt">{{item.productNum}}</span>
                        <!--{{item.productNum}}-->
                        <a class="input-add" @click="addProductNum(item, index)">+</a>
                        <!--@click="editCart('add',item)"-->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{(item.salePrice * item.productNum) | currency}}</div>
                  <!--{{(item.productNum*item.salePrice) | currency('$') }}-->
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delCartConfrim(item.productId)">
                      <i style="font-size: 22px;" class="iconfont iconshanchu"></i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" @click="toggleCheckAll">
                  <span class="checkbox-btn item-check-btn" :class="{check: checkAllFlag}">
                    <i style="font-size: 14px; line-height: 20px; color: #fff;" class="iconfont iconqueren"></i>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{totalPrice | currency}}</span>
                <!--{{totalPrice | currency('$')}}-->
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn--dis': checkedProductCount <= 0}" @click="checkOut">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-link class="cart-null" v-else tag="div" to="/">
        <span>您还没有添加商品~</span>
        <button class="btn btn--m">去添加</button>
      </router-link>
    </div>
    <page-footer></page-footer>
    <modal v-model="modalFlag">
      <template #content>
        <p>确定从购物车里删除该商品码？</p>
      </template>
      <template #button>
        <div>
          <a href="javascript:;" class="btn btn--m" @click="delCartProduct">确定</a>
          <a href="javascript:;" class="btn btn--m btn--red" @click="hideModal">取消</a>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import NavHeader from './../components/NavHeader';
  import PageFooter from './../components/PageFooter';
  import NavBread from './../components/NavBread';
  import Modal from './../components/Modal';

  import API from './../api'

  export default {
    name: "Cart",
    components: {
      NavHeader,
      PageFooter,
      NavBread,
      Modal
    },
    data() {
      return {
        modalFlag: false,
        cartList: [],
        delProductId: ''
        // totalPrice: 0
        // checkAllFlag: false
      }
    },
    methods: {
      async getCartList() {
        let {code, data} = await API.cart.getCartList();
        if (code === 0) {
          this.cartList = data;
        }
      },
      setProductVal(product, idx) {
        this.$set(this.cartList, idx, product);
      },
      async updateProduct(product, idx) {
        let {productId, productNum, checked} = product;
        let rs = await API.cart.updateCartNum({productId, productNum, checked});
        if (rs.code === 0) {
          this.setProductVal(product, idx);
        }
      },
      subProductNum(product, idx) {
        let productNum = product.productNum - 1;
        if (productNum <= 0) {

        } else {
          product.productNum = productNum;
          this.updateProduct(product, idx);
        }
      },
      addProductNum(product, idx) {
        product.productNum += 1;
        this.updateProduct(product, idx);
      },
      toggleProductChecked(product, idx) {
        product.checked = !product.checked;
        this.updateProduct(product, idx);
        // this.setProductVal(product, idx);
      },
      async toggleCheckAll() {
        let cartList = this.cartList;
        let checkFlag = !this.checkAllFlag;
        let {code, data} = await API.cart.toggleCheckAll({checked: checkFlag});
        if (code === 0) {
          cartList.forEach(item => {
            item.checked = checkFlag;
          });
          this.cartList = cartList;
        }
      },
      reloadCartList() {
        this.cartList = this.cartList.filter(item => {
          return item.productId !== this.delProductId;
        });
      },
      async delCartProduct() {
        let rs = await API.cart.delCartProduct({productId: this.delProductId});
        if(rs.code === 0) {
          this.modalFlag = false;
          this.reloadCartList();
          // this.getCartList();
        }
        // console.log(rs);
      },
      hideModal() {
        this.modalFlag = false;
        this.productId = '';
      },
      delCartConfrim(productId) {
        this.modalFlag = true;
        this.delProductId = productId;
      },
      checkOut() {
        if (this.checkedProductCount >= 0) {
          this.$router.push({path: '/address'})
        }
      }
    },
    computed: {
      checkAllFlag() {
        return this.cartList.length === this.checkedProductCount;
      },
      checkedProductCount() {
        let count = 0;
        this.cartList.forEach(item => {
          if (item.checked) {
            count++;
          }
        });
        return count;
      },
      totalPrice() {
        let totalPrice = 0;
        this.cartList.forEach(item => {
          if (item.checked) {
            totalPrice += item.productNum * item.salePrice;
          }
        });
        return totalPrice;
      }
    },
    mounted() {
      this.getCartList();
    },
  }
</script>

<style lang="less" scoped>
  .input-sub, .input-add {
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }

  .item-quantity .select-self-area {
    background: none;
    border: 1px solid #f0f0f0;
  }

  .item-quantity .select-self-area .select-ipt {
    display: inline-block;
    padding: 0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }

  .cart-item-list .cart-tab-3 {
    padding-top: 60px;
  }

  .item-check-btn {
    .iconfont {
      display: none;
    }
  }

  .item-check-btn.check {
    .iconfont {
      display: block;
    }
  }
  .cart-null{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 60px;
    span{
      /*width: 100%;*/
      display: inline-block;
    }
    button{
      /*display: block;*/
      /*margin: 0 auto;*/
      padding-left: 30px;
      padding-right: 30px;
      margin-left: 20px;
    }
  }
</style>
