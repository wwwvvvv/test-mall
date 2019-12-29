import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserName(state, newVal) {
      console.log('newVal', newVal);
      state.nickName = newVal;
    },
    updateCartCount(state, count) {
      console.log('newVal', count);
      state.cartCount = count;
    }
  }
});

export default store;


