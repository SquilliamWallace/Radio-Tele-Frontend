import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import 'fullcalendar/dist/fullcalendar.css';
import VueStore from './store/modules/VuexStore';

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)

const store = VueStore.StoreFactory()

window.onload = function() {
  var app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
