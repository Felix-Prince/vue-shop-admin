import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import ElementUI from "element-ui";

// 引入elementUI的CSS样式
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/index.css"

// 把引入的ElementUI添加到Vue上
Vue.use(ElementUI)


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
