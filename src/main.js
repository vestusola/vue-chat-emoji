/* eslint-disable no-new */
import Vue from "vue";
import App from "./App";
import "./components";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');