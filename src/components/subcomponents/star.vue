<template>
	<!-- 绑定了starTpye计算函数，得到一个class属性 -->
	<div class="star" :class="starTpye">
		<span class="star-item" v-for="(itemClass,i) in itemClasses"
		 :class="itemClass" :key="i"></span>
	</div>
</template>

<script>
	const LENGTH=5;
	const CLS_ON="on";
	const CLS_OFF="off";
	const CLS_HALF="half";
	export default {
		props:["size", "score"],
		computed:{
			starTpye:function(){
				return 'star-'+this.size
			},
			itemClasses:function(){
				let result=[];
				let score=Math.floor(this.score*2)/2;
				let hasDecimal=score%1!==0;//余数
				let integer=Math.floor(score);//整数
				for(var i=0; i<integer; i++){
					result.push(CLS_ON)
				}
				if(hasDecimal){
					result.push(CLS_HALF)
				}
				while(result.length<LENGTH){
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/maxin'
	.star
		font-size:0
		&.star-48
			.star-item
				width:20px
				height:20px
				margin-right:22px
				background-size:20px 20px
				display:inline-block
				&:last-child
					margin-right:0
				&.on
					bg-image('../../../resource/img/star48_on')
				&.half
					bg-image('../../../resource/img/star48_half')
				&.off
					bg-image('../../../resource/img/star48_off')
		&.star-36
			.star-item
				width:15px
				height:15px
				margin-right:6px
				background-size:15px 15px
				display:inline-block
				&:last-child
					margin-right:0
				&.on
					bg-image('../../../resource/img/star36_on')
				&.half
					bg-image('../../../resource/img/star36_half')
				&.off
					bg-image('../../../resource/img/star36_off')
		&.star-24
			.star-item
				width:10px
				height:10px
				margin-right:3px
				background-size:10px 10px
				display:inline-block
				&:last-child
					margin-right:0
				&.on
					bg-image('../../../resource/img/star24_on')
				&.half
					bg-image('../../../resource/img/star24_half')
				&.off
					bg-image('../../../resource/img/star24_off')
</style>
