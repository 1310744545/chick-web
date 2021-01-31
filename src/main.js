// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入组件
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import Vuex from 'vuex'

import 'element-ui/lib/theme-chalk/index.css';

// 关闭浏览器控制台关于环境相关的提示
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app")
