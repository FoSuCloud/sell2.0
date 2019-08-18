<template>
  <div id="app">
		<!-- 绑定属性，向子组件中传值 -->
    <v-header :seller="seller"></v-header>
	<!--  由于border-1px 的存在会导致文字被左右拉伸，因为设置了scaleY被缩放，所以暂时去掉这个class-->
		<div class="tab">
			<div class="tab-item">
				<router-link to="/goods" :seller="seller">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">商家</router-link>
			</div>
		</div>
	<keep-alive>
		<router-view :seller="seller"></router-view>
	</keep-alive>
  </div>
</template>

<script>
		import header from './components/header/header.vue'
		import {urlParse} from './common/js/util'

		//返回成功的状态码
		const ERR_OK=0;
		
		export default{
			data() {
				return{
					seller:{}
				};
			},
			created(){
				// 获取url地址
				let url=window.location.href;
				this.seller.id=urlParse(url).id;
				// console.log(this.obj)
				this.axios.get('/api/seller?id='+this.seller.id).then((res) => {
						// console.log(res.data)
						if(res.data.errno===ERR_OK){
							// this.seller=res.data.data;
							// 在原有seller的基础上(id)再加上相应数据
							this.seller=Object.assign({}, this.seller, res.data.data);
							// console.log(this.seller);
						}
				});
			},
			components:{
				'v-header':header
			}
		}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './common/stylus/maxin'
	#app
		.tab 
			display:flex
			width:100%
			height:40px
			line-height:40px
			// border-bottom:solid 1px rgba(7,17,27,.1)
			// 使用maxin.styl中的border-1px()设置边框线
			border-1px(rgba(7,17,27,.1))
			.tab-item
				flex:1
				text-align:center
				// & > a 代表的就是 #app.tab.tab-item >a 也可以直接使用 a
				&>a
					display:block
					font-size:14px
					color:rgb(77,85,93)
					&.active
						color:rgb(200,0,0)
</style>
