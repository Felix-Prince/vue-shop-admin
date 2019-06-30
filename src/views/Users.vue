<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row type="flex" :gutter="20">
      <el-col :xs="14" :sm="12" :md="12" :lg="12" :xl="12">
        <el-input
          placeholder="请输入内容"
          v-model="searchKey"
          @keyup.enter.native="search"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col>
        <el-button type="success" plain @click="handleAdd">添加用户</el-button>
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
          <el-switch v-model="row.mg_state" @change="toggleState(row)"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            plain
            @click="handleEdit(row.id)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain
            @click="handleDelete(row.id)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      :current-page="pagenum"
      @current-change="changePage"
    ></el-pagination>

    <!-- 编辑用户的模态框 -->
    <el-dialog title="编辑用户" :visible.sync="isShowEditDialog">
      <el-form :model="editFormData" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名">
          <el-tag type="info">{{editFormData.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户的模态框 -->
    <el-dialog title="添加用户" :visible.sync="isShowAddDialog">
      <el-form :model="addFormData" :rules="addFormRules" ref="addForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFormData.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey: "",
      userState: "",
      userList: [],
      total: 0,
      pagenum: 1,
      pagesize: 3,
      // 编辑操作
      isShowEditDialog: false,
      editFormData: {},
      editFormRules: {
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式错误",
            trigger: "change"
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机格式错误",
            trigger: "change"
          }
        ]
      },
      // 添加操作
      isShowAddDialog: false,
      addFormData: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 5,
            max: 12,
            message: "用户名长度5~12位",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "密码长度6~16位",
            trigger: "change"
          }
        ],
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式错误",
            trigger: "change"
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机格式错误",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    search() {
      this.getUsers();
    },
    async getUsers() {
      let {
        data: { data, meta }
      } = await this.$http({
        url: "users",
        params: {
          query: this.searchKey,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      if (meta.status === 200) {
        this.userList = data.users;
        this.total = data.total;
      }
    },
    changePage(val) {
      //   console.log(val);
      this.pagenum = val;
      this.getUsers();
    },
    async handleEdit(id) {
      this.isShowEditDialog = true;
      let {
        data: { data, meta }
      } = await this.$http({
        url: `users/${id}`
      });

      if (meta.status === 200) {
        this.editFormData = data;
      }
    },
    async editUser() {
      // 提交编辑前，需要保证验证是通过的
      await this.$refs.editForm.validate();

      // 验证通过后提交，发送ajax请求修改数据
      try {
        let {
          data: { data, meta }
        } = await this.$http({
          url: `users/${this.editFormData.id}`,
          method: "put",
          data: {
            email: this.editFormData.email,
            mobile: this.editFormData.mobile
          }
        });
        let type = "";
        if (meta.status === 200) {
          type = "success";
          // 修改成功隐藏模态框，并且重新获取数据
          this.isShowEditDialog = false;
          this.getUsers();
        } else {
          type = "error";
        }
        this.$message({
          type,
          message: meta.msg,
          duration: 1000
        });
      } catch (error) {}
    },
    async toggleState(user) {
      //   console.log(user);
      try {
        let {
          data: { data, meta }
        } = await this.$http({
          url: `users/${user.id}/state/${user.mg_state}`,
          method: "put"
        });
        // console.log(meta, data);
        let type = "";
        if (meta.status === 200) {
          type = "success";
        } else {
          type = "error";
          //   如果报错了，界面上的switch按钮不修改状态
          user.mg_state = !user.mg_state;
        }

        this.$message({
          type,
          message: meta.msg,
          duration: 1000
        });
      } catch (error) {}
    },
    async handleDelete(id) {
      try {
        await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        let {
          data: { data, meta }
        } = await this.$http({
          url: `users/${id}`,
          method: "delete"
        });

        let type = "";
        if (meta.status == 200) {
          type = "success";
          //   console.log(this.pagenum, Math.ceil(this.total / this.pagesize));
          //   要等获取数据的异步操作完成了，下面的total才会有变化，因为Vue中数据的加载是异步的
          await this.getUsers();

          //   console.log(Math.ceil(this.total / this.pagesize), this.pagenum);
          if (Math.ceil(this.total / this.pagesize) < this.pagenum) {
            this.pagenum--;
            // console.log(this.pagenum);
            this.changePage(this.pagenum);
          }
        } else {
          type = "error";
        }
        this.$message({
          type,
          message: meta.msg,
          duration: 1000
        });
      } catch (error) {}
    },
    handleAdd() {
      this.isShowAddDialog = true;
    },
    async addUser() {
      try {
        let {
          data: { data, meta }
        } = await this.$http({
          url: `users`,
          method: "post",
          data: this.addFormData
        });

        console.log(data, meta);
        let type = "";
        if (meta.status == 201) {
          type = "success";
          this.getUsers();
          this.isShowAddDialog = false;
          this.$refs.addForm.resetForm();
        } else {
          type = "error";
        }

        this.$message({
          type,
          message: meta.msg,
          duration: 1000
        });
      } catch (error) {}
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
</style>
