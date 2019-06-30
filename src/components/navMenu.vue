<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    :router="true"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/users">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/roles">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>角色列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/rights">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>权限列表</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/goods">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>商品列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/params">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>分类参数</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/categories">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>商品分类</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item index="/orders">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>订单列表</span>
        </template>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item index="/reports">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>数据报表</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;
  /* width: 100%; */
}
</style>
