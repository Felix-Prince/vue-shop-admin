<template>
  <el-row class="header" type="flex">
    <el-col :span="6">
      <img src="../assets/img/logo.png" alt>
    </el-col>
    <el-col :span="24">
      <h2>电商后台管理系统</h2>
    </el-col>
    <el-col :span="6">
      <div class="info">
        欢迎上海前端39期星曜会员
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import "../assets/img/logo.png";
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.header {
  height: 100%;
  background-color: rgb(179, 193, 205);
}
.header div {
  min-width: 250px;
}
h2 {
  margin: 0;
  text-align: center;
  line-height: 60px;
  color: #fff;
  font-size: 28px;
}
.info {
  line-height: 60px;
  /* margin-right: 20px; */
  font-weight: bold;
}
a {
  margin-left: 3px;
  text-decoration: none;
  color: #daa520;
  font-weight: bold;
  /* padding-right: 20px; */
}
</style>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>

