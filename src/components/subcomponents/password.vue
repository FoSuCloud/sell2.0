<template>
	<div class="password">
		<div class="password-header">
			<i class="icon-arrow_lift" @click="showpassword"></i>
			<span class="header-text">密码登录</span>
		</div>
		<form action="#" class="password-form">
			<div  class="form-number">
				<input type="text" placeholder="手机/邮箱/用户名">
			</div>
			<div class="form-pass-wrap">
				<input type="password" placeholder="密码" class="form-password">
				<i class="icon-hiddenpass"></i>
			</div>
			<input type="submit" value="登录" class="form-button">
		</form>
		<div class="footer">
			<a href="#">忘记密码?</a>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			showpassword(){
				this.$emit('changepassword');
				// 显示密码界面
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
	@import '../../common/stylus/maxin.styl'
	.password 
		z-index:2
		width:100%
		background:rgb(245,245,245)
		position:fixed
		top:0
		bottom:0
		height:100%
		.password-header 
			width:100%
			height:60px 
			background:rgb(0,154,255)
			padding-left:20px
			margin-bottom:20px
			.icon-arrow_lift,.header-text
				font-size:20px
				color:white
				display:inline-block
				position:relative
				top:20px 
			.icon-arrow_lift
				margin-right:20px 
			.header-text 
				font-size:16px
		.password-form 
			width:100%
			margin-bottom:30px
			.form-number,.form-pass-wrap
				width:100%
				height:40px
			.form-number
				border-1px(rgb(238,238,238))
				input
					padding-left:20px
					width:100%
					height:100%
					outline:0
			.form-pass-wrap
				position:relative
				margin-bottom:20px
				.form-password 
					padding-left:20px
					outline:0
					width:100%
					height:100%
				.icon-hiddenpass 
					position:absolute
					right:20px
					font-size:24px
					top:10px
					color #bfbfbf
			.form-button 
				width:96%
				margin:auto
				left:2%
				position:relative
				height:40px
				background:rgb(77,192,96)
				border-radius:3px
				color:white
		.footer 
			position:relative
			a 
				color:rgb(70,167,216)
				position:absolute
				right:15px
</style>
