// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入组件
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import Vuex from 'vuex'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import 'lib-flexible/flexible.js'//自适应
import store from './store'
import common from './utils/common'

Vue.prototype.common = common;
// axios.defaults.withCredentials = true;
import {postRequest} from "./utils/axios";
import {getRequest} from "./utils/axios";
import {putRequest} from "./utils/axios";
import {deleteRequest} from "./utils/axios";

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.prototype.$axios = axios;

// import 'element-ui/lib/theme-chalk/index.css';


// 关闭浏览器控制台关于环境相关的提示
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  router,
  store,

  // store,
  render: h => h(App)
}).$mount("#app")
