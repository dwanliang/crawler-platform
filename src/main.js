import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from './request'
import api from './request/api'
import {deepCopy, isEmptyObj} from "@/assets/js/utils";

Vue.prototype.deepCopy = deepCopy;
Vue.prototype.isEmptyObj = isEmptyObj;
Vue.prototype.httpPost = request.post;
Vue.prototype.httpGet = request.get;
Vue.prototype.$api = api;
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
