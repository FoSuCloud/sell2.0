## 1.axios使用
* 首先安装vue-axios , axios 
* 在路由文件夹的index.js文件中导入axios,vue-axios,并且使用Vue.use({axios,VueAxios}),此外还需要设置Vue.prototype.axios = axios;
* 由于vue-resource已经不再更新，所以我们使用vue推荐的axios作为请求的插件
* build目录下的webpack.dev.conf.js文件是vue项目内置服务器的设置，请求出错了就去这里想想原因

## 2.父组件向子组件传值
* 父组件app.vue通过get请求获得seller的值之后，通过绑定在v-header子组件上的属性:seller给子组件传值seller
* 子组件通过props属性接收父组件传递过来的值，然后在子组件Html元素上就可以通过绑定属性的方式使用props上面的值了,v-if就不需要绑定，直接使用

## 3.v-if存在意义
* 由于header.vue中的support并不一定存在值，所以需要v-if事先判定是否需要该选项，相当于非必选，不然不存在support的话就会导致错误

## 4.图片与文字间隙
* header.vue中content-wrapper的子元素avatar与右边的文字会存在空隙，这是默认的
* 要去掉间隙需要给content-wrapper的font-size设置为0，但是这样子，子元素的字体会默认继承父元素的字体大小，那么子元素就看不到字了，所以我们需要给子元素设置字体大小

## 5.设置基本默认样式
* 在base.styl文件中设置body,html的默认样式，例如font-weight,font-family

## 6.图标文本的使用
* 首先在maxin.styl文件中设置一个通用的样式，传递url，返回对应的图片
* 注意设置图片路径，然后在header.vue导入中设置maxin.styl文件，返回的背景图片的size
* 与第一天的使用对比来学，第一天的学习应该是有所错误的，只是起到了引用图标文本的作用