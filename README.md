# shop-admin

github 地址： https://github.com/Felix-Prince/vue-shop-admin.git

## 项目搭建

### 创建项目

```bash
vue create shop-admin
```

## 项目运行

```bash
npm install
```

### 编译和热加载项目

```bash
npm run serve
```

### 编译和构建项目

```bash
npm run build
```

## 项目技术依赖

- ElementUI

- Vue-CLI

- Vue
- Vue-router
- axios

## 登录页功能

ElementUI 知识

- Layout 布局组件，通过基础的 24 分栏，迅速简便地创建布局。类似于 bootstrap 的栅格系统（12 格）
  - 通过 `flex` 布局来对分栏进行灵活的对齐。
  - 参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。

<font color="hotpink">备注： 1. 在进行 Vue 项目开发的时候，特别是使用了 Vue-CLI，进行开发，一般都是哪个页面用到了样式，就把那个样式设置在那个文件中，如果是全局使用到的样式，就通过模块化导入进来全局使用。2. axios 这种不依赖与 Vue 的独立库，哪里用到哪里 import，只有是 Vue 的插件可以使用 Vue.use()来安装进行依赖</font>

## 首页功能

ElementUI 知识

用于布局的容器组件，方便快速搭建页面的基本结构：

`<el-container>`：外层容器。当子元素中包含 `<el-header>` 或 `<el-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<el-header>`：顶栏容器。

`<el-aside>`：侧边栏容器。

`<el-main>`：主要区域容器。

`<el-footer>`：底栏容器。

\<el-col> 如果不加 :span="x" 这个属性，这默认就是占用剩余所有，尽管显示的 :span="24"，但实际并没有沾满 24 格

\<el-menu> 组件，我们一般都是需要用到 router 这个属性，因此这样就会需要用到 index 的值来，当点击某个菜单需要让该菜单高亮显示需要用到属性 default-active="x"，这里我们可以灵活的修改，用$route.path 来替换  :default-active="$route.path" 这样就能根据我们的路由路径来自动匹配高亮了，我们要明白 Vue 的核心是数据驱动，这时候我们不是想着怎么去修改样式，而是想着要怎么通过数据的修改来实现某些效果。

## 用户列表

ElementUI 知识

在 ElementUI 中我们使用 table 组件的时候，我们并没有如之前那样自己使用 v-for="item in list" 的方式去进行列表渲染，因为这部分功能 table 组件帮我们封装在了内部，但是我们有时候又不得不需要去获取到每一项的数据，因此这时候我们就用到了 scope slot，这其实就是作用域插槽的使用,并且 ElementUI 也帮我们提供了这部分功能。

在自定义列表模板那块有一句话说明

**通过 Scoped slot 可以获取到 row, column, \$index 和 store（table 内部的状态管理）的数据**

自 2.6.0 版后 Scoped slot 就被舍弃了，因此我们可以使用 v-slot 这个来获取上面对应的字段数据

```html
<el-table-column label="姓名" width="180" v-slot="scope">
  <template>
    {{scope.row}}{{scope.$index}}{{scope.column}}
  </template>
</el-table-column>
```

这部分就是我们根据 ElementUI 提供的变量名来获取我们需要的数据

| name   | 说明                                           |
| ------ | ---------------------------------------------- |
| —      | 自定义列的内容，参数为 { row, column, $index } |
| header | 自定义表头的内容. 参数为 { column, $index }    |

## 角色列表

使用了ElementUI中的tree组件，用到的tree组件属性及事件

| default-expand-all   | 是否默认展开所有节点                                         |
| -------------------- | ------------------------------------------------------------ |
| default-checked-keys | 默认勾选的节点的 key 的数组                                  |
| getCheckedKeys       | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点的 key 所组成的数组 |
| getHalfCheckedKeys   | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点的 key 所组成的数组 |

灵活使用\<el-row> 和\< el-col> 布局组件，可以布局出各类界面



在删除角色拥有的权限的时候，我们会去重新获取一下角色数据，但是在Vue中DOM操作是异步的，而我们想要在赋值之后让原本展开的那一行继续展开，就需要在获取数据之后，在执行ElementUI中table的方法

```js
this.getRoles(() => {
    this.$nextTick(() => {
        this.$refs.tableRoles.toggleRowExpansion(
            this.rolesData.find(v => v.id == row.id),
            true
        );
    });
});
```



在getRoles() 方法中 给rolesData 赋值的代码后面直接去让指定的行展开，那么访问到的表格其实还没有更新，你展开的内容依旧是原来的旧DOM，当数据完成更新之后，页面中的DOM也会被替换，导致原本展开的行收拢了。



## 商品列表

在添加商品的时候用到了一个ElementUI的一个组件 Cascader级联选择器 

| v-model       | 绑定的数据，一般就是通过选择器选择后的值，返回的值是一个数组 |
| :------       | ------------------------------------------------------------ |
| options       | 这个就是我们在选择器中实际选择的数据源，一般是一个数组，并且是有一定结构的数组 |
| props         | 在选择器中显示的值需要根据哪个字段来，value值表示选择数据的实际值。label表示选择是显示的值 |



另一个组件是Upload组件

```html
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
```

这组件可以通过发送请求，把我们的图片上传到某个位置，通过action，这里必须是完整的url，如果我们的请求头中有另外的传递数据，可以通过headers属性来传递，并且有on-success属性可以监听我们上传成功后的响应数据



最后用到了一个基于 Quill、适用于 Vue 的富文本编辑器  Vue-Quill-Editor

基本用法

全局注册

```js
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
 
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor, /* { default global options } */)
```

局部注册

```js
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'
 
export default {
  components: {
    quillEditor
  }
}
```

```html
<quill-editor v-model="content" ref="myQuillEditor"></quill-editor>
```

这样就可以在页面上显示一个富文本编辑器了



## 分类列表

在这里主要用到了一个ElementUI的一个插件 element-tree-grid ，这个插件可以在表格中做到展开树状结构  [Github地址](https://github.com/foolishchow/element-tree-grid#readme)

因为这个插件是基于  el-table-column 标签的，所以一些属性与这个标签是类似的

```html
<el-table-tree-column 
        file-icon="icon icon-file" 
        folder-icon="icon icon-folder" 
        prop="label" 
        label="labelname" 
        width="220">
</el-table-tree-column>

<!-- 
    file-icon指的就是叶子节点的图标
    folder-icon指的就是可展开的项的图标
    prop 指的就是当前列要显示的数据的属性名称
    label 指的就是表头 
    treeKey 节点的唯一表示
    parentKey 数据的父节点id
    childKey 当前节点的所有子节点存放的属性的名字 默认是children
    indent-size是用来设置每个层级之间的缩进距离的
    设置indent-size 需要同时制定 层级属性
    level-key: 设置为数据中标识层级的属性名即可
-->
```

主要使用的几个属性是 treeKey 、 parentKey、levelKey，因此我们的数据需要满足这样的数据结构格式才行，一层层的嵌套了数据，一个树状结构



axios 请求拦截器和响应拦截器

每次请求的时候对请求的URL进行baseURL的设置，并且每次把请求头的参数携带即token，根据不同的情况导向不同的页面以及方便数据获取

响应回来的数据，如果是无效token，重定向到登录页重新登录