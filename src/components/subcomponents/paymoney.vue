<template>
	<div class="paymoney">
		<div class="payheader" ref="payheader">
			<div class="payheaderwrapper">
					<div class="paytop">
						<div class="back" @click.stop="destory"><i class="icon-arrow_lift"></i></div>
						<span class="payloc">佛山科学技术学院(仙溪校区)西门</span>
						<div class="payphone">一叶(先生) <span class="phone">5201314</span>	
					</div>
					<div class="payother">
						<div class="paytime">
							<span class="text">送达时间</span>
							<span class="textright">尽快送达({{seller.deliveryTime}}分后送达)</span>
						</div>
						<div class="payway">
							<span class="text">支付方式</span>
							<span class="textright">在线支付</span>
						</div>
					</div>
				</div>
				<div class="paydetail">
					<span class="sellername">{{seller.name}}</span>
					<ul class="foodsdetail">
						<li class="foodsli" ref="foodsli" v-for="item in selectFoods" :key="item.$index">
							<img :src="item.icon" width="50" height="50">
							<div class="foodsmiddle" ref="foodsmiddle">
								<span class="foodname">{{item.name}}</span>
								<span class="foodcount">×{{item.count}}</span>
								<span class="foodprice">{{item.price*item.count}}元</span>
							</div>
						</li>
					</ul>
					<div class="foodbox">餐盒<span class="boxcount">￥{{selectFoods.length}}</span></div>
					<div class="deliveryPrice">配送费<span class="deliveryprice">￥{{seller.deliveryPrice}}</span></div>
					<div class="cheaper">
						<ul class="cheaperdetail">
							<li class="cheaperli" v-for="chea in seller.supports" :key="chea.$index" v-if="chea.type===0">
								<i class="decrease"></i>
								<span class="overprice">{{chea.description}}</span>
								<span class="delprice">-￥{{chea.reduce}}</span>
							</li>
						</ul>
					</div>
					<div class="nummoney"><div class="nummoneyright">总计<span class="spannum">￥{{nummoney}}</span></div></div>
				</div>
				<div class="middlesplit"></div>
			</div>
		</div>
		<div class="payfooter">
			<span class="finalprice">￥{{nummoney}}</span>
			<span class="line">|</span>
			<span class="reduceprice">已优惠￥{{allreduce}}</span>
			<input type="button" value="去支付" class="topayinput">
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		props:["selectFoods", "seller"],
		created(){
			this.$nextTick(function(){
				// console.log(this.$refs.foodsli[0].style);//为空
				var mywidth=window.innerWidth-30-50-10+'px'
				// 因为li是数组元素，所以需要给逐个绑定的元素赋值
				this.$refs.foodsmiddle.forEach((item) => {
					item.style.width=mywidth
				})
				this.initpayscroll();
				// 设置高度
				this.$refs.payheader.style.height=window.innerHeight-40+'px'
			})
		},
		methods:{
			initpayscroll(){
				if(!this.payscroll){
					this.payscroll=new BScroll(this.$refs.payheader, {
						click:true
					})
				}else{
					this.payscroll.refresh()
				}
			},
			destory(){
				this.$store.commit('changemoneyshow')
			}
		},
		computed:{
			nummoney(){
				// 计算总价格
				var num=0;
				this.selectFoods.forEach((item) => {
					num+=item.price*item.count;
				})
				// 减去优惠
				this.seller.supports.forEach((item) => {
					// 目前只有第一个类型才会有优惠
					if(item.type===0){
						var str=item.description;
						var arr=str.match(/\d+/g);
						if(num>=arr[0]){
							num-=arr[1];
						}
					}
				})
				return num;
			},
			allreduce(){
				var reduce=0;
				this.seller.supports.some((item) => {
					// 有一个存在就返回
					if(item.type===0){
						reduce+=item.reduce;
						return true;
					}
				});
				return reduce;
			}
		}
	};
</script>

<style lang="stylus" rel="sheetstylus">
	@import '../../common/stylus/maxin'
	.paymoney
		z-index:5
		position:fixed
		top:0
		width:100%
		height:100%
		// background:rgb(29,174,254)
		background:linear-gradient(to bottom left, rgb(29,174,254) , white)
		bottom:0
		.payheader
			padding:0 5px
			overflow:hidden
			.paytop
				padding:20px 0
				position:relative
				// background:linear-gradient(to bottom left, rgb(29,174,254) , white)
				.back
					position:absolute
					top:5px
					left:0
					.icon-arrow_lift
						display:block
						font-size:15px
						color:rgba(255,255,255,.8)
				.payloc
					font-size:18px
					color:rgb(255,255,255)
					margin-bottom:5px
					display:block
					padding:0 15px
					white-space:nowrap
					overflow:hidden 
					text-overflow:ellipsis
					width:200px
				.payphone
					color:rgb(255,255,255)
					font-size:14px
					margin-bottom:10px
					padding:0 15px
					display:block
					.phone
						margin-left:10px
				.payother
					background:white
					font-size:16px
					padding:20px 10px
					.paytime
						padding-bottom:10px
						border-1px(rgb(238,238,238))
						color:rgb(35,149,255)
						position:relative
						.text
							color:black
						.textright
							position:absolute
							right:0
					.payway
						padding-top:10px
						color:rgb(35,149,255)
						position:relative
						.text
							color:black
						.textright
							position:absolute
							right:0
			.paydetail
				background:white
				padding:15px 10px
				.sellername
					font-size:18px
					display:block
					padding-bottom:10px
					// 原装粗虚线2px
					position:relative
					&:after
						content:""
						width:100%
						position:absolute
						bottom:0
						left:0
						border-top:dotted 2px rgb(238,238,238)
				.foodsdetail
					.foodsli
						padding:10px 0
						font-size:0
						dotted-2px(rgb(238,238,238))
						img
							display:inline-block
						.foodsmiddle
							vertical-align:top
							display:inline-block
							line-height:50px
							height:50px 
							text-align:center
							font-size:14px
							margin-left:10px
							position:relative
							.foodname
								float:left
							.foodprice
								float:right
							.foodcount
								position:absolute
								margin-left:50%
								left:0
				.foodbox
					font-size:14px 
					padding:10px 0
					dotted-2px(rgb(238,238,238))
					.boxcount
						float:right
				.deliveryPrice
					font-size:14px 
					padding:10px 0
					dotted-2px(rgb(238,238,238))
					.deliveryprice
						float:right
				.cheaper
					.cheaperdetail
						.cheaperli
							height:50px 
							line-height:50px
							dotted-2px(rgb(238,238,238))
							.decrease
								bg-image('../../../resource/img/decrease_3')
								display:inline-block
								font-size:14px
								width:14px 
								height:14px
								background-size:14px 14px
							.overprice
								margin-left:10px
							.delprice
								color:red
								float:right
				.nummoney
					width:100%
					overflow:hidden
					.nummoneyright
						float:right
						font-size:14px
						margin-top:20px
						.spannum
							font-size:18px
							color:red
			.middlesplit
				height:10px
				width:100%
		.payfooter
			position:fixed
			bottom:0
			height:40px
			line-height:40px
			background:rgb(60,60,60)
			width:100%
			.finalprice
				font-size:16px
				color:white
				margin-left:10px
			.line,.reduceprice
				font-size:14px 
				color:rgb(87,87,87)
			.topayinput
				font-size:16px
				width:100px
				background:rgb(0,224,103)
				color:white
				float:right
				height:40px
				border-radius:1px
</style>
