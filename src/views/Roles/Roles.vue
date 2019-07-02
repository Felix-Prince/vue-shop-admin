<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="rolesData" style="width: 100%" ref="tableRoles">
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-row type="flex" class="level" v-for="level1 in row.children" :key="level1.id">
            <el-col :span="6">
              <el-tag closable @close="delRight(row,level1.id)">{{level1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col>
              <el-row v-for="level2 in level1.children" class="level2" :key="level2.id" type="flex">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="delRight(row,level2.id)"
                  >{{level2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col>
                  <el-tag
                    closable
                    type="warning"
                    v-for="level3 in level2.children"
                    :key="level3.id"
                    class="level3"
                    @close="delRight(row,level3.id)"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            @click="showAssignRoleDialog(row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分配角色模态框 -->
    <el-dialog title="角色分配" :visible.sync="isShowAssignDialog">
      <el-tree
        ref="tree"
        :data="rightTree"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedKey"
        :props="defaultProps"
        :default-expand-all="true"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAssignDialog = false">取 消</el-button>
        <el-button type="primary" @click="AssignRight">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
li {
  list-style: none;
  margin-bottom: 10px;
}
.thirdTag {
  margin-right: 5px;
}
.level {
  border-bottom: 1px dashed #ccc;
  padding: 10px 0;
}
.level2 {
  margin-bottom: 10px;
}
.level3 {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      rolesData: [],
      isShowAssignDialog: false,
      rightTree: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      checkedKey: [],
      currentRoleId: -1
    };
  },
  methods: {
    async getRoles() {
      try {
        let {
          data: { data, meta }
        } = await this.$http({
          url: `roles`
        });
        if (meta.status == 200) {
          this.rolesData = data;
        }
      } catch (err) {}
    },
    async showAssignRoleDialog(row) {
      this.currentRoleId = row.id;
      // 获取所有的权限，树状形式
      try {
        let {
          data: { data, meta }
        } = await this.$http({
          url: `rights/tree`
        });

        if (meta.status == 200) {
          this.rightTree = data;

          let level1 = [];
          let level2 = [];
          let level3 = [];
          // 通过rolesData信息中的数据，在显示模态框的时候，把当前角色已有的权限勾选上
          row.children.forEach(l1 => {
            // level1.push(l1.id);
            l1.children.forEach(l2 => {
              //   level2.push(l2.id);
              l2.children.forEach(l3 => {
                level3.push(l3.id);
              });
            });
          });
          this.checkedKey = [...level1, ...level2, ...level3];
          this.isShowAssignDialog = true;
        }
      } catch (error) {}
    },
    async AssignRight() {
      let rids = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys()
      ].join(",");

      console.log(rids);
      let {
        data: { data, meta }
      } = await this.$http({
        url: `roles/${this.currentRoleId}/rights`,
        method: "post",
        data: {
          rids
        }
      });

      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: meta.msg,
          duration: 1000
        });
        this.isShowAssignDialog = false;
        this.getRoles();
      }
    },
    async delRight(row, id) {
      // 通过rolesData信息中的数据，在显示模态框的时候，把当前角色已有的权限勾选上
      row.children.forEach(l1 => {
        this.checkedKey.push(l1.id);
        l1.children.forEach(l2 => {
          this.checkedKey.push(l2.id);
          l2.children.forEach(l3 => {
            this.checkedKey.push(l3.id);
          });
        });
      });

      let rids = this.checkedKey.filter(v => v !== id).join(",");

      let {
        data: { data, meta }
      } = await this.$http({
        url: `roles/${row.id}/rights`,
        method: "post",
        data: {
          rids
        }
      });

      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: meta.msg,
          duration: 1000
        });

        // this.$refs.tableRoles.toggleRowExpansion(row, true);
        this.getRoles();
      }
    }
  },
  created() {
    this.getRoles();
  }
};
</script>
