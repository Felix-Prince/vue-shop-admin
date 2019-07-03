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