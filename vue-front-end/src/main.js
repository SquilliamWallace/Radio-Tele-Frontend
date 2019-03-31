import "core-js";
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import 'fullcalendar/dist/fullcalendar.css';
import VueSweetAlert2 from 'vue-sweetalert2';
import VueStore from './store/modules/VuexStore';
import TitleMixin from './mixins/TitleMixin';

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueSweetAlert2)
Vue.mixin(TitleMixin)

const store = VueStore;

window.onload = function() {
  var app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
