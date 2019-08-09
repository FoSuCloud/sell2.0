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

## 6.stylus图片通用样式的使用
* 首先在maxin.styl文件中设置一个通用的样式，传递url，返回对应的图片
* 注意设置图片路径，然后在header.vue导入中设置maxin.styl文件，返回的背景图片的size

## 7.图标文本的使用
* 除了给元素添加class属性之外，还需要添加font-size样式，否则怎么出现图片大小??
* 与第一天的使用对比来学，第一天的学习应该是有所错误的，只是起到了引用图标文本的作用

## 8.一个未解决问题:当切换设备的时候，有些设备的文字被左右拉伸
* app.vue中的tab-item中的文字会被左右拉伸，但是在iphone6中可以，所以应该是像素比的问题，函待解决!
* 通过在火狐浏览器编辑自己的设备，调整像素比得知，1像素比的时候才会居中显示，不会被拉伸
* 然后我想了一下，之前设置过像素比缩放，所以应该是base.styl设置的问题，由于border-1px 的存在会导致文字被左右拉伸，因为设置了scaleY被缩放，所以暂时去掉这个class
* 然后1像素的问题也真的看不出来。。所以就先不管了，暂时去掉border-1px这个class，以后再解决一像素问题

## 9.文本隐藏
* 对于多行文本，首先使用white-space:nowrap让他不能换行
* 然后使用overflow:hidden隐藏掉那些超出范围的文本
* 最后用text-overflow:ellipsis 用省略号代替多出来的文本

## 10.图标与文本间隙问题
* 如果不使用font-size:0方法(导致省略号不出现)的话，那么可以把两个span元素放到同一行，然后去掉font-size:0

## 11.图标消失问题
* 不设置position:absolute的话，图标没法出现，但是设置之后，没办法让左边的文本右边距出现!!
* 该问题函待解决!

## 12.背景遮罩功能
* 首先把背景改为rgba格式，调整透明度，然后遮罩层的背景的z-index设为-1，因为普通样式的z-index默认为1，需要被遮罩的话就要比1小，也就是-1
* filter滤镜提供了模糊和改变元素颜色的功能，常用于调整图像的渲染，背景或者边框显示效果,其中blur参数指的是模糊程度
* 我们使用背景遮罩的话，如果需要设置模糊一般都可以使用filter美化一下
* filter学习网址:https://www.runoob.com/cssref/css3-pr-filter.html

#### 使用背景遮罩之后，header组件下面也出现了背景颜色遮罩，这是因为使用blur的后遗症，让阴影漏出来了，解决方法即是overflow:hidden