import Vue from 'vue';
import App from './app.vue';


window.$ = require('jquery');

new Vue({
  el     : '#app',
  render : h => h(App)
});
