<template>
  <div class="home">
	  <div class="home-wrapper" v-show="!show">
		  <div class="home-header">
		  		  <span class="location">佛山科学技术学院(仙溪校区)</span>
				  <!-- value="搜索商家,商品名称" -->
				  <input type="text"  value="搜索商家,商品名称" name="bus">
		  </div>
		  <div class="home-content" ref="content">
		  		  <ul>
		  				<li  @click="selectBusiness(businessData.id)" class="business-item" v-for="businessData in business" :key="businessData.id">
							<div class="item-wrapper">
									<!-- 图片 -->
									<div class="icon">
										<img :src="businessData.seller.avatar" width="57px" height="57px">
									</div>
									<!-- 内容 -->
									<div class="content">
										<h2 class="name">{{businessData.seller.name}}</h2>
										<p class="desc" v-show="businessData.seller.description">{{businessData.seller.description}}</p>
										<div class="extra">
											<span class="count">月售{{businessData.seller.sellCount}}份</span><span>好评率{{businessData.seller.rating}}%</span>
										</div>
									</div>
							</div>
		  				</li>
		  		  </ul>
		  </div>
	  </div>
	  <beforegood :seller="seller" :id="selectid"></beforegood>
  </div>
</template>

<script>
		import beforegood from './seller/beforegood.vue';
		import {urlParse} from '../../common/js/util';
		import BScroll from 'better-scroll';

		//返回成功的状态码
		const ERR_OK=0;
		
		export default{
			data() {
				return{
					selectid:"",
					seller:''
				};
			},
			props:['business'],
			created(){
				this.$nextTick(function(){
					this.initscroll();
				})
			},
			// updated(){
			// 	this.$nextTick(function(){
			// 		this.initscroll();
			// 	});
			// },
			methods:{
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
				}
			},
			components:{
				beforegood:beforegood
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
		position:absolute
		top:0
		bottom:40px
		width:100%
		.home-header
			z-index:0
			width:100%
			background:rgb(0,155,255)
			display:flex
			flex-direction:column
			position:fixed
			.location
				font-size:16px
				color:rgb(255,255,255)
				padding:18px 0 25px 18px
				flex:0
			input
				margin:0 18px 16px 18px 
				border-radius:25px
				height:49px
				background:rgb(255,255,255)
				color:rgb(146,146,146)
				flex:1 0 auto
				text-align:center
		.home-content
			overflow:hidden
			position:absolute
			top:124px 
			bottom:0
</style>
