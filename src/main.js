import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';//引入element
import 'element-ui/lib/theme-chalk/index.css'; //element样式
import axios from 'axios'; //引入axios
Vue.prototype.$axios = axios;   //使用axios
Vue.use(ElementUI);           //使用elementUI
Vue.config.productionTip = false 
new Vue({        //App组件绑定
  render: h => h(App),  
}).$mount('#app')

