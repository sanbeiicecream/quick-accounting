import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue';
Vue.config.productionTip = false
Vue.component("Nav",Nav)
Vue.component("Layout",Layout)
Vue.component("Icon",Icon)
import { Notify } from 'vant';
Vue.use(Notify)
if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  Notify({type: 'primary', message: '建议使用移动端浏览'});
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
