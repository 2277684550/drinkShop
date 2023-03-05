import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import index from '@/api/index'
import { Message } from 'element-ui';

Vue.config.productionTip = false

Vue.prototype.$http = index
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default Vue 