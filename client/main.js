import Vue from 'vue';
import App from './app.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

window.$ = require('jquery');

new Vue({
  el      : '#app',
  vuetify : new Vuetify(),
  render  : h => h(App)
});
