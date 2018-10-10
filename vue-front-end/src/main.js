import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'fullcalendar/dist/fullcalendar.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
window.onload = function() {
  var app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
}
