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
				<div class="spport" v-if="seller.supports">
					<span class="icon"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper"></div>
	</div>
</template>

<script>
	export default {
		// 子组件通过props属性接收父组件传递过来的值
		props:["seller"]
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/maxin';
	.header
		color:#fff
		background-color:#000
		.content-wrapper
			padding:24px 12px 18px 24px
			font-size:0
			.avatar
				display:inline-block
			.content
				display:inline-block
				font-size:14px
				margin-left:16px
				.title
					margin:2px 0 8px 0
					.brand
					// 由于span是行内元素，设置宽高是无效的，所以设置为inline-block
						display:inline-block
						// 设置和行内元素的垂直对齐方式
						vertical-align:text-top
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
</style>
