## 1.css sticky footer经典布局
* 将footer固定到底部。文章内容不足满屏时 footer在底部，超过满屏时footer在内容末尾。

## 2.弹出窗口的初步实现
* 首先需要设置position:fixed，位置指的是相对视图的位置，背景可以全覆盖视图
* 注意使用z-index:3,因为一般设置z-index最多为3，所以为3，高的话才能覆盖原有的页面，并且形成遮罩作用
* 然后在html中设置点击事件，点击某范围才能出现弹出窗口，前期需要在data中添加一个默认false的数据，然后点击之后，该数据变为true,v-show就可以起作用显示弹出窗口了

## 3.css sticky footor布局实现
* 我认为这个布局的实现主要在于规定了detail-wrapper占据整个高度min-height:100%，并且它的兄弟节点.detail-close能够使用margin-top来实现 -40px这样的功能，向上一个兄弟节点往上突进
* 然后detail-wrapper还需要设置padding-top,padding-bottom来占据一定的空白，特别是底部空白需要给它的兄弟节点占据，所以需要留多点空白
* 其他注意点:i标签里面使用了图标文本，虽然也算图片，但是大小需要使用font-size设置，否则不起效，然后使用text-align设置水平居中失败，那就使用margin-left:50%,left:16px来实现

## 4.计算属性computed
* 可以使用绑定计算属性的方式，当计算函数里面的数据变化就会重新计算一遍，然后更新html中的值
* 也可以直接使用v-for循环计算属性，每次更新数据，都会重新返回值，然后更新星星

## 5.星星组件实现
* 首先在父组件header.vue中绑定相应的属性，传递size,score，子组件star.vue接收数据
* 对于size使用computed中的一个函数返回一个字符串，成为绑定的class属性的一个名称，等待获取到onoff等状态后传递到maxin.styl文件中获取相应像素比的图片
* 对于score使用computed中的一个函数一个数组，里面记录了五个值,on/off/half,然后再在绑定的属性v-for中逐个循环，每一个都到maxin.styl中获取相应的图片，通过styl样式获取，记得引入maxin.styl文件，使用bg-image方法

## 6.flex布局实现平均边距线
* 首先制作一个父元素，宽为80%，高度不设置，根据子元素text的字体14px而被撑开高度，注意，这里的高度同时也是子元素line的高度，三个子元素高度一致
* 由于三个子元素高度一致，所以左右盒子模型就可以设置边距，设置底部边距为1px,同时设置相对位置(相对初始位置偏移)-6px，使得盒子模型上升，形成线在文字中部的效果

## 7.添加动画
* 向需要添加动画的元素嵌套transition元素，可以加上name属性，这样的话css3的属性就从v-enter改为name-enter类似这样
* 使用transition设置动画时长，针对对象，进入方式，几个属性分别是v-enter,v-leave-to,v-enter-active,v-leave-active
* 还可以设置opacity,transform设置进入退出方式，例如translateX,还有scale缩小放大

#### 8.backdrop-filter设置的是元素后面的图像效果，filter设置的是自身的图形效果，例如backdrop-filter中的blur(10px)指的是对元素后面的图形模糊，而filter是对图形应用模糊10px
