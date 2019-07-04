<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>

    <el-steps :active="stepActive" finish-status="success">
      <el-step title="第一步" description="基本信息"></el-step>
      <el-step title="第二步" description="商品图片"></el-step>
      <el-step title="第三步" description="商品内容"></el-step>
    </el-steps>

    <el-tabs tab-position="left" v-model="tagName" style="margin-top:20px" @tab-click="changeTab">
      <el-tab-pane label="基本信息" name="basic">
        <el-form label-width="100px" :model="goodsData">
          <el-form-item label="商品名称">
            <el-input v-model="goodsData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodsData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="goodsData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="goodsData.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader v-model="goodsData.catArr" :options="cateOption" :props="defaultProp"></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio v-model="goodsData.is_promote" label="1">是</el-radio>
            <el-radio v-model="goodsData.is_promote" label="0">否</el-radio>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="next(1,'pic')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="pic">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="headers"
          list-type="picture-card"
          :on-success="uploadSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <el-button type="primary" @click="next(2,'content')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="content">
        <quill-editor v-model="goodsData.goods_introduce" ref="myQuillEditor"></quill-editor>
        <el-button type="primary" @click="addGood">确定</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      headers: {
        Authorization: localStorage.getItem("token")
      },
      stepActive: 0,
      tagName: "basic",
      goodsData: {
        goods_name: "",
        catArr: [],
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        is_promote: "1"
      },
      cateOption: [],
      defaultProp: {
        value: "cat_id",
        label: "cat_name"
      }
    };
  },
  methods: {
    changeTab(tab) {
      this.stepActive = +tab.index;
    },
    async addGood() {
      try {
        this.goodsData.goods_cat = this.goodsData.catArr.join();
        let res = await this.$http({
          url: "goods",
          method: "post",
          data: this.goodsData
        });

        if (res.data.meta.status == 201) {
          this.$router.push("/goods");
        } else {
          this.$message({
            type: "error",
            message: res.data.meta.msg,
            duration: 1000
          });
        }
      } catch (error) {}
    },
    uploadSuccess(res) {
      // console.log(res);
      this.goodsData.pics.push({
        pic: res.data.tmp_path
      });
    },
    next(index, tagName) {
      this.stepActive = index;
      this.tagName = tagName;
    }
  },
  async created() {
    try {
      let res = await this.$http({
        url: "categories",
        params: {
          type: 3
        }
      });

      this.cateOption = res.data.data;
    } catch (error) {}
  }
};
</script>

<style scoped>
.el-steps {
  margin-top: 20px;
}
</style>
