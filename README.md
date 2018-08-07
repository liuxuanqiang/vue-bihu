# 使用Vue.js全家桶重构币乎

> 线上地址：https://liuxuanqiang.github.io/vue-bihu

### 安装

1.安装依赖

```npm install```

2.运行项目

```npm run dev```，浏览器访问： http://localhost:8080


3.打包代码

```npm run build```，根目录下生成dist文件夹

### 目录结构
项目结构由vue-cli生成，详细说明如下：
<pre>
...       
├── build              // webpack相关配置文件
├── config             // vue配置文件
├── src                // 项目源码目录
│   ├── assets         // css js 和图片等静态资源
│   ├── components     // vue公共组件
|   ├── pages          // 项目页面
|   ├── router         // 路由文件
|   ├── utils          // 公共工具类函数库
│   ├── vuex           // vuex状态管理文件
│   ├── App.vue        // 项目入口文件（根组件）
│   └── main.js        // 项目核心文件（入口js文件）
├── static             // 静态文件
├── test               // 测试文件
├── index.html         // 首页入口文件
├── package.json       // 项目配置文件
├── README.md          // 项目说明文档
</pre>

### 技术栈

* vue-cli
* vue-router
* vuex
* axios
* ES6
* webpack

### 致谢
项目接口来源于币乎：https://bihu.com/
