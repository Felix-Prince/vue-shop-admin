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
            },
            roleFormData: {
                // 还有几个字段，值是根据后面获取后赋值的
                id: "",
                username: '',
                rid: 0
            },
            isShowAssignDialog: false,
            roleOption: []
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
            // console.log(meta)
            if (meta.status === 200) {
                this.userList = data.users;
                this.total = data.total;
            }
            if (meta.status == 403) {
                this.$message({
                    type: "warning",
                    message: "无获取用户列表权限",
                    duration: 1000
                })
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
            } catch (error) { }
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
            } catch (error) { }
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
            } catch (error) { }
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
            } catch (error) { }
        },
        async showAssignDialog(id) {
            try {
                let { data: { data, meta } } = await this.$http({
                    url: `users/${id}`
                })

                if (meta.status == 200) {
                    this.roleFormData = data
                    this.isShowAssignDialog = true
                }

                let roleData = await this.$http({
                    url: 'roles'
                })

                this.roleOption = roleData.data.data


            } catch (error) {

            }
        },
        async assignRole() {
            try {
                let { data: { data, meta } } = await this.$http({
                    url: `users/${this.roleFormData.id}/role`,
                    method: 'put',
                    data: {
                        rid: this.roleFormData.rid
                    }
                })

                if (meta.status == 200) {
                    // console.log(data)
                    this.isShowAssignDialog = false
                }
            } catch (error) {

            }
        }
    },
    created() {
        this.getUsers();
    }
};