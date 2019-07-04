<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="6">
          <img src="../../assets/logo.png" alt />
        </el-col>
        <el-col>
          <h1>League of Legends管理系统</h1>
        </el-col>
        <el-col :span="6">
          <div class="logout">
            欢迎召唤师峡谷顶尖hero
            <a href="javascript:;" @click="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu v-for="item in userMenu" :key="item.id" :index="item.id.toString()">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="subItem.path | pathFilter"
            >
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>

          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-4-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-4-1">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="1-4-1">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-4-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>-->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      userMenu: []
    };
  },
  filters: {
    pathFilter(val) {
      return "/" + val;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    async getMenus() {
      try {
        let {
          data: { data, meta }
        } = await this.$http({
          url: `menus`
        });

        // console.log(data);
        if (meta.status == 200) {
          this.userMenu = data;
        }
      } catch (error) {}
    }
  },
  created() {
    this.getMenus();
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  background-color: #b3c1cd;
  img {
    width: 200px;
  }
  h1 {
    margin: 0;
    padding: 0;
    color: #fff;
    text-align: center;
  }
  .logout {
    text-align: right;
    min-width: 300px;
    font-weight: bold;
    padding-right: 20px;
    a {
      color: #daa520;
    }
  }
}
.el-aside {
  .el-menu {
    height: 100%;
    border: none;
  }
}

.el-main {
  box-sizing: border-box;
}
</style>


