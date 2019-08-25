<template>
	<div>
		<div class="shopcart" >
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="totalCount>0?'highlight':''">
							<span class="icon-shopping_cart" :class="totalCount>0?'highlight':''"></span>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="totalCount>0?'highlight':''">￥{{totalPrice}}元</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="payClass" @click.stop="pay">
						{{payDesc}}
					</div>
				</div>
			</div>
			<!-- 小球落点动画 -->
			<div class="ball-container">
				<!-- 定义js的钩子函数-->
				<transition-group
				 @before-enter="beforeEnter"
				 @enter="enter"
				 @after-enter="afterEnter"
				 >
					<div v-for="ball in balls" v-show="ball.show" class="ball" :key="ball.id">
						<!-- <div class="inner"></div> -->
					</div>
				</transition-group>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="food" v-for="(food,i) in selectFoods" :key="i">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price*food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="hiddenList"></div>
		</transition>
	</div>
</template>

<script>
	import cartcontrol from './cartcontrol'
	import BScroll from 'better-scroll'
	export default {
		data(){
			return{
				// 之前的模拟数据
				// selectFoods:[{price:10, count:2}]
				// 因为屏幕只能容纳5个商品左右，所以数组设为5
				balls:[
					{show:false, id:1},
					{show:false, id:2},
					{show:false, id:3},
					{show:false, id:4},
					{show:false, id:5}
				],
				dropBalls:[],
				fold:false
			}
		},
		props:['deliveryPrice', 'minPrice', 'selectFoods'],
		computed:{
			totalPrice (){
				var total=0;
				this.selectFoods.forEach((food) => {
					total+=food.price*food.count
				})
				return total;
			},
			totalCount (){
				var count=0;
				this.selectFoods.forEach((food) => {
					count+=food.count
				})
				return count;
			},
			payDesc (){
				if(this.totalPrice===0){
					return `￥${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					return `还需￥${this.minPrice-this.totalPrice}元起送`
				}else{
					return '去结算'
				}
			},
			payClass (){
				if(this.totalPrice<this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listShow(){
				if(this.totalCount>0&&this.fold===true){
					return true;
				}else{
					return false;
				}
			}
		},
		watch:{
			fold:function(val){
				// 初始化滚动屏幕
				// 计算属性内不应该对属性值做变更，解决这个问题的做法之一是使用watch监听
				if(val){
					this.$nextTick(() => {
						// 如果之前初始化过，那么不用初始化
						if(!this.scroll){
							this.scroll=new BScroll(this.$refs.listContent, {
								click:true
							})
						}else{
							// 直接刷新数据
							this.scroll.refresh();
						}
					});
				}
			}
		},
		methods:{
			drop(el){
				for(let i=0; i<this.balls.length; i++){
					let ball=this.balls[i];
					if(!ball.show){
						ball.show=true;//第一个改为false了，第二次点击的时候，第二个就被选中啦
						ball.el=el;//第一次点击加号的商品被加到列表头部
						this.dropBalls.push(ball);
						return;//出现一次就退出
					}
				}
			},
			// 小球起始位置
			beforeEnter(el){
				let count=this.dropBalls.length;//5
				while(count--){
					let ball=this.dropBalls[count];//43210
					if(ball.show){
						// getBoundingClientRect获取某个元素相对于视窗的位置集合，right,left,top,bottom
						let rect=ball.el.getBoundingClientRect();
						// console.log(rect.left, rect.top);//目标位置
						// console.log(el.getBoundingClientRect());//小球位置
						
						let x=-(rect.left-32);
						// window.innerHeight声明了窗口的文档显示区的高度和宽度
						let y=-rect.top;
						el.style.webkitTransform=`translate3d(${x}px,${y}px,0)`;
						el.style.transform=`translate3d(${x}px,${y}px,0)`;
					}
				}
			},
			// 最终落点
			enter(el){
				this.$nextTick(function(){
					el.style.webkitTransform='translate3d(0,0,0)';
					el.style.transform='translate3d(0,0,0)';
				})
			},
			// 到达落点之后消失
			afterEnter(el){
				let ball=this.dropBalls.shift();
				if(ball){
					ball.show=false;
				}
			},
			toggleList(){
				if(this.fold===false){
					this.fold=true;
				}else{
					this.fold=false;
				}
			},
			empty(){
				this.selectFoods.forEach((food) => {
					food.count=0;
				})
				this.fold=false;//否则下次点击加号会直接弹出购物车页面
			},
			hiddenList(){
				this.fold=false;
			},
			pay(){
				if(this.totalPrice<this.minPrice){
					return;
				}
				// 在html中使用@click.stop阻止冒泡
				window.alert(`支付${this.totalPrice}元`)
			}
		},
		components:{
			cartcontrol:cartcontrol
		}
	}
</script>

<style lang="stylus" rel="sheetstylus">
	@import '../../common/stylus/maxin'
	.shopcart
		position:fixed
		left:0
		bottom:0
		z-index:4
		width:100%
		height:48px
		font-size:0
		.content
			display:flex
			background:#141d27
			color:rgba(255,255,255,.4)
			.content-left
				flex:1
				.logo-wrapper
					display:inline-block
					position:relative
					top:-10px
					margin:0 12px
					padding:6px
					box-sizing:border-box
					// border-box，border和padding计算入width之内，其实就是怪异模式了
					width:56px
					// 虽然写的宽度是56,但是真实的宽度是44px,因为padding是6px，44+6*2=56，这就是怪异模式
					height:56px
					background:#141d27
					border-radius:50%
					.logo
						width:100%
						height:100%
						// 大圆包小圆，这里的宽高不包括计算padding
						border-radius:50%
						text-align:center
						background:#2b343c
						&.highlight
							background:rgb(0,160,220)
						.icon-shopping_cart
							line-height:44px
							font-size:24px
							color:#80858a
							&.highlight
								color:#fff
					.num
						position:absolute
						top:0
						right:0
						line-height:16px
						height:16px 
						width:24px
						text-align:center
						border-radius:16px
						font-size:9px
						font-weight:700
						background:rgb(240,20,20)
						color:#fff
						box-shadow:0 4px 8px 0 rgb(0,0,0,.4)
				.price
					display:inline-block
					// 把元素的顶端与行中最高元素的顶端对齐，虽然左边同行元素超过56px,但是这是相对位置的
					vertical-align:top
					// 因为我们要设置右边缘线的高度为24px,所以行高为24px,边缘线会自适应
					margin-top:12px
					line-height:24px 
					padding-right:12px
					border-right:1px solid rgba(255,255,255,.1)
					font-size:16px
					font-weight:700
					&.highlight
						color:#fff
				.desc
					display:inline-block
					vertical-align:top
					line-height:24px
					margin:12px 0 0 12px
					font-size:10px
			.content-right
				flex:0 0 105px
				width:105px
				.pay
					height:48px 
					// 因为实际这里的根元素高度为48px,虽然被购物车图标撑开了高度，但是是错误的，这个高度只属于购物车
					line-height:48px 
					text-align:center
					font-size:12px 
					font-weight:700
					background:#2b333b
					&.not-enough
						background:#2b333b
					&.enough 
						background:#00b43c
						color:#fff
		.ball-container
			.ball
				position:fixed 
				left:32px
				bottom:22px
				z-index:4
				// 使用cubic-bezier曲线0.49,-0.29,0.75,0.41
				transition:all .8s cubic-bezier(0.49,-0.29,0.75,0.1)
				width:16px
				height:16px
				border-radius:50%
				background:rgb(0,160,220)
		.shopcart-list
			position:absolute
			z-index:-1
			left:0
			top:0
			width:100%
			transition:all .5s
			transform:translate3d(0,-100%,0)
			&.fold-enter,&.fold-leave-to
				transform:translate3d(0,0,0)
			.list-header
				height:40px
				line-height:40px
				padding:0 18px
				background:#f3f5f7
				border-bottom:solid 1px rgba(7,17,27,.1)
				.title
					float:left
					font-size:14px
					color:rgb(7,17,27)
				.empty
					float:right
					font-size:12px
					color:rgb(0,160,220)
			.list-content
				padding:0 18px
				max-height:217px
				background:#fff
				overflow:hidden
				.food
					position:relative
					padding:12px 0
					box-sizing:border-box
					border-1px(rgba(7,17,27,.1))
					.name
						font-size:14px
						line-height:24px
						color:rgb(7,17,27)
					.price
						position:absolute
						right:90px
						bottom:12px
						font-size:14px
						line-height:24px
						font-weight:700
						color:rgb(240,20,20)
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:6px
	.list-mask
		position:fixed
		top:0
		left:0
		z-index:3
		width:100%
		height:100%
		background:rgba(7,17,27,.6)
		transition:all .5s
		backdrop-filter:blur(10px)
		&.fade-enter,&.fade-leave-to
			opacity:0
			background:rgba(7,17,27,0)
</style>
