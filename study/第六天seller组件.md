## 1.line-height
* 给父元素一个line-height是可以撑开高度，但是会让子元素本身也多出来底部高度，具体原因不知道，但是就是会多出来高度
* 所以应该给子元素添加line-height撑开高度，这样子得到的才是真实的line-height

## 2.background-size与width,height
* 对于图标文本来说，只设置width,height也可以显示，但是如果宽高低于原图片的宽高，那么显示的只是图片的一部分
* 只有设置background-size才能显示缩小版的图片

## 3.横向滚动条
* 注意:虽然好像不给ul嵌套div也可以，但是实际上需要嵌套div
* 首先给li设置为inline-block，然后就同一水平线了，超过的部分就overflow:hidden,然后我们ul默认得到的宽度就是可视化部分的宽度，但这是错误的宽度
* 我们想要得到的宽度是实际的宽度，这样才能把被隐藏掉的图片显示出来，所以在js中计算ul实际宽度，然后更新为实际宽度，注意加 'px'
* 我们绑定div,对div进行一个横向滚动条绑定，注意参数为:scrollX:true ; eventPassthrough:'vertical' ;功能分别是设置横向滚动和禁止竖向滚动

