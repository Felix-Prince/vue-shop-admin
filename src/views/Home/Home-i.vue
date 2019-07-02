<template>
  <el-container class="home-container">
    <el-header>
      <shopheader></shopheader>
    </el-header>
    <el-container type="flex">
      <el-aside width="200px">
        <navmenu></navmenu>
      </el-aside>
      <el-main>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
 <script>
import shopheader from "../components/shopHeader";
import navmenu from "../components/navMenu";
export default {
  components: {
    shopheader,
    navmenu
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
  background-color: #eaeef1;
}
.el-header {
  padding: 0;
}
/* .el-aside {
  box-sizing: unset;
} */

.el-breadcrumb {
  height: 50px;
  background-color: #d4dae0;
  line-height: 50px;
  width: 100%;
  padding-left: 10px;
}
</style>


