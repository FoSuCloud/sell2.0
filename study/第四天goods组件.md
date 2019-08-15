## 1.better-scroll是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件
* 参考链接:https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#起步
* ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
* 而$refs 是所有注册过的ref的一个集合，相当于一个DOM元素集合
* 注意事项:html代码中使用ref给子组件(元素)注册引用信息，然后在methods中使用注册的引用信息，通过this.$refs
* 需要注意的是ref和refs中的注册名称需要一致，包括大小写
* 注意:无论在移动端还是PC端，better-scroll实现指的都是下滑移动，直接使用鼠标滚轮滚动时不行的!

## 2.$nextTick
* Vue中的nextTick涉及到Vue中DOM的异步更新,为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。
* 注意:在Vue生命周期的created()钩子函数进行的DOM操作(例如滚动事件)一定要放在Vue.nextTick()的回调函数中
* 在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中
* 参考链接:https://www.jianshu.com/p/a7550c0e164f

## 3.商品列表屏幕滚动事件
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
* 解决方案:可以使用vue.set()方法将相应属性添加到嵌套的对象上 Vue.set(对象,'属性',值)
* 参考链接:https://www.cnblogs.com/yanqiong/p/11174472.html

## 10.3D转换动画:https://www.cnblogs.com/shenzikun1314/p/6390181.html