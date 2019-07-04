import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import ElementUI from "element-ui";
import axios from 'axios';

// 引入elementUI的CSS样式
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/index.css"

// 把引入的ElementUI添加到Vue上
Vue.use(ElementUI)



// 设置ajax请求的基地址，后面我们可以不用每次都要输入基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"

axios.interceptors.request.use(function (config) {
  // console.log(config)
  config.headers.Authorization = localStorage.getItem('token')
  return config;
});

Vue.prototype.$http = axios



// 也可以这么全局导入element-tree-grid 组件，这样就可以全局使用了
// var ElTreeGrid = require('element-tree-grid');
// Vue.component(ElTreeGrid.name, ElTreeGrid);

/* 
  页面跳转前，通过守卫来进行拦截验证
  如果你跳转到登录页，则放行
  如果跳转到别的界面，查看token是否存在（对于前端来说只能验证token是否存在，无法验证是否合法，这需要交给后端）
*/
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    return next()
  }

  if (localStorage.getItem("token")) {
    return next()
  } else {
    router.push("/login")
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
