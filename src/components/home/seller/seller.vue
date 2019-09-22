<template>
	<div class="seller" ref="myseller">
		<div class="sellerContent">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite">
					<span class="icon-favorite" @click="toggleFavorite" :class="favorite?'active':''"></span>
					<span class="text" >{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul class="supports" v-if="seller.supports">
					<li class="support-item" v-for="(item,i) in seller.supports" :key="i">
						<span class="icon" :class="classMap[seller.supports[i].type]"></span>
						<span class="text">{{seller.supports[i].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pictures">
				<h1 class="title">商家实景</h1>
				<div class="pictures-wrapper" ref="picturesWrapper">
					<ul class="picture-list" ref="pictureList">
						<li class="picture-item" v-for="pic in seller.pics" :key="pic.$index">
							<img :src="pic" width="120" height="90" alt="店铺图片" title="店铺图片">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos" :key="info.$index">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '../../subcomponents/star'
	import split from '../../subcomponents/split'
	import BScroll from 'better-scroll'
	import {saveToLocal, loadFromLocal, urlParse} from '../../../common/js/util'
	
	export default {
		props:['seller', 'id'],
		data(){
			// 此处的favorite数据需要使用立即执行函数获取localStorge
			return{
				favorite:(() => {
					return loadFromLocal(this.id, 'favorite', false)
				})()
			}
		},
		// 监听id的变化，每当id变化都重新让favorite去取值
		watch:{
			id(oldOvl, newOvl){
				this.favorite=loadFromLocal(this.id, 'favorite', false)
			}
		},
		computed:{
			favoriteText(){
				return this.favorite?'已收藏':'收藏'
			}
		},
		created(){
			this.classMap=['decrease', 'discount', 'special', 'invoice', 'guarantee']
			this.$nextTick(function(){
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.myseller, {
						probeType:3, click:true
					})
				}else{
					this.scroll.refresh();
				}
				// 还需要启动横向滚动
				this.PictureScroll();
				// 需要设置滚动区域高度
				this.$refs.myseller.style.height=window.innerHeight-174+'px'
				// console.log(this.favorite)
			})
		},
		methods:{
			PictureScroll(){
				// 给ul赋值宽度,想要横向滚动的话就必须先给宽度赋值
				// (因为右边的图片都被隐藏了，所以默认计算得到的宽度是可视化屏幕得到的宽度，但我们想要的却是实际的宽度，所以需要自己计算出来)，否则没办法滚动
				if(this.seller.pics){
					let width=120;
					let margin=6;
					// 计算ul宽度
					this.$refs.pictureList.style.width=(width+margin)*this.seller.pics.length-margin+'px'
				}
				this.$nextTick(function(){
					if(!this.picturescroll){
						// scrollX:true表示横向滚动，eventPassthrough:'vertical'表示禁止竖向滚动
						this.picturescroll=new BScroll(this.$refs.picturesWrapper, {
							scrollX:true,
							eventPassthrough:'vertical'
						})
					}else{
						this.picturescroll.refresh();
					}
				})
			},
			toggleFavorite(){
				this.favorite=!this.favorite;
				// 存储localStroge
				// 首先从url中获取id
				saveToLocal(this.id, 'favorite', this.favorite);
			}
		},
		components:{
			star,
			split
		}
	};
</script>

<style lang="stylus" rel="sheetstylus">
@import '../../../common/stylus/maxin'
.seller
	position:relative
	top:40px
	left:0
	bottom:0
	width:100%
	background:white
	overflow:hidden
	.sellerContent
		width:100%
		position:absolute
		top:0
		z-index:2
		.overview
			padding:18px 
			position:relative
			.title
				margin-bottom:8px
				line-height:14px 
				font-size:14px 
				color:rgb(7,17,27)
			.desc
				padding-bottom:18px 
				// 这里使用padding的话，下划线就会有18px间隔，使用margin则不会有间隔
				font-size:0
				border-1px(rgba(7,17,27,.1))
				.star
					display:inline-block
					margin-right:8px 
					vertical-align:top
				.text
					display:inline-block
					font-size:10px
					margin-right:12px 
					vertical-align:top
					color:rgb(77,85,93)
					line-height:18px
			.remark 
				display:flex
				padding-top:18px 
				.block
					flex:1
					border-right:1px solid rgba(7,17,27,.1)
					text-align:center
				.block:last-child
					border-right:none
				h2
					margin-bottom:4px 
					line-height:10px 
					font-size:10px 
					color:rgb(147,153,159)
				.content
					font-size:10px 
					line-height:24px 
					color:rgb(7,17,27)
					.stress
						font-size:24px 
			.favorite
				position:absolute
				// 并且由于图标左右各有13px宽度间隙，所以right需要减掉13px
				right:5px 
				top:18px 
				// 根据浏览器显示可知最大宽度为30px,如果不设置宽度，那么图标会左右移动(当点击的时候)
				width:50px
				// 但是我们需要水平居中，所以左右各添加一个字体宽度
				text-align:center
				.icon-favorite
					display:block
					color:#d4d6d9
					line-height:24px 
					font-size:24px 
					margin-bottom:4px
					&.active 
						color:rgb(240,20,20)
				.text
					line-height:10px 
					font-size:10px 
					color:rgb(77,85,93)
		.bulletin
			padding:18px 18px 0 18px 
			.title
				margin-bottom:8px
				line-height:14px 
				font-size:14px 
				color:rgb(7,17,27)
			.content-wrapper
				padding:0 12px 16px 12px 
				border-1px:rgba(7,17,27,.1)
				.content
					line-height:24px 
					font-size:12px 
					color:rgb(240,20,20)
			.supports
				.support-item
					padding:16px 12px 
					border-1px(rgba(7,17,27,.1))
					font-size:0
					&:last-child
						border-none()
				.icon 
					display:inline-block
					vertical-align:top
					width:16px 
					height:16px
					margin-right:6px
					background-size:16px 16px
					background-repeat:no-repeat
					&.decrease
						bg-image('../../../../resource/img/decrease_4')
					&.discount
						bg-image('../../../../resource/img/discount_4')
					&.special
						bg-image('../../../../resource/img/special_4')
					&.invoice
						bg-image('../../../../resource/img/invoice_4')
					&.guarantee
						bg-image('../../../../resource/img/guarantee_4')
				.text 
					font-size:12px
					line-height:16px
					display:inline-block
					vertical-align:top
					color:rgb(7,17,27)
		.pictures
			padding:18px 
			.title
				margin-bottom:12px
				line-height:14px 
				font-size:14px 
				color:rgb(7,17,27)
			.pictures-wrapper
				width:100%
				overflow:hidden
				// white-space:nowrap表示不换行
				white-space:nowrap
				.picture-list
					font-size:0
					.picture-item
						display:inline-block
						width:120px 
						height:90px 
						margin-right:6px
						&:last-child
							margin-right:0
		.info
			padding:18px 18px 0 18px
			color:rgb(7,17,27)
			.title
				padding-bottom:12px 
				line-height:14px 
				font-size:14px 
				border-1px(rgba(7,17,27,.1))
			.info-item
				padding:16px 12px 
				border-1px(rgba(7,17,27,.1))
				font-size:12px 
				line-height:16px 
				&:last-child
					border-none()
				
</style>
