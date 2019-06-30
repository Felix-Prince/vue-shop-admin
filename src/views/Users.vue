<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row type="flex">
      <el-col :xs="14" :sm="12" :md="12" :lg="12" :xl="12">
        <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 用户列表 -->
    <el-table :data="userList" style="width: 100%" :stripe="true">
      <el-table-column label="姓名" width="180" prop="username">
        <!-- <template v-slot="scope">{{ scope.row.name }}</template> -->
      </el-table-column>
      <el-table-column label="邮箱" width="180" prop="email">
        <!-- <template v-slot="scope">{{ scope.row.name }}</template> -->
      </el-table-column>
      <el-table-column label="电话" width="180" prop="mobile">
        <!-- <template v-slot="scope">{{ scope.row.name }}</template> -->
      </el-table-column>
      <el-table-column label="用户状态" width="180" v-slot="{row}">
        <template>
          <el-switch v-model="row.mg_state"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            plain
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next" :total="4" :page-size="2"></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchKey: "",
      userState: "",
      userList: []
    };
  },
  methods: {
    async getUsers() {
      let {
        data: { data, meta }
      } = await axios({
        url: "http://localhost:8888/api/private/v1/users",
        params: {
          pagenum: 1,
          pagesize: 5
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      if (meta.status === 200) {
        this.userList = data.users;
      }
    }
  },
  created() {
    this.getUsers();
  }
};
</script>


<style>
.el-main .el-breadcrumb {
  height: 50px;
  background-color: #d4dae0;
  line-height: 50px;
  width: 100%;
  padding-left: 10px;
}

.el-button {
  margin-left: 20px;
}
</style>
