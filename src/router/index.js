import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList';
import Cart from '@/views/Cart';
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/orderConfirm/:addressId',
      component: OrderConfirm,
      name: 'orderConfirm'
    },
    {
      path: '/orderSuccess',
      component: OrderSuccess
    }
  ]
})
