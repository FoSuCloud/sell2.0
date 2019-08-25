<template>
  <div id="app">
		<keep-alive>
			<router-view :business="business" class="Router"></router-view>
		</keep-alive>
		<div class="tab" v-show="!show">
			<div class="tab-item">
				<router-link to="/home" :business="business">首页</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/buy">订单</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/my">我的</router-link>
			</div>
		</div>
  </div>
</template>

<script>
		import {urlParse} from './common/js/util'

		//返回成功的状态码
		const ERR_OK=0;
		
		export default{
			data() {
				return{
					business:{}
				};
			},
			created(){
				this.axios.get('/api/alls').then((res) => {
						if(res.data.errno===ERR_OK){
							// 在原有seller的基础上(id)再加上相应数据
							this.business=res.data.data;
						}
				});
			},
			computed:{
				show(){
					return this.$store.state.homeshow;
				}
			}
		}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#app
		.tab 
			display:flex
			width:100%
			height:40px
			line-height:40px
			position:fixed
			bottom:0
			background:black
			.tab-item
				z-index:-1
				flex:1
				text-align:center
				// & > a 代表的就是 #app.tab.tab-item >a 也可以直接使用 a
				&>a
					display:block
					font-size:14px
					color:white
					&.active
						color:rgb(240,0,0)
</style>
