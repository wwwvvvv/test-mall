// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import filters from './lib/filters';
// import vuex from 'vuex';
import store from './store'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: './static/loading-svg/loading-bars.svg'
});
Vue.use(infiniteScroll);
Vue.use(filters);
// Vue.use(vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
