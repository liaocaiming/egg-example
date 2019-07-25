import Vue from 'vue';

import App from './App.vue';

new Vue({
  render: (CreateElement) => CreateElement(App)
}).$mount("#app");