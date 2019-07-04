<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="showCateDialog">添加分类</el-button>

    <el-table :data="categoryList" style="width: 99%">
      <el-table-tree-column
        file-icon="el-icon-toilet-paper"
        folder-icon="el-icon-folder-opened"
        treeKey="cat_id"
        levelKey="cat_level"
        parentKey="cat_pid"
        prop="cat_name"
        label="分类名称"
        width="220"
        :indentSize="50"
      ></el-table-tree-column>
      <el-table-column label="是否有效">
        <template v-slot="{row}">{{row.cat_deleted ? "否":"是"}}</template>
      </el-table-column>
      <el-table-column property="cat_level" label="层级"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="pagenum"
      :page-size="pagesize"
      :total="total"
      @current-change="changePage"
    ></el-pagination>

    <!-- 添加分类模态框 -->
    <el-dialog title="添加分类" :visible.sync="isShowCateDialog">
      <el-form :model="categoryData" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="categoryData.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader v-model="categoryData.catArr" :options="cateOption" :props="defaultProp"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowCateDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const ElTreeGrid = require("element-tree-grid");
export default {
  components: {
    [ElTreeGrid.name]: ElTreeGrid
  },
  data() {
    return {
      categoryList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      isShowCateDialog: false,
      categoryData: {
        cat_name: "",
        catArr: []
      },
      cateOption: [],
      defaultProp: {
        value: "cat_id",
        label: "cat_name",
        checkStrictly: true
      }
    };
  },
  methods: {
    async addCategory() {
      try {
        let cat_level = this.categoryData.catArr.length;
        let cat_pid = this.categoryData.catArr.pop() || 0;
        let cat_name = this.categoryData.cat_name;
        let res = await this.$http({
          url: "categories",
          method: "post",
          data: {
            cat_pid,
            cat_name,
            cat_level
          }
        });

        if (res.data.meta.status == 201) {
          this.isShowCateDialog = false;
          this.getCategoryList();
        }
      } catch (error) {}
    },
    async showCateDialog() {
      this.isShowCateDialog = true;
      //   获取前两级的所有分类
      try {
        let res = await this.$http({
          url: "categories",
          params: {
            type: 2
          }
        });

        console.log(res);
        this.cateOption = res.data.data;
      } catch (error) {}
    },
    changePage(page) {
      this.pagenum = page;
      this.getCategoryList();
    },
    async getCategoryList() {
      try {
        let res = await this.$http({
          url: "categories",
          params: {
            type: 3,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        });

        this.categoryList = res.data.data.result;
        this.total = res.data.data.total;
      } catch (error) {}
    }
  },
  created() {
    this.getCategoryList();
  }
};
</script>
