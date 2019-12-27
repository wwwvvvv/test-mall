<template>
  <div class="order-success-ctn">
    <nav-header></nav-header>
    <nav-bread>
      <span>Order</span>
    </nav-bread>
    <div class="container">
      <div v-if="orderTotal > 0">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img v-lazy="'/static/ok-2.png'" alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>订单编号：{{orderId}}</span>
              <span>订单总价：{{orderTotal}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link to="/cart" class="btn btn--m">Cart List</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link to="/" class="btn btn--m">Goods List</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="order-null" v-else>
        <p>没有此订单！</p>
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
    name: "OrderSuccess",
    components: {
      NavHeader,
      PageFooter,
      NavBread
    },
    data() {
      let query = this.$route.query;
      return {
        orderId: query.orderId,
        orderTotal: 0
      }
    },
    methods: {
      async getOrderDetail() {
        if (this.orderId === '') {
          return;
        }
        let {code, data} = await API.order.getDetail({orderId: this.orderId});
        if (code === 0 && data) {
          this.orderTotal = data.orderTotal;
        }
      }
    },
    mounted() {
      this.getOrderDetail();
    }
  }
</script>

<style scoped>
  .order-null{
    padding-top: 100px;
    padding-bottom: 100px;
    text-align: center;
  }
</style>
