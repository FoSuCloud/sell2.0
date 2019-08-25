## 1.better-scroll是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件
* 参考链接:https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#起步
* ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
* 而$refs 是所有注册过的ref的一个集合，相当于一个DOM元素集合
* 注意事项:html代码中使用ref给子组件(元素)注册引用信息，然后在methods中使用注册的引用信息，通过this.$refs
* 需要注意的是ref和refs中的注册名称需要一致，包括大小写
* 注意:无论在移动端还是PC端，better-scroll实现指的都是下滑移动，直接使用鼠标滚轮滚动时不行的!

## 2.$nextTick
* vue.js的特性的确是响应式，但是响应式不代表修改数据之后实时更新DOM，而是按照一定的策略进行DOM的更新，我们不去深究DOM的更新策略
* 如果我们需要操作DOM元素，而且这个元素经常被更新，我们需要使用更新后的元素，那么我们就需要设置异步更新后再使用该元素，否则我们获取到的是未更新的DOM
* 参考链接:https://www.jianshu.com/p/a7550c0e164f
* 涉及到[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html#search-query-sidebar)

## 3.商品列表屏幕滚动事件(左右联动加载)
* 首先在created周期函数中通过$nextTick方法初始化两个函数:_initScroll, _calculateHeight,然后在methods中编写这两个函数
* _initScroll 函数负责监听左侧菜单栏滚动事件 _calculateHeight监听右侧菜单栏滚动事件
* better-scroll当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
* _calculateHeight函数用来计算每个类型菜单各自元素占据的高度，然后把各个菜单所在的初始高度作为数组值添加到数组中，在computed中有一个currentIndex函数，该函数返回i，也就是当前所在的菜单类型
* 然后在商品滚动到相应的菜单列表的时候，左侧的白色部分转移，这个依靠css控制.current属性实现
* currentIndex会返回一个i，这个值是菜单的类型，然后在html中的class属性中判断i是否相对应，不对应就返回空，就是不设为current
* 此时，滚动/点击菜单列表，右侧商品不会发生滚动，所以还需要完成左侧的滚动监听事件

#### 4.切换wifi或者不连接wifi需要把webpack.ev.conf.js中的port的ip去掉或修改，否则报错

## 5.点击事件出现两遍
* 在移动端点击没有事，但是在PC网页端点击会打印两次结果，这是因为还触发了原生点击事件(虽然我的vue版本没有这个问题，但是先记下来，可能有用)
* 解决方法:在Html中传递$event，也就是这个事件，然后if判断该事件的_constructed
* 由于断网了。。所以这个知识点以后记得再看

### 6.通过this.foodsScroll.scrollToElement(el, 300)使得页面移动到相关元素为初始位置的地方，300指的是时间

### 7.点击goods商品加号的时候，点击事件没有被触发，因为没有在父组件对应面板上添加click:true

## 8.模板字符串
* shopcart组件中设置右侧结算按钮可以使用 `￥${this.minPrice}元起送` 这种反引号来连接字符串和数据，不用一直使用加号
* 模板字符串是ES6新增的特性，主要是反引号的作用，在反引号中调用数据或者函数都要套上${}

## 9.对象新增属性不能更新
* 当vue的数据里面已经声明或者赋值的对象或者数组(数组里面是对象)时，向对象中添加新的属性，更新属性的值，是不会更新视图的
* 根据官方文档定义:如果在创建实例之后添加属性到实例中，他不会触发视图的更新
* 受到js的限制，vue不能检测到对象属性的添加和删除。由于vue会在初始化实例时对属性执行getter,setter转换过程，所以属性必须在data对象上存在才能让vue转换它
* 解决方案:可以使用vue.set()方法将相应属性添加到嵌套的对象上 Vue.set(对象,'属性',值)；看food.vue
* 参考链接:https://www.cnblogs.com/yanqiong/p/11174472.html

## 10.3D转换动画:https://www.cnblogs.com/shenzikun1314/p/6390181.html
## 11.定义js的钩子函数
* 首先在html元素中定义事件如 @before-enter="beforeEnter"，设置进入之前，进入，进入之后要触发的钩子函数
* 然后在钩子函数中可以设置第一个参数为所绑定的元素，然后就可以进行DOM操作啦
* 另外注意:对于数组，如果要绑定动画，不要使用transition,要使用transition-group,然后transition-group不能绑定index作为key,所以我们可以手动给数据添加id作为唯一标识
---
* 对于transition和transition-group可以通过name来命名使用css3动画，如果在元素的不同生命周期使用不同的函数(计算或者设置功能)的话就可以对于transition/transition-group使用绑定事件@enter="",@before-enter=""这种方式
* 例子在shopcart.vue

## 12.计算属性内不应该对属性值做变更，解决这个问题的做法之一是使用watch监听
* 使用watch监听fold值，当该值为true的时候，初始化滚动事件，如果初始化过了，那么使用refresh刷新
* 注意要使用ref绑定上拉购物车菜单，然后使用ths.$refs来操作DOM事件，从而给该元素绑定滚动事件
* 一般情况下都是使用computed计算属性，但是使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

#### 13.在html中使用@click.stop阻止冒泡
#### 14.注意:template中的根元素只能是一个，所以shopcart.vue中的shopcart和list-mask还要嵌套一个div

## 15.背景遮罩不需要计算背景高度，只需要设置z-index
* 最高层级5的应该是商店详情页面 header.vue中的detail
* 4:shopcart.vue中的shopcart，ball(小球动画)
* 3:shopcart.vue中的list-mask(级别不能太小，太小会遮不住其他的)
* 2:goods.vue中的左侧选中菜单栏

## 16.点击商品加号
* 首先goods.vue中引入了子组件cartcontrol，该组件的加号被点击之后，触发addCart函数，触发父组件goods.vue的cart_add事件，该事件触发cartAdd函数,通过该函数把el也就是被点击的商品元素传递过去
* 该函数触发绑定的DOM元素shopcart(子组件)的方法drop,需要提前使用ref绑定该子组件
* shopcart.vue的drop方法给传递过来的元素绑定了el，修改了show=true,注意该数组预设长度为5，因为屏幕高度也就最多容纳5个商品
* ball.show=true,所以我们之前的css可以使用了，就按照预定好的动画开启小球落点动画，小球的起点和终点是由之前设定的js钩子函数决定的
* 首先需要知道商品位置，通过getBoundingClientRect获取某个商品相对于视窗的位置集合，right,left,top,bottom
* 最后我们点击购物车，触发toggleList函数，fold数据变化了，然后computed计算属性中有该数据，然后相应的就产生了变化，因为符合条件，所以购物车下拉屏幕出现了
---
* 待完善:translate3d


#### 17.此外，由于我们把ball.show改为true了，所以会出现小球动画
#### 18.贝塞尔曲线小球动画网址:http://web.chacuo.net/css3beziertool

