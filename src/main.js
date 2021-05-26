import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.prototype.$eventBus = new Vue()

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  render: h => h(App)
  //  等价于el: '#app'
}).$mount('#app')
