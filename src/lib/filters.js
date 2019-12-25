export default {
  install(Vue) {
    Vue.filter('money', (money) => {
      return '￥' + money;
    });
  }
}
