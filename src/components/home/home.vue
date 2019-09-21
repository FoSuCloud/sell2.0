<template>
  <div class="home">
	  <div class="home-header" v-show="!show">
		<span class="location"><i class="icon-location2"></i>{{positon}}</span>
		  <!-- value="搜索商家,商品名称" -->
		  <div class="iconsearch">
			  <i class="icon-search"></i>
			  <input type="text" autofocus="autofocus" placeholder="搜索商家,商品名称" class="home-search">
		  </div>
	  </div>
	  <div class="home-wrapper" v-show="!show"  ref="content">
		  <div class="homewrawra">
			  <roundmap></roundmap>
			  <split></split>
			  <div class="fleximg" ref="fleximg">
			  			  <div class="flex-wrapper" ref="flexwrapper">
			  				  <div class="fleximgone">
			  					  <ul class="flexul">
			  						<li v-for="(ic,i) in iconlist" :key="ic.$index" class="icli">
			  										<img :src="ic" class="icimg">
			  										<span class="icspan">{{spanlist[i]}}</span>
			  									</li>
			  					  </ul>
			  					  <ul class="flexul2">
			  						<li v-for="(ic,i) in iconlist2" :key="ic.$index" class="icli">
			  										<img :src="ic" class="icimg">
			  										<span class="icspan">{{spanlist[i+4]}}</span>
			  									</li>
			  					  </ul>
			  				  </div>
			  				  <div class="fleximgtwo">
			  					  <ul class="flexul">
			  						<li v-for="(ic,i) in iconlist" :key="ic.$index" class="icli">
			  							<img :src="ic" class="icimg">
			  							<span class="icspan">{{spanlist[i]}}</span>
			  						</li>
			  					  </ul>
			  				  </div>
			  			  </div>
			  			  <div class="flexround">
			  				  <span class="flexleft"></span>
			  				  <span class="flexright"></span>
			  			  </div>
			  </div>
			  <split></split>		  
			  <div class="home-content">
				  <ul>
					<li  @click="selectBusiness(businessData.id)" class="business-item" v-for="businessData in business" :key="businessData.id">
						<div class="item-wrapper">
							<!-- 图片 -->
							<div class="icon">
								<img v-lazy="businessData.seller.avatar" width="57px" height="57px">
							</div>
							<!-- 内容 -->
							<div class="content">
								<h2 class="name">{{businessData.seller.name}}</h2>
								<div class="innercontent">
									<star :size="24" :score="businessData.seller.score"></star>
									<span class="score">{{businessData.seller.score}}</span>
									<span class="count">月售{{businessData.seller.sellCount}}份</span>
								</div>
								<div class="middlecontent">
									<span class="minPrice">￥{{businessData.seller.minPrice}}元起送</span>
									<span class="line">|</span>
									<span class="deliveryPrice">配送费￥{{businessData.seller.deliveryPrice}}</span>
								</div>
								<div class="extra">
									<span class="location">2.0km</span>
									<span class="line">|</span>
									<span class="time">{{businessData.seller.deliveryTime}}分钟</span>
								</div>
							</div>
						</div>
					</li>
				  </ul>
			  </div>
		  </div>
	  </div>
	  <div class="amap-wrapper">
	        <el-amap class="amap-demo" vid="map" :plugin="plugin">
			</el-amap>
	  </div>
	  <beforegood :seller="seller" :id="selectid"></beforegood>
  </div>
</template>

<script>
		import beforegood from './seller/beforegood.vue';
		import roundmap from '../subcomponents/roundmap.vue';
		import split from '../subcomponents/split.vue';
		import star from '../subcomponents/star.vue';
		import {urlParse} from '../../common/js/util';
		import BScroll from 'better-scroll';
		import VueAMap from 'vue-amap';
		//返回成功的状态码
		const ERR_OK=0;
		
		export default{
			data() {
				let self = this;
				return{
					selectid:"",
					seller:'',
					iconlist:[require('../../assets/icon/1.png'),
					require('../../assets/icon/2.png'),
					require('../../assets/icon/3.png'),
					require('../../assets/icon/4.png')],
					iconlist2:[require('../../assets/icon/5.png'),
					require('../../assets/icon/6.png'),
					require('../../assets/icon/7.png'),
					require('../../assets/icon/8.png')],
					spanlist:['海鲜', '火锅', '水果', '甜食', '烟酒', '饮品', '烧烤', '寿司'],
					positon: '',
					plugin: [{
					       pName: 'Geolocation',
					       events: {
					         init(o) {
					           // o 是高德地图定位插件实例
					           o.getCurrentPosition((status, result) => {
					             // console.log(result.formattedAddress);  //  能获取定位的所有信息
					             if(!result.formattedAddress){
									 self.positon='佛山科学技术学院仙溪校区(西门)';
								 }else{
									 self.positon=result.formattedAddress
								 }
					           });
					         }
					       }
					     }]
				};
			},
			props:['business'],
			created(){
				this.$nextTick(function(){
					this.initscroll();
					this.iconscroll();
				});
			},
			mounted(){
				// this.getlocation()
			},
			methods:{
				getlocation(){
					
				},
				// 由于请求是异步的，所以会先执行其他的，但是我们需要先拿到数据，所以设置同步 async awit
				async selectBusiness(id){
					await this.axios.get('/api/seller?id='+id).then((res) => {
						if(res.data.errno===ERR_OK){
							this.seller=res.data.data;
						}else{
							console.log("失败")
						}
					});
					this.selectid=id;
					// DOM元素更新之后，主要是id,seller传递过去之后才执行
					this.$nextTick(function(){
						// 显示前商家页面,beforegood.vue
						this.$store.commit('changehomeshow');
					})
				},
				initscroll(){
					if(!this.busscroll){
						this.busscroll=new BScroll(this.$refs.content, {
							click:true
						})
					}else{
						this.busscroll.refresh();
					}
				},
				iconscroll(){
					if(!this.icscroll){
						this.icscroll=new BScroll(this.$refs.fleximg, {
							probeType:3, scrollX:true, eventPassthrough:'vertical', click:true
						})
					}else{
						this.icscroll.refresh();
					}
					// 设置图标总宽度，两倍,由于是浮动的，图标位置不稳，滚动之后会变化
					this.$refs.flexwrapper.style.width=window.innerWidth*2 -40+'px';
					this.$refs.content.style.height=window.innerHeight-124-40+'px';
				}
			},
			components:{
				beforegood,
				roundmap,
				split,
				star
			},
			computed:{
				show(){
					return this.$store.state.homeshow;
				}
			}
		}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/maxin'
	.home
		width:100%
		.amap-wrapper 
			position:absolute
			top:0
		.home-header
			z-index:0
			width:100%
			background:rgb(0,155,255)
			display:flex
			flex-direction:column
			height:124px
			.location
				font-size:16px
				color:rgb(255,255,255)
				padding:18px 0 25px 18px
				flex:0
				width:200px
				white-space:nowrap
				overflow:hidden 
				text-overflow:ellipsis
				// 因为设置了overflow:hidden之后下边距消失了，所以需要设置外下边距
				margin-bottom:20px
				.icon-location2
					padding-right:3px
			.iconsearch
				position:relative
				flex:1 0 auto
				display:inline-block
				margin:0 18px 16px 18px 
				.icon-search
					position:absolute
					top:0
					bottom:0
					left:80px
					width:20px
					height:20px
					margin:auto
					color:rgba(0,0,0,.5)
				.home-search
					border-radius:25px
					height:49px
					color:rgb(146,146,146)
					width:100%
					text-align:center
					// outline:none去掉外边框
					outline:none
					&:focus
						color:rgba(7,17,27,1)
		.home-wrapper
		    // 这个高度只要不小于原来高度就可以了，遮住底部没关系，有z-index,而且是没有脱离文档流的
			height:500px
			overflow:hidden
			.fleximg
				padding:5px 20px
				overflow:hidden
				.flex-wrapper
					white-space:nowrap
					display:flex
					.fleximgone,.fleximgtwo
						width:100%
						ul
							display:flex
							height:60px
						.flexul,.flexul2
							.icli
								width:50px 
								flex:1
								position:relative
								.icimg
									width:40px
									height:40px
									position:absolute
									left:0
									right:0
									margin:auto
								.icspan
									font-size:12px
									position:absolute
									left:0
									right:0
									margin:auto
									bottom:0
									text-align:center
									color:rgb(129,129,129)
				.flexround
					position:relative
					width:100%
					height:20px
					.flexleft,.flexright
						width:10px
						height:10px 
						background:rgb(240,240,240,.8)
						border-radius:50%
						position:absolute 
						bottom:0
						margin-left:50%
						&.active
							color:rgba(7,17,27,.5)
					.flexleft
						left:10px
					.flexright
						left:-10px
			.home-content
				overflow:hidden
				.item-wrapper
					margin:5px 20px
					position:relative
					border-1px(rgba(7,17,27,.5))
					.icon
						display:inline-block
						vertical-align:top
					.content
						display:inline-block
						padding:0 10px
						font-size:8px
						color:rgb(102,102,102)
						.name
							font-size:16px 
							color:rgb(51,51,51)
							padding-top:3px
						.innercontent
							padding:8px 0 6px 0
							.score,.count,.star
								display:inline-block
								margin-right:2px
							.score
								color:rgb(255,102,0)
						.middlecontent
							.minPrice,.line
								margin-right:2px
							.line
								font-size:8px
						.extra
							position:absolute
							bottom:5px
							right:0
							.time
								color:rgb(0,151,255)	
</style>
