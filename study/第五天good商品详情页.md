## 1.padding-top与width
* 当我们需要定义一个宽高一致的盒子，我们可以使用width:100%,height:0,padding-top:100%
* 因为 padding设置基于父元素宽度的内边距 ，所以盒子高度被撑开为宽高一致

#### 2.	对于在export default之前声明的全局常量/变量 设置vue.prototype,否则会有警告Property or method &quot;ALL&quot; is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property

## 3.使用数据太早了，用v-if解决
* 在ratingselect.vue中的rating-type的span，需要使用v-if来决定是否生成该元素节点,如果ratings存在则生成
* 不能使用v-show，因为v-show只是添加样式display:none;而且我们在computed中定义的计算属性是可以用，但是加了length就不可以，因为父节点此时还没有传递过来是数据，但是却要计算长度，这会报错，但是返回空数据确是可以的

## 4.props属性数值修改
* 对于父组件传递过来的数据，子组件通过props属性接收，但是也仅仅是接收，使用，不可以直接修改！
* 如果要修改的话，要在触发修改事件之前，使用data中的数据接收props传递过来的数据，然后修改data中的数据，再通过$emit()传递修改后的数据
* 而父组件则需要定义接收修改后的props数据的事件，然后在事件触发函数中修改父组件中的数据，间接达到子组件修改props数据的目的
* 参考链接:https://blog.csdn.net/o_Mario_o/article/details/77035451

#### 5.如果绑定属性有多个可能的选项就使用||或来表达
* 如::class="rating.rateType===0?'icon-thumb_up':'' || rating.rateType===1?'icon-thumb_down':''"

## 6.props补充
* food.vue中的rating-wrapper此时还没有接收到父组件传递过来的selectedfood.ratings，所以需要在长度判断之前再加上selectedfood.ratings存在判断，如果不存在就不需要判断长度了

## 7.由于评论列表没有动画太尴尬，所以添加了
* 需要注意的是，动画出现的时候总会从上面掉到下面，该如何控制?

## 8.vue的filter过滤器应用于时间格式转换
* 首先创建一个date.js文件，export 一个函数JSDate,函数接收两个参数，返回正确格式的数据
* 然后在food.vue中导入该js文件，并且在html中通过 |‘过滤器名称’的方式来使用过滤器
* 在vue实例的filter中定义一个过滤器函数，在函数中使用导入的JSDate函数，返回正确格式的时间字符串