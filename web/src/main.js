import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from 'vue-cookies'
import ViewUI from 'view-design';
import api from "@/api";
import 'view-design/dist/styles/iview.css';
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.prototype.api=api;
Vue.use(VueCookies);
Vue.use(VueQuillEditor);

Vue.use(ViewUI, {
  transfer: true,
  size: 'large',
  capture: false,
  select: {
    arrow: 'md-arrow-dropdown',
    arrowSize: 20
  }
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')

