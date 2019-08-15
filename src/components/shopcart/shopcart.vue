<template>
	<div class="shopcart">
		<div class="content">
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
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				// 之前的模拟数据
				// selectFoods:[{price:10, count:2}]
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
			}
		}
	}
</script>

<style lang="stylus" rel="sheetstylus">
	.shopcart
		position:fixed
		left:0
		bottom:0
		z-index:3
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
</style>
