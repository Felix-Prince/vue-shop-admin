<template>
  <el-container class="home-container">
    <el-header>
      <shopheader></shopheader>
    </el-header>
    <el-container type="flex">
      <el-aside width="200px">
        <navmenu></navmenu>
      </el-aside>
      <el-main></el-main>
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
</style>


