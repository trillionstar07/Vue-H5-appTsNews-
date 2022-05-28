# TsNews客户端
**TsNews** 是一个利用vue脚手架组件化开发的一个新闻资讯类H5+App客户端。
------------------------
该app基于HTML、JS、CSS编写，运行于安卓手机端。该项目主要实现了用户的登录、新闻页面的展示、内容搜索、资讯频道订阅、文章作者的关注和点赞、以及文章的评论与点赞的功能等。使用axios对后端数据进行请求，app的交互效果采用的市面上比较主流的Vant组件库，最终使用H5+技术进行安卓客户端的打包。
## 技术栈
------------------------
#### vue2 + vuex + vue-router + webpack + ES6/7 + axios
### 说明
------------------------
-[x] 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^
-[x]或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

-[x]开发环境 macOS 12.3.1 Chrome101 nodejs  v18.1
------------------------
## 项目布局
.……
```
├── node_modules                 // 安装的包
├── public                       // 静态资源托管目录
├── ├── favicon.ico  
├── ├── index.html                            
├── src                          // 源码
├── ├── api                      // 请求接口封装模块
    │   ├── index.js             // 封装请求方法
    ├── assets                   // 资源目录
    ├── components               // 组件目录
    ├── router                   // router路由模块
    │   ├── index.js             // 路由对象
    ├── store                    // Vuex容器模块
         ├── index.js            // store对象
    ├── styles                   // 样式目录
    ├── utils                    // 工具模块目录
    ├── views                    // 视图组件目录
    ├── App.vue                  // 根组件
    ├── main.js                  // 入口文件

├── .browserslistrc              // 浏览器的约定
├── .editorconfig                // 对本项目要用到编辑器的约定
├── .eslintrc.js                 // eslint
├── .gitignore                   // git的忽略设置
├── babel.config                 // babel配置文件
```
…………
