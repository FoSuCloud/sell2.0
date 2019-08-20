<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<!-- 绑定属性然后才能使用props中的内容 -->
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<!-- 虽然已经有了class属性，但是还可以绑定class属性 -->
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<!-- 给元素嵌套transition元素，然后就可以设置动画了 -->
		<transition>
			<div v-show="detailShow" class="detail">
				<!-- clearfix -->
				<div class="detail-wrapper ">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="supports" v-if="seller.supports">
							<li class="support-item" v-for="(item,i) in seller.supports" :key="i">
								<span class="icon" :class="classMap[seller.supports[i].type]"></span>
								<span class="text">{{seller.supports[i].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">
							{{seller.bulletin}}
							</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import star from '../star/star.vue'
	export default {
		data(){
			return{
				classMap:[],
				detailShow:false
			}
		},
		// 子组件通过props属性接收父组件传递过来的值
		props:["seller"],
		created(){
			this.classMap=['decrease', 'discount', 'special', 'invoice', 'guarantee']
		},
		methods:{
			showDetail:function(){
				this.detailShow=true
			},
			hideDetail:function(){
				this.detailShow=false
			}
		},
		components:{
			star:star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/maxin';
	.header
		position:relative
		color:#fff
		background:rgba(7,17,27,.5)
		overflow:hidden
		.content-wrapper
			position:relative
			padding:24px 12px 18px 24px
			font-size:0
			.avatar
				display:inline-block
				vertical-align:top
				img
					border-radius:2px
			.content
				display:inline-block
				margin-left:16px
				.title
					margin:2px 0 8px 0
					.brand
					// 由于span是行内元素，设置宽高是无效的，所以设置为inline-block
						display:inline-block
						// 设置和行内元素的垂直对齐方式
						vertical-align:top
						width:30px
						height:18px
						bg-image('brand')
						background-size:30px 18px
						background-repeat:no-repeat
					.name
						margin-left:6px
						font-size:16px
						line-height:18px
						font-weight:bold
				.description
					margin-bottom:10px
					line-height:12px
					font-size:12px
				.support
					.icon
						display:inline-block
						vertical-align:top
						width:12px
						height:12px
						margin-right:4px
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						display:inline-block
						line-height:12px
						font-size:10px
			.support-count
				position:absolute
				right:12px
				bottom:14px
				padding:0 8px
				height:24px
				line-height:24px
				border-radius:14px
				background:rgba(0,0,0,0.2)
				text-align:center
				.count
					font-size:10px
					vertical-align:top
				.icon-keyboard_arrow_right
					font-size:10px
					line-height:24px
					margin-left:2px
		.bulletin-wrapper
			position:relative
			background:rgba(7,17,27,0.2)
			height:28px
			line-height:28px
			padding:0 12px 0 12px
			// white-space:nowrap设置不换行
			white-space:nowrap
			overflow:hidden
			// text-overflow:ellipsis多出来的文本就用省略号隐藏代替
			text-overflow:ellipsis
			// 去掉文本与图标间隙
			// font-size:0
			.bulletin-title
				display:inline-block
				vertical-align:middle
				width:22px
				height:12px
				bg-image('bulletin')
				background-size:22px 12px
				background-repeat:no-repeat
			.bulletin-text
				margin:0 4px
				font-size:10px
			.icon-keyboard_arrow_right
				position:absolute
				font-size:10px
				right:12px
				top:12px
		.background
			img
				position:absolute
				top:0
				left:0
				width:100%
				height:100%
				// 因为普通样式默认为1，所以如果是被遮罩的话，那么z-index应该是-1
				z-index:-1
				// filter滤镜提供了模糊和改变元素颜色的功能，常用于调整图像的渲染，背景或者边框显示效果
				// blur指的是模糊
				filter:blur(10px)
		.detail
		// 使用fixed位置相对于视图
			position:fixed
			top:0
			left:0
			width:100%
			height:100%
			// 本来是3的，但是设置购物车和商品组件后，没办法完全遮罩，所以需要提高z-index级别
			z-index:5
			// 因为内容过多的时候不能隐藏，所以使用auto
			overflow:auto
			// 让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。 
			// 因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。
			backdrop-filter:blur(10px)
			// 也就是说该页面必须设置背景，否则元素后面的元素仅仅是模糊，并没有被遮住，那样子会很难看，可以试着把background去掉看看
			background:rgba(7,17,27,.8)
			// 使用transition嵌套的动画
			&.v-enter-active,&.v-leave-active
				transition: all .5s ease
			&.v-leave-to,&.v-enter
				opacity: 0
			.detail-wrapper
				// 后续优化:为了实现css sticky footor布局,前面的最小高度被设置，但是设置中绘制为100%的话，那么无论内容为多少都需要下滑才能看到关闭按钮，这样是不符合我们设想的
				// 所以优化为min-height:85% padding-bottom:8% detail-close>height:7% 加起来就是屏幕高度100% ，这样的话就不会每次都要下滑才能关闭了
				min-height:85%
				width:100%
				padding-bottom:8%
				.detail-main
					padding-top:64px
					.name
						line-height:16px
						text-align:center
						font-size:16px
						font-weight:700
					.star-wrapper
						margin-top:18px
						padding:2px 0
						text-align:center
					.title
						display:flex
						width:80%
						margin:28px auto 24px auto
						.line
							flex:1
							position:relative
							top:-6px
							border-bottom:1px solid rgba(255,255,255,.2)
						.text 
							padding:0 12px
							font-size:14px
							font-weight:700
					.supports
						width:80%
						margin:0 auto
						.support-item
							padding:0 12px
							margin-bottom:12px
							font-size:0
							&:last-child
								margin-bottom:0
							.icon
								display:inline-block
								width:16px
								height:16px
								vertical-align:top
								margin-right:6px
								background-size: 16px 16px
								background-repeat:no-repeat
								&.decrease
									bg-image('decrease_2')
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')
							.text
								font-size:12px
								height:16px
								line-height:16px
					.bulletin
						width:80%
						margin:0 auto
						.content
							font-size:12px
							line-height:24px
							padding:0 12px
			.detail-close
				.icon-close
					margin-left:50%
					left:-16px
					font-size:32px
					margin-bottom:20px
					display:block
					position:relative
					top:0
					height:7%
							
</style>					
				