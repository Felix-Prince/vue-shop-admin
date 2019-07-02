<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <el-form
        ref="loginForm"
        :rules="loginRules"
        :model="form"
        label-position="top"
        class="login-form"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "用户名长度为5~12位", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6~16位", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "http://localhost:8888/api/private/v1/login",
            data: this.form
          }).then(({ data: { data, meta } }) => {
            if (meta.status === 200) {
              localStorage.setItem("token", data.token);
              this.$router.push("/home");
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.row-bg {
  height: 100%;
  background-color: rgb(45, 67, 76);
}
.login-form {
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
  min-width: 400px;
}
</style>
