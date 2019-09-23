<template>
	<div class="my" ref="my">
		<div class="my-status" v-show="!loginshow">
			<div class="my-wrapper">
				<div class="my-header">
					<div class="my-header_status">
						<div class="my-header-not_loaded" @click="loginin" v-show="!haslogin">
							<div class="my-header-not_loaded-or">
								登录/注册
							</div>
							<div class="my-header-not_loaded-suggestion">
								登录获取更多特权
							</div>
							<i class="icon-right"></i>
						</div>
						<div class="my-header-login" v-show="haslogin">
							<img class="user-img" :src="user_info.src" alt="头像" title="我的头像">
							<div class="user-nickname">{{user_info.nickname}}</div>
						</div>
					</div>
					<div class="my-header_money">
						<div class="my-header_money-left">
							<i class="icon-gold"></i>
							我的余额
							</div>
						<div class="my-header_money-middle">
							<i class="icon-redpocket"></i>
							我的红包
							</div>
						<div class="my-header_money-right">
							<i class="icon-coin-yen"></i>
							我的金币
							</div>
					</div>
				</div>
				<split></split>
				<div class="my-list">
					<ul class="my-list_ul">
						<li v-for="item in myicons" class="my-list_ul-li" :key="item.$index">
							<i :class="item.icon"></i>
							<span class="my-list_ul-text">{{item.text}}</span>
							<i class="icon-right"></i>
						</li>
					</ul>
				</div>
			</div>
			<div class="my-privacy">
				<a class="my-privacy-text" href="#">隐私政策</a>
			</div>
		</div>
		<login v-show="loginshow" @getuserinfo="changestatus" @changelogin="loginin"  @changepassword="tochangepassword"></login>
		<password v-show="passwordshow" @changepassword="tochangepassword"></password>
	</div>
</template>

<script>
	import split from '../subcomponents/split.vue';
	import login from '../subcomponents/login.vue';
	import password from '../subcomponents/password.vue';
	export default{
		components:{
			split,
			login,
			password
		},
		data(){
			return {
				myicons:[
				{icon:'icon-gift', text:'推荐有奖'}, 
				{icon:'icon-wish', text:'我的心意卡'}, 
				{icon:'icon-service', text:'服务中心'}, 
				{icon:'icon-rule', text:'规则中心'}],
				loginshow:false,
				passwordshow:false,
				haslogin:false,
				user_info:{}
			}
		},
		mounted(){
			this.setwidth()
		},
		methods:{
			setwidth(){
				this.$refs.my.style.height=document.documentElement.clientHeight-40+'px'
			},
			loginin(){
				this.loginshow=!this.loginshow;
			},
			tochangepassword(){
				this.loginshow=!this.loginshow;
				// 登录界面消失，密码界面出现
				this.passwordshow=!this.passwordshow;
			},
			changestatus(data){
				this.user_info=data;
				this.haslogin=!this.haslogin;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/maxin'
	.my
		background:rgb(238,238,238)
		.my-wrapper
			min-height:85%
			padding-bottom:40px
			.my-header
				.my-header_status
					.my-header-not_loaded
						background:rgb(0,151,255)
						color:white
						padding:30px 0 10px 30px
						position:relative
						.my-header-not_loaded-or
							font-size:20px 
						.my-header-not_loaded-suggestion
							font-size:12px
							padding-top:10px
						.icon-right
							position:absolute
							right:10px
							bottom:20px
							color:white
							font-size:30px
					.my-header-login
						background:rgb(0,151,255)
						color:white
						padding:30px 0 10px 30px
						.user-img
							width:30px
							height:30px
							border-radius:50%
							display:inline-block
							vertical-align:middle
							margin-right:10px
							margin-bottom:5px
						.user-nickname 
							display:inline-block
							font-size:18px
				.my-header_money
					display:flex
					background:white
					.my-header_money-left,.my-header_money-middle,.my-header_money-right 
						flex:1
						text-align:center
						border-right:solid 1px rgb(238,238,238)
						padding:10px 0
					.my-header_money-right
						border:none
					.icon-gold,.icon-coin-yen,.icon-redpocket
						display:block
						font-size:32px
						text-align:center
						padding-bottom:5px
					.icon-gold
						color:rgb(255,153,0)
					.icon-coin-yen
						color:rgb(126,211,33)
					.icon-redpocket
						color:rgb(255,95,62) 
			.my-list
				font-size:0
				background:white
				.my-list_ul
					padding-left:10px
					.my-list_ul-li
						font-size:24px
						height:50px
						line-height:50px
						position:relative
						.icon-gift
							color:red
						.icon-wish,.icon-rule,.icon-service
							color:blue
						.my-list_ul-text
							font-size:16px
							margin-left:10px
							vertical-align:bottom 
							display:inline-block
							width:85%
							border-1px(rgb(238,238,238))
						&:last-child
							.my-list_ul-text
								border-none()
						.icon-right
							position:absolute
							right:10px
							bottom:15px
							color:rgb(202,202,202)
		.my-privacy
			font-size:16px
			text-align:center
			.my-privacy-text
				color:blue
</style>
