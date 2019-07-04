<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="success" plain @click="$router.push('/goods-add')">添加商品</el-button>

    <el-table :data="goodList" style="width: 99%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="goods_name" label="商品名称"></el-table-column>
      <el-table-column property="goods_price" label="商品价格"></el-table-column>
      <el-table-column property="goods_weight" label="商品重量"></el-table-column>
      <el-table-column property="add_time" label="创建时间"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0
    };
  },
  methods: {
    changePage(page) {
      this.pagenum = page;
      this.getGoods();
    },
    async getGoods() {
      try {
        let res = await this.$http({
          url: `goods`,
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        });

        this.goodList = res.data.data.goods;
        this.total = res.data.data.total;
      } catch (error) {}
    }
  },
  created() {
    this.getGoods();
  }
};
</script>

<style>
.el-breadcrumb {
  margin-bottom: 10px;
}
</style>

