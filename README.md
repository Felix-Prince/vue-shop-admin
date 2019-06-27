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

ElementUI知识

- Layout布局组件，通过基础的 24 分栏，迅速简便地创建布局。类似于bootstrap的栅格系统（12格）
  - 通过 `flex` 布局来对分栏进行灵活的对齐。
  - 参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。



<font color="hotpink">备注： 1. 在进行Vue项目开发的时候，特别是使用了Vue-CLI，进行开发，一般都是哪个页面用到了样式，就把那个样式设置在那个文件中，如果是全局使用到的样式，就通过模块化导入进来全局使用。2. axios这种不依赖与Vue的独立库，哪里用到哪里import，只有是Vue的插件可以使用Vue.use()来安装进行依赖</font>





