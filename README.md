## 1.项目目录介绍
* dist目录是编译打包之后才生成的，也就是测试完所有代码无误，最后部署到生产环境的时候执行npm run build，然后生成的
* prod.server.js文件是部署到生产环境以后，为了生成一个服务器而新增的服务器文件，需要自定义内容，具体可见"第七天编译打包.md"
* study目录存放了项目的说明文件，除了本文件READEME.md
* package.json是项目描述文件，记录了项目所用的依赖(如果使用了-S -D 添加进该文件的话)，记录了版本
* build构建脚本目录
* config是构建配置目录
* node_modules是依赖的工具包目录
* resource是我们copy的图片资源目录
* src是源码目录
* static是静态文件目录
* test是测试目录
* .babelrc是设置转码的规则和插件，在此用于es6转换为es5,es3
* .editorconfig是EditorConfig的默认配置文件，EditorConfig就是用来协同团队开发人员之间的代码的风格及样式规范化的一个工具
* .eslintignore忽略某些文件的语法检查
* .eslintrc设置语法检查及忽略哪些语法检查
* .postcssrc.js添加浏览器私缀，执行后的文件会比源文件多出-ms- 这种浏览器私缀
* data.json 这是我们copy的模拟请求数据
* index.html入口页面


## 2.二级目录文件介绍
#### build目录
* build.js是生产环境构建脚本，在打包的时候引入包的配置信息
* check-versions.js就是检查node和npm版本的
* logo.png是默认的vue图标，初始化项目的时候执行项目会用到，其他时候都没用
* util.js文件是vue开发环境的webpack配置文件，主要用来处理css-loader和vue-style-loader
* vue-loader.conf.js是处理.vue文件的配置文件
* webpack.base.conf.js是wabpack基础配置
* webpack.dev.conf.js是wabpack开发环境配置
* webpack.prod.conf.js是wabpack生产环境配置
#### config目录
* dev.env.js合并对象?不太像，跟prod.env.js有点关系
* index.js解决路径统一的问题
* prod.env.js导出一个对象
* test.env.js跟dev.env.js有点类似，具体功能不好说
#### dist目录
* static目录下存放着打包编译好的css,js压缩文件
* index.html文件就是打包编译后的首页
#### src目录
* assets目录本来应该是存放各种静态资源(图片之类的)，但是我们把它们放到了resource目录，所以该目录在本项目没用
* common目录存放着源码需要用到的fonts字体，js函数，还有stylus样式文件
* components目录存放着项目的各个组件，这些组件组成了我们的网页
* router目录负责配置项目的路由，当我们通过router-link访问其他路由界面的时候，就是通过router-view和路由所设置的对应组件渲染相应组件的
* App.vue是根页面，页面的基础html结构就在这里
* main.js是项目的入口文件，也是在这里才知道点击 / url链接时要访问App.vue文件的
#### static目录
* css目录下的reset.css文件是从网站上下载下来的，是默认的样式文件，包含一些基础的，没有错误的样式，需要在根目录下的index.html文件中引入
* .gitkeep文件为空
#### test目录存放了项目测试的文件，具体未知

## 3.common三级目录介绍
* fonts下面的文件都是图标文本生成的，具体可见"第一天.md"
* date.js文件其实可以放在util.js文件中，这也是个优化，这个文件就是日期格式化的函数，使用export function funcname{}的方式暴露函数
* util.js文件中包含三个函数，url解析函数，存储localStorge函数，读取localStorge函数
* stylus目录下的文件都是stylus样式文件，index.styl用于导入其他styl文件，是主入口，导入他就可以了，但是使用maxin.styl文件的css方法的时候还要额外导入该文件
* 在style下导入styl文件使用 @import ; 使用文件下的方法就直接使用，如 border-none() ;
* base.styl文件则记录了一些class属性，当使用那些属性的时候可以直接使用，如 .clearfix
* 而style.styl文件则是记录了图标文本的class属性，也可以直接使用，如: .icon-close

## 4.components目录
* cartcontrol是商品页面每个商品右边的加减号按钮组件1
* food是点击商品之后的页面组件
* goods是首页组件，也是访问 /goods时出现的页面组件
* header是固定在页面头部的组件
* ratings是点击评价后出现在中部的评价组件
* ratingselect是评价内容组件
* seller是点击商家后出现在中部的商家组件
* shopcart购物车组件，固定在页面底部
* split是分割框组件
* star是星星组件
* 优化:不需要给每个组件都添加一个文件夹，直接放入components文件夹就可以了；把star,cartcontrol,ratingselect等小组件再组成一个subcomponents文件夹，因为这些组件都是被其他组件所引用的小组件

## 5.库介绍
* webpack是前端资源模块化管理和打包的工具，可以将很多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源，还可以将按需加载的模块进行代码分割，等到实际需要的时候再进行异步加载
* 而vue-cli是脚手架工具，需要注意的是vue-cli包含webpack,vue-cli的作用就使用配置好的模板快速搭建一个项目工程，省去自己搭建项目的时间，具体可见"第一天.md"
