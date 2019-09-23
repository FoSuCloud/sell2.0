<template>
	<div class="mylogin" ref="mylogin">
		<div class="mylogin-wrapper">
			<div class="login-header">
				<div class="headerwarpper">
					<i class="icon-arrow_lift" @click="loginshow"></i>
					<span class="oldlogin">登录</span>
					<span class="password" @click="showpassword">密码登录</span>
				</div>
			</div>
			<div class="login-content">
				<form name="login">
					<div class="phone-wrapper">
						<input type="number" v-model="loginnum" placeholder="手机号" class="phone">
						<input type="button" @click="startsetTime" ref="checkmode" class="getnum" value="获取验证码">
					</div>
					<input type="text" placeholder="验证码" class="number">
					<span class="formtext">温馨提示，尚未注册的账号，使用手机号码登录将自动注册,且代表你已经同意<a href="#">《用户服务协议》</a><a href="#">《隐私政策》</a></span>
					<input type="button" @click="verify" class="submit" value="登录/注册">
				</form>
			</div>
			<div class="login-footer">
				<div class="footer-center">
					<div class="footer-left"></div>
					<span class="threelogin">第三方登录</span>
					<div class="footer-right"></div>
				</div>
				<ul class="software">
					<li class="software-icon" v-for="item in softlist" :key="item.$index">
						<i :class="item.icon"></i>
						<span class="software-text">{{item.text}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				softlist:[
				 {icon:'icon-taobao', text:'淘宝'},
				 {icon:'icon-zhifubao', text:'支付宝'}, 
				 {icon:'icon-weibo', text:'微博'}, 
				 {icon:'icon-qq', text:'QQ'}, 
				 {icon:'icon-weixin', text:'微信'}],
				 getshow:true,
				 loginnum:'',
				 toshowpassword:false,
				 code:''
			}
		},
		mounted(){
			this.$refs.mylogin.style.height=window.innerHeight+'px'
		},
		methods:{
			loginshow(){
				// 传递给父组件，告诉他，隐藏我！
				this.$emit('changelogin');
			},
			startsetTime(){
				let reg=/^1([3-8]\d|5[0-35-9]|7[3678])\d{8}$/
				if(this.loginnum.length===11 && reg.test(this.loginnum)){
					var i=60;
					var timer;
					// timer=setInterval(function(){
					// 	// console.log(i)
					// 	// 此时的this指向的不是vue实例！
					// 	// 几个方法:1.变量指代this,2.箭头函数，3.回调函数(但是只执行一次!)
					// 	i--;
					// }, 1000)
					this.$refs.checkmode.value=i
					timer=setInterval(() => {
						if(i>=0){
							// console.log(i)
							i--;
							this.$refs.checkmode.value=i
						}
						// 此处为<0，因为刚才为1的时候立马减一，为0，但是此时立刻取消计时器就不会显示1了
						if(i<0){
							clearInterval(timer);
							this.$refs.checkmode.value="获取验证码"
							this.$refs.checkmode.style.backgroundColor='rgb(213,212,210)';
						}
					}, 1000)
					// 但是此时下面两个if都在setTimeout之前就执行完毕了，所以放在这里也没用
					// 调用函数?不行的，在setimeout里面调用函数，this指的是window,
					// 所以要用回调函数!!!
					
					// 点击之后向服务器发送一个请求去获取验证码
					this.axios.get('/api/validatecode?loginnum='+this.loginnum).then((res) => {
						if(res.data.errno===0){
							// console.log(res.data.data);
							// 把服务器发送过来的验证码存储起来
							this.code=res.data.data;
						}else{
							console.log('失败')
						}
					})
				}
			},
			verify(){
				// 提交手机号码和验证码给服务器验证
				this.axios.get('/api/getverify?number='+this.loginnum+'&text='+this.code)
				.then(res => {
					if(res.data.errno===0){
						// 登陆成功传递信息给父组件
						this.$emit('getuserinfo', res.data.data)
						// 在DOM更新后再隐藏
						this.$nextTick(function(){
							// 隐藏登录页面
							this.loginshow();
						})
					}
				})
			},
			showpassword(){
				this.$emit('changepassword');
				// 显示密码界面
			}
		},
		watch:{
			loginnum(oldval, newval){
				// 还应该加上正则判断号码
				let reg=/^1([3-8]\d|5[0-35-9]|7[3678])\d{8}$/
				if(this.loginnum.length===11 && reg.test(this.loginnum)){
					this.$refs.checkmode.style.backgroundColor='rgb(58,100,250)';
				}else{
					this.$refs.checkmode.style.backgroundColor='rgb(213,212,210)';
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
	@import '../../common/stylus/maxin.styl'
	.mylogin
		z-index:3
		background:rgb(245,245,245)
		position:relative
		top:0
		bottom:0
		width:100%
		.mylogin-wrapper
			position:relative
			width:100%
			height:100%
			.login-header
				background:rgb(0,156,255)
				height:50px
				padding:0 15px
				.headerwarpper 
					padding:15px 15px 15px 0
					color:white
					font-size:0
					.icon-arrow_lift 
						margin-right:10px
						display:inline-block
						font-size:20px
					.oldlogin 
						display:inline-block
						font-size:20px
					.password 
						float:right
						display:inline-block
						font-size:16px
						color:white
						position:relative
						top:4px
			.login-content 
				margin-top:15px
				.phone-wrapper,.number
					width:100%
					height:45px
				.phone-wrapper
					border-1px(rgb(238,238,238))
					position:relative
					.phone
						width:95%
						height:100%
						padding-left:5%
						outline:0
					.getnum
						position:absolute
						right:0
						width:100px 
						height:80%
						top:10%
						border-radius:3px 
						background:rgb(213,212,210)
						right:2%
						color:white
						outline:0
				.number
					padding-left:5%
					outline:0
					width:95%
				.formtext 
					padding:20px 10px
					display:block
					font-size:14px 
					line-height:20px
					a
						color:rgb(18,217,235)
				.submit
					width:96%
					height:50px
					background:rgb(77,192,96)
					border-radius:5px 
					position:relative
					left:2%
			.login-footer 
				position:absolute
				width:100%
				height:130px 
				bottom:0
				.footer-center 
					margin:auto
					text-align:center
					width:50%
					display:flex
					margin-bottom:30px
					.footer-left,.footer-right
						content:""
						width:100%
						border-bottom:1px solid rgb(153,153,153)
						flex:1
						position:relative
						top:-8px
					.threelogin 
						color:rgb(153,153,153)
						padding:0 12px
						font-size:16px
				.software 
					display:flex
					width:90%
					margin:auto
					.software-icon 
						font-size:40px 
						display:inline-block
						flex:1 0 auto
						text-align:center
						.icon-zhifubao, .icon-qq
							color:blue
							display:block
						.icon-taobao, .icon-weibo
							color:red
							display:block
						.icon-weixin
							color:green 
							display:block
						.software-text
							font-size:14px
							display:block
							padding-top:10px
							color:rgb(157,157,157)
</style>
