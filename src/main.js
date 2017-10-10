// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import store from './store';
import musicAPI from './http/musicAPI';

axios.defaults.baseURL = 'http://123.207.98.119:3000/';

Vue.use(VueAxios, axios);
Vue.use(musicAPI);

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
});
