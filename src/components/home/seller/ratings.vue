<template>
	<div class="ratings"  ref="ratings">
		<div class="ratingsConent" >
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :onlyContent="this.onlyContent" :desc="desc"
			 :selectType="this.selectType" :ratings="ratings" @updateType="updateType" @updateContent="updateContent">
			 </ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="rating in ratings" :key="rating.$index" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="recommend-icon" :class="rating.rateType===0?'icon-thumb_up':false || rating.rateType===1?'icon-thumb_down':''"></span>
								<span class="item" v-for="item in rating.recommend" :key="item.$index">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate }}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '../../subcomponents/star';
	import split from '../../subcomponents/split';
	import ratingselect from '../../subcomponents/ratingselect';
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import {JSDate} from '../../../common/js/date';
	
	const ERR_OK=0;
	const ALL=2;
	Vue.prototype.ALL=ALL;
	export default {
		props:['seller', 'id'],
		data(){
			return{
				selectType:ALL,
				onlyContent:false,
				ratings:[],
				desc:{
					all:"全部",
					positive:"推荐",
					negative:"吐槽"
				}
			}
		},
		components:{
			star,
			ratingselect,
			split
		},
		methods:{
			updateType(type){
				this.selectType=type
				console.log(this.selectType)
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
		async created(){
			await this.axios.get('/api/ratings?id='+this.id).then((res) => {
				if(res.data.errno===ERR_OK){
					this.ratings=res.data.data;
				}
			})
			// 同时需要确保每次更新，这两个值都还是这些值
			this.selectType=ALL;
			this.onlyContent=false;
			// 滚动屏幕
			this.$nextTick(function(){
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.ratings, {
						click:true, probeType:3
					})
				}else{
					this.scroll.refresh();
				}
			})
						// 需要设置滚动区域高度
			this.$refs.ratings.style.height=window.innerHeight-174+'px'
		},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return JSDate(date, 'yyyy-MM-dd hh:mm')
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/maxin'
// 因为我们不需要包括购物车，所以使用绝对定位，不使用fixed定位
.ratings
	position:relative
	top:40px
	left:0
	bottom:0
	width:100%
	background:white
	overflow:hidden
	.ratingsConent
	// 不能设置height:100%，这里的高度应该大于被绑定滚动的父元素
		// height:100%
		position:absolute
		top:0
		z-index:2
		.overview
			display:flex
			padding:18px 0
			.overview-left
				// 固定宽度
				flex:0 0 137px
				width:137px 
				border-right:1px solid rgba(7,17,27,.1)
				text-align:center
				padding:6px 0
				// 在iphon5中宽度过小会有问题，所以需要设置小点的宽度
				@media only screen and (max-width:320px)
					flex: 0 0 120px
					width:120px
				.score
					margin-bottom:6px
					line-height:28px
					font-size:24px 
					color:rgb(255,153,0)
				.title
					margin-bottom:8px 
					line-height:12px 
					font-size:12px 
					color:rgb(7,17,27)
				.rank
					line-height:10px 
					font-size:10px 
					color:rgb(147,153,159)
			.overview-right
				// 自适应宽度
				flex:1
				padding:6px 0 6px 24px
				// 当设备宽度最多为320px时
				@media only screen and (max-width:320px)
					padding:6px 0 6px 6px
				.score-wrapper
					margin-bottom:8px
					// 给父元素添加行高是不对的，应该给子元素添加，否则行高会超过预期
					// line-height:18px
					font-size:0
					// 还可以用flex实现同行显示，但是屏幕宽度不够的时候会导致某些部分错位
					.title
						display:inline-block
						font-size:12px 
						color:rgb(7,17,27)
						line-height:18px
					.score
						display:inline-block
						font-size:12px
						color:rgb(255,153,0)
						line-height:18px
					// star被转为class
					.star
						vertical-align:top
						margin:0 12px 
						display:inline-block
				.delivery-wrapper
					font-size:0
					line-height:18px
					.title
						display:inline-block
						font-size:12px 
						color:rgb(7,17,27)
					.delivery
						font-size:12px 
						color:rgb(147,153,159)
						margin-left:12px
		.rating-wrapper
			padding:0 18px 
			.rating-item
				display:flex
				padding:18px 0
				border-1px(rgba(7,17,27,.1))
				.avatar
					flex:0 0 28px 
					width:28px 
					margin-right:12px 
					img
						border-radius:50%
				.content
					flex:1
					position:relative
					.name
						line-height:12px 
						font-size:10px 
						margin-bottom:4px 
						color:rgb(7,17,27)
					.star-wrapper
						margin-bottom:6px 
						font-size:0
						.star
							display:inline-block
							vertical-align:top
							margin-right:6px 
						.delivery
							display:inline-block
							line-height:12px 
							font-size:10px
							color:rgb(147,153,159)
					.text
						line-height:18px 
						color:rgb(7,17,27)
						font-size:12px
						margin-bottom:8px 
					.recommend
						line-height:16px
						 font-size:0
						.recommend-icon,.item
							display:inline-block
							margin:0 8px 4px 0
							font-size:9px
						.recommend-icon
							color:rgb(0,160,220)
						.item 
							padding:0 6px 
							border:1px solid rgba(7,17,27,.1)
							border-radius:1px 
							color:rgb(147,153,159)
							background:#fff
					.time 
						position:absolute
						top:0
						right:0
						line-height:12px 
						font-size:10px 
						color:rgb(147,153,159)
							
</style>
