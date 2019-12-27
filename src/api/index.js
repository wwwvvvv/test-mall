import ajax from './ajax';

const noParams = {};
const G = window.G || {
  serverRoot: 'http://localhost:3000/'
};

ajax.init(G.serverRoot, {});

let API = {
  ajax,
  goods: {
    getGoods(params) {
      // console.log(ajax.get('/goods', noParams));
      return ajax.get('goods', params);
    }

    // priceFilter(params) {
    //   return ajax.get('/goods/priceFilter', params);
    // }
  },
  users: {
    login(params) {
      return ajax.post('/users/login', params);
    },
    logout() {
      return ajax.post('/users/logout', noParams);
    },
    checkLogin() {
      return ajax.get('/users/checkLogin', noParams);
    }
  },
  cart: {
    addCart(params) {
      return ajax.post('cart/addCart', params);
    },
    getCartList() {
      return ajax.get('/cart/cartList', noParams);
    },
    delCartProduct(params) {
      return ajax.post('/cart/del', params)
    },
    updateCartNum(params) {
      return ajax.post('/cart/updateCartNum', params);
    },
    toggleCheckAll(params) {
      return ajax.post('/cart/updateCheckAll', params);
    }
  },
  address: {
    getAddressList() {
      return ajax.get('/address/getAddressList', noParams);
    },
    setDefault(params) {
      return ajax.post('/address/setDefault', params)
    },
    delete(params) {
      return ajax.post('/address/delete', params);
    }
  },
  order: {
    payment(params) {
      return ajax.post('/order/payment', params);
    },
    getDetail(params) {
      return ajax.get('/order/getDetail', params);
    }
  }
};

export default API;

