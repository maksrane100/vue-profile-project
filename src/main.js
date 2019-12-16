import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store";

import Element from "element-ui";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import axios from "axios";

import qs from "qs";
import VModal from 'vue-js-modal';
 
//Vue.use(VModal)
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } })

new Vue({
  store: store,
  el: "#app",
  render: h => h(App)
});
