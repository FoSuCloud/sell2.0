<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<!-- 判断此时应该哪个菜单变白色 -->
				<li v-for="(item,i) in goods" :key="i" class="menu-item"
				 :class="currentIndex===i?'current':''" @click="selectMenu(i,$event)">
					<span class="text">
					<span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="(item,j) in goods" class="food-list" :key="j" ref="foodList">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li class="food-item" v-for="(food,i) in item.foods" :key="i">
							<!-- 图片 -->
							<div class="icon">
								<img :src="food.icon" width="57px" height="57px">
							</div>
							<!-- 内容 -->
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc" v-show="food.description">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<!-- 当子组件触发 cart_add事件就执行cartAdd函数-->
									<cartcontrol :food="food"  @cart_add="cartAdd"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from '../shopcart/shopcart';
	import cartcontrol from '../cartcontrol/cartcontrol';
	const ERR_OK=0;
	export default {
		props:['seller'],
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY:0
			}
		},
		created(){
			// 初始化数组
			this.classMap=['decrease', 'discount', 'special', 'invoice', 'guarantee']
			this.axios.get('/api/goods').then((res) => {
				if(res.data.errno===ERR_OK){
					this.goods=res.data.data;
					// console.log(this.goods)
					// Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			})
		},
		methods:{
			_initScroll(){
				// 使用$refs监听绑定的DOM元素，当发生滚动事件之后就改变相应的位置，实现滚动
				// 因为menu菜单已经被betterscroll监听了，所以想要进行点击事件需要先设置click:true
				this.menuScroll=new BScroll(this.$refs.menuWrapper, {
					click:true
				});
				// better-scroll当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
				this.foodsScroll=new BScroll(this.$refs.foodsWrapper, {
					probeType:3,
					click:true
				});
				// 获取各个类型的总高度
				this.foodList=this.$refs.foodList;
				// console.log(this.foodList)
				// 监听滚动事件，获取高度
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY=Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight(){
				let height=0;
				this.listHeight.push(height)
				for(let i=0; i<this.foodList.length; i++){
					let item=this.foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height)
				}
				// console.log(this.listHeight)
			},
			selectMenu(index, event){
				if(!event._constructed){
					return;
				}
				let el=this.foodList[index]
				// 300指的是移动300毫秒
				this.foodsScroll.scrollToElement(el, 300)
			},
			cartAdd(el){
				// 如果要操作DOM元素就使用$nextTick
				this.$nextTick(function(){
					// 使用shopcart组件的drop方法
					this.$refs.shopcart.drop(el);
				})
			}
		},
		computed:{
			currentIndex(){
				for(let i=0; i<this.listHeight.length; i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					// console.log(height1, height2)
					if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods=[];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						// 点击加号之后就会添加该属性啦,所以完成加号组件再完成这里，最后去完成购物车的数据绑定
						if(food.count){
							foods.push(food)
						}
					})
				})
				return foods;
			}
		},
		components:{
			shopcart:shopcart,
			cartcontrol:cartcontrol
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/maxin'
	.goods
		display:flex
		position:absolute
		// top:174px		bottom:48px		width:100%这种方式设置相对垂直距离
		top:174px
		bottom:48px
		width:100%
		overflow:hidden
		.menu-wrapper
			// 表示不扩大缩小，一直是80px
			flex:0 0 80px
			background:#f3f5f7
			.menu-item
				display:table
				text-align:left
				height:54px
				line-height:14px
				padding:0 12px
				width:56px
				&.current
					position:relative
					z-index:3
					// 盖住上一条线，不盖住自己的线
					margin-top:-1px
					background:#fff
					font-weight:700
					.text
						border-none()
				.text
					font-weight:200
					font-size:12px
					// 设置垂直居中对齐
					vertical-align:middle
					display:table-cell
					border-1px(rgba(7,17,27,.1))
				.icon
					display:inline-block
					vertical-align:top
					width:12px
					height:12px
					margin-right:2px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
		.foods-wrapper
			flex:1
			.title
				padding-left:14px
				height:26px
				line-height:26px
				border-left:2px solid #d9dde1
				font-size:12px
				color:rgb(147,153,159)
				background:#f3f5f7
			.food-item
				display:flex
				margin:18px
				border-1px(rgba(7,17,27,.1))
				padding-bottom:18px
				&:last-child
					border-none()
					padding-bottom:0
				.icon
				// 固定为57px
					flex:0 0 57px
					margin-right:10px
				.content
					flex:1
					.name
						margin:2px 0 8px 0
						height:14px
						line-height:14px
						font-size:14px
						color:rgb(7,17,27)
					.desc,.extra
						line-height:10px
						font-size:10px
						color:rgb(147,153,159)
					.desc
						margin-bottom:8px
						line-height:12px
					.extra
						.count
							margin-right:12px
					.price
						font-weight:700
						line-height:24px
						.now
							margin-right:8px
							font-size:14px
							color:rgb(240,20,20)
						.old
							text-decoration:line-through
							font-size:10px
							color:rgb(147,153,159)
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:12px 
</style>
