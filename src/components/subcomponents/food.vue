<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="selectedfood.image" alt="商品" title="商品">
					<div class="back" @click.stop="hide"><i class="icon-arrow_lift"></i></div>
				</div>
				<div class="content">
					<h1 class="title">{{selectedfood.name}}</h1>
					<div class="fooddetail">
						<span class="sell-count">月售{{selectedfood.sellCount}}份</span>
						<span class="rating">好评率{{selectedfood.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{selectedfood.price}}</span><span class="old" v-show="selectedfood.oldPrice">￥{{selectedfood.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="selectedfood"></cartcontrol>
					</div>
					<div class="buy" v-show="!selectedfood.count||selectedfood.count===0" @click.stop="addFirst">加入购物车</div>
				</div>
				<split v-show="selectedfood.info"></split>
				<div class="info" v-show="selectedfood.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{selectedfood.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :desc="this.desc" :onlyContent="this.onlyContent" 
					 :selectType="this.selectType" :ratings="selectedfood.ratings" 
					  @updateType="updateType" @updateContent="updateContent"></ratingselect>
					<div class="rating-wrapper">
						<!-- 此时还没有接收到父组件传递过来的selectedfood.ratings，所以需要在长度判断之前再加上selectedfood.ratings存在判断，如果不存在就不需要判断长度了 -->
						<ul v-if="selectedfood.ratings && selectedfood.ratings.length">
							<!-- v-show绑定一个函数，传递rating.rateTYpe,rating.text决定显示的内容 -->
							<li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in selectedfood.ratings" :key="rating.rateTime">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" :src="rating.avatar" width="12" height="12" alt="商品" title="商品">
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="rating.rateType===0?'icon-thumb_up':'' || rating.rateType===1?'icon-thumb_down':''"></span>
									 {{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!selectedfood.ratings || selectedfood.ratings.length==0">
							暂无评价
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import cartcontrol from './cartcontrol';
	import split from './split';
	import ratingselect from './ratingselect';
	import {JSDate} from '../../common/js/date';
	import Vue from 'vue';
	
	const ALL=2;
	const POSITIVE=0;
	const NEGATIVE=1;

	// 设置vue.prototype,否则会有警告Property or method &quot;ALL&quot; is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property
	Vue.prototype.ALL=ALL;
	Vue.prototype.NEGATIVE=NEGATIVE;
	Vue.prototype.POSITIVE=POSITIVE;
	export default {
		props:['selectedfood'],
		filters:{
			formatDate(time){
				let date=new Date(time);
				return JSDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		data(){
			return{
				showFlag:false,
				selectType:ALL,
				onlyContent:false,
				desc:{
					all:"全部",
					positive:"推荐",
					negative:"吐槽"
				}
			}
		},
		methods:{
			show(){
				this.showFlag=true;
				// 由于数据可能被更改，所以每次重新点进去都要重置一次
				this.selectType=ALL;
				this.onlyContent=false;
				this.$nextTick(function(){
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.food, {
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide(){
				this.showFlag=false;
			},
			addFirst(){
				this.$emit('cart_add', event.target)
				// 给vue实例中的数据对象添加属性只能在创建的时候添加(此时才是响应式的)，在创建实例之后添加则不是响应式的
				// 解决方法，通过vue.set方法
				Vue.set(this.selectedfood, 'count', 1)
			},
			updateType(type){
				this.selectType=type
			},
			updateContent(con){
				this.onlyContent=con
			},
			needShow(type, text){
				// 只显示内容为true并且不存在内容(只有点赞)
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType===ALL){
					return true;
				}else{
					return this.selectType===type;
				}
			}
		},
		components:{
			cartcontrol:cartcontrol,
			split:split,
			ratingselect:ratingselect
		}
	}
</script>

<style rel="sheetstylus" lang="stylus">
	@import '../../common/stylus/maxin'
	.food
		position:fixed
		left:0
		top:0
		bottom:48px
		z-index:3
		width:100%
		background:#fff
		transition:all .3s linear
		transform:translate3d(0,0,0)
		&.move-enter,&.move-leave-to
			transform:translate3d(100%,0,0)
		.image-header
			position:relative
			width:100%
			height:0
			// padding设置基于父元素宽度的内边距，所以最终宽高为375*375
			padding-top:100%
			img 
				position:absolute
				top:0
				left:0
				width:100%
				height:100%
			.back
				position:absolute
				top:5px
				left:0
				.icon-arrow_lift
					display:block
					padding:5px 
					font-size:20px
					color:rgba(255,255,255,.8)
		.content
			padding:18px 
			position:relative
			.title
				line-height:14px
				margin-bottom:8px
				font-size:14px 
				font-weight:700
				color:rgb(7,17,27)
			.fooddetail
				margin-bottom:18px 
				line-height:10px 
				height:10px
				font-size:0
				.sell-count,.rating
					font-size:10px 
					color:rgb(147,153,159)
				.sell-count
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
				right:12px 
				bottom:12px 
			.buy
				position:absolute
				right:18px 
				bottom:18px 
				z-index:2
				height:24px 
				line-height:24px 
				padding:0 12px 
				box-sizing:border-box
				font-size:10px 
				border-radius:12px
				color:#fff
				background:rgb(0,160,220)
		.info
			padding:18px 
			.title
				line-height:14px 
				margin-bottom:6px 
				font-size:14px 
				color:rgb(7,17,27)
			.text 
				line-height:24px 
				padding:0 8px 
				font-size:12px 
				color:rgb(77,85,93)
		.rating
			padding-top:18px 
			.title 
				line-height:14px 
				margin-left:18px 
				font-size:14px 
				color:rgb(7,17,27)
			.rating-wrapper
				padding:0 18px 
				.rating-item
					position:relative
					padding:16px 0
					border-1px(rgba(7,17,27,.1))
					.user
						position:absolute
						right:0
						top:16px 
						font-size:0
						line-height:12px 
						.name
							display:inline-block
							vertical-align:top
							font-size:10px 
							color:rgb(147,153,159)
							margin-right:6px
						.avatar 
							border-radius:50%
					.time
						line-height:12px 
						font-size:10px 
						color:rgb(147,153,159)
						margin-bottom:6px 
					.text 
						line-height:16px 
						font-size:12px 
						color:rgb(7,17,27)
						.icon-thumb_up,.icon-thumb_down
							line-height:16px
							margin-right:4px 
							font-size:12px 
						.icon-thumb_up
							color:rgb(0,160,220)
						.icon-thumb_down
							color:rgb(147,153,159)
				.no-rating
					padding:16px 0
					font-size:12px 
					color:rgb(147,153,159)
</style>
