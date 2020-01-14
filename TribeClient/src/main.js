// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import {postRequest} from './utils/api'
import {getRequest} from './utils/api'
import {uploadFileRequest} from './utils/api'
import echarts from 'echarts'
import './utils/filter_utils.js'
Vue.prototype.$echarts = echarts 
Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.uploadFileRequest=uploadFileRequest;
Vue.config.productionTip = false
Vue.use(mavonEditor);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
