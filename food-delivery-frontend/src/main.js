import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import _ from 'lodash'

Vue.config.productionTip = false

Vue.prototype._ = _

Vue.directive('blur', {
  inserted(el) {
    el.onfocus = (ev) => ev.target.blur();
  }
});

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
