import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)
window.onload = function() {
  var app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
}
