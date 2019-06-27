import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import ElementUI from "element-ui";

// 引入elementUI的CSS样式
import "element-ui/lib/theme-chalk/index.css";

// 把引入的ElementUI添加到Vue上
Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
