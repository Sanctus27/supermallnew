import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// import "@/assets/css/base.less"
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper).use(VueLazyload)
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

// axios({
//   url: 'http://152.136.185.210:8000/api/w6/home/data?type=sell&page=3'
//   //另外一个接口
//   // url: 'http://152.136.185.210:7878/api/m5/home/data?type=sell&page=3'

// }).then(res => {
//   console.log(res);
// })
// axios.all([axios({ url: 'http://123.207.32.32:8000/home/multidata' }), axios({
//    url: 'http://152.136.185.210:8000/api/w6/home/data?type=sell&page=3'
//    //另外一个接口
//    // url: 'http://152.136.185.210:7878/api/m5/home/data?type=sell&page=3'
// })]).then(axios.spread((res1, res2) => {
//   console.log(res1);
//   console.log(res2);
//  }))

