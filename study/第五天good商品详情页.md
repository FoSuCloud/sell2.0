## 1.padding-top与width
* 当我们需要定义一个宽高一致的盒子，我们可以使用width:100%,height:0,padding-top:100%
* 因为 padding设置基于父元素宽度的内边距 ，所以盒子高度被撑开为宽高一致

#### 2.	对于在export default之前声明的全局常量/变量 设置vue.prototype,否则会有警告Property or method &quot;ALL&quot; is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property

## 3.使用数据太早了，用v-if解决
* 在ratingselect.vue中的rating-type的span，需要使用v-if来决定是否生成该元素节点,如果ratings存在则生成
* 不能使用v-show，因为v-show只是添加样式display:none;而且我们在computed中定义的计算属性是可以用，但是加了length就不可以，因为父节点此时还没有传递过来是数据，但是却要计算长度，这会报错，但是返回空数据确是可以的

## 4.props属性数值`修改`
* 对于父组件传递过来的数据，子组件通过props属性接收，但是也仅仅是接收，使用，不可以直接修改！
* 如果要修改的话，要在触发修改事件之前，使用data中的数据接收props传递过来的数据，然后修改data中的数据，再通过$emit()传递修改后的数据
* 而父组件则需要定义接收修改后的props数据的事件，然后在事件触发函数中修改父组件中的数据，间接达到子组件修改props数据的目的
* 参考链接:https://blog.csdn.net/o_Mario_o/article/details/77035451
---
* `区分，给props中传递过来的对象添加属性可以使用vue.set`
* vue.set('对象名','对象字段','对象字段被修改后的值')

#### 5.如果绑定属性有多个可能的选项就使用||或来表达
* 如::class="rating.rateType===0?'icon-thumb_up':'' || rating.rateType===1?'icon-thumb_down':''"
* document.write(!! '');空字符串转换为布尔值是false,所以第一个判定为false之后就使用第二个判定来看看

## 6.props补充
* food.vue中的rating-wrapper此时还没有接收到父组件传递过来的selectedfood.ratings，所以需要在长度判断之前再加上selectedfood.ratings存在判断，如果不存在就不需要判断长度了

## 7.由于评论列表没有动画太尴尬，所以添加了
* 需要注意的是，动画出现的时候总会从上面掉到下面，该如何控制?
---
* 暂时搞不定，所以把动画去掉了

## 8.vue的filter过滤器应用于时间格式转换
* 首先创建一个date.js文件，export 一个函数JSDate,函数接收两个参数，返回正确格式的数据
* 然后在food.vue中导入该js文件，并且在html中通过 |‘过滤器名称’的方式来使用过滤器
* 在vue实例的filter中定义一个过滤器函数，在函数中使用导入的JSDate函数，返回正确格式的时间字符串

## 9.关于时间的正则表达式
* var reg=new RegExp()可以new一个正则对象，括号里面放入正则表达式，然后就可以在str.replace()中放进去，第一个参数为new RegExp,第二个参数为要替换进去的内容
* reg.test(str)方法可以检测str字符串中是否有符合reg正则的字符串，有就返回true
* substr()方法可以有两个参数，第一个是起始位置，第二个是长度，返回从某处开始切割，切割多长的字符串
* 对于需要补零的字符串，可以使用substr,length方法属性实现 如 ('00'+str).sustr(str.length),当长度为2的时候，返回str,当长度为1的时候，如果str=3,返回 03

## 10.浏览器私缀
* 浏览器私缀就是一些放在css属性前的字符串，用来确保这些属性只在特定浏览器渲染引擎下才执行
* -ms-  IE(不一定)
* -moz-  火狐等使用Mozilla浏览器渲染引擎的浏览器
* -webkit-  谷歌，Safiri等使用Webkit浏览器渲染引擎的浏览器
* -o-  早期的Opera浏览器
* 注意:在写浏览器私缀css属性的时候，没有私缀的属性要写到后面，如:
* -ms-border-radius:50%
* -moz-border-radius:50%
* -webkit-border-radius:50%
* -o-border-radius:50%
* border-radius:50%
* 浏览器私缀其实就是各个浏览器对css3特性的测试，只有部分css3属性需要添加浏览器私缀，部分最新版浏览器已经支持css3特性的就不需要添加私缀了(所以我们使用谷歌火狐浏览器才一般不添加私缀，因为我们用的都是挺新的版本)
* 如:border-radius,flex,column,box-shadow,text-shadow,@keyframes,动画属性，移动和变换属性等

## 11.animation属性 @keyframes
* transition属性可以实现动画过渡效果，但是略显生硬，而animation属性可以利用@keyframes指定时间段内的动画效果，使动画划分的更为精细
* 语法结构 : @keyframes animation-name {keyframes-selector {css-styles;}}
* 例如先在HTML元素中设置animation属性为 mymove .5s infinite ;第一个参数是animation属性的名称，第二个属性是动画执行一次的时间，第三个参数是执行次数为infinite无限制
* 由于animation这个css3特性在一些浏览器中还没有作为标准使用，所以需要添加浏览器私缀，如
* @-moz-keyframes mymove{ from {top:0px} to {top:200px} }
* 还有一种方式可以精确到百分比时间
* @keyframes mymove{ 0% {top:0px} 50%{top:80px} 100% {top:200px}}
* 注意:如果改变的是位置，那么position就应该是relative/absolue/fixeed

