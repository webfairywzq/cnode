import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

Vue.config.productionTip = false

// 设置接口默认地址
axios.defaults.baseURL ="https://cnodejs.org/api/v1"

// 这样在任何一个组件中，我们就可以使用this.axios进行相关请求
Vue.prototype.axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
