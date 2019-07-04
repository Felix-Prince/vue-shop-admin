<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="rightList" style="width: 99%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template v-slot="{row}">{{row.level | levelFilter}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightList: []
    };
  },
  filters: {
    levelFilter(level) {
      switch (level) {
        case "0":
          return "一级";
        case "1":
          return "二级";
        case "2":
          return "三级";
      }
    }
  },
  methods: {
    async getRightList() {
      try {
        let {
          data: { data, meta }
        } = await this.$http({
          url: `rights/list`
        });

        if (meta.status == 200) {
          this.rightList = data;
        }
      } catch (err) {}
    }
  },
  created() {
    this.getRightList();
  }
};
</script>

