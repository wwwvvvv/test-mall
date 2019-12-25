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
    },
    addCart(params) {
      return ajax.post('goods/addCart', params);
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
  }
};

export default API;

