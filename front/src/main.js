// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入font-awsome
import 'font-awesome/css/font-awesome.css'

// 引入elementUI 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入css格式化
import 'normalize.css'

// 引入守卫
import '@/guard'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
