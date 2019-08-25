<template>
  <div class="beforegood" v-show="show">
		<!-- 绑定属性，向子组件中传值 -->
		<v-header :seller="seller" class="vheader"></v-header>
	<!--  由于border-1px 的存在会导致文字被左右拉伸，因为设置了scaleY被缩放，所以暂时去掉这个class-->
		<div class="good-tab">
			<div class="tab-item">
				<router-link :to="{name:'goods',query:{id:updateid}}">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link :to="{name:'ratings',query:{id:updateid}}">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link :to="{name:'sellers',query:{id:updateid}}">商家</router-link>
			</div>
		</div>
		<keep-alive>
			<router-view :seller="updateseller" :id="updateid" v-if="updateid" class="Router"></router-view>
		</keep-alive>
  </div>
</template>

<script>
		import header from '../../subcomponents/header.vue'
		import {urlParse} from '../../../common/js/util'

		//返回成功的状态码
		const ERR_OK=0;
		
		export default{
			props:['id', 'seller'],
			computed:{
				show(){
					return this.$store.state.homeshow;
				},
				updateid(){
					return this.id;
				},
				updateseller(){
					return this.seller;
				}
			},
			components:{
				'v-header':header
			}
		}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../../common/stylus/maxin'
	.beforegood
		.good-tab 
			display:flex
			width:100%
			height:40px
			line-height:40px
			// border-bottom:solid 1px rgba(7,17,27,.1)
			// 使用maxin.styl中的border-1px()设置边框线
			border-1px(rgba(7,17,27,.1))
			position:absolute
			top:134px
			z-index:1
			background:white
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
		.Router
			display:flex
</style>
