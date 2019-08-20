<template>
	<div class="ratingselect">
		<div class="rating-type">
			<!-- 在这里不能使用v-show,要使用v-if,因为使用length的话需要数据已经存在，但是数据还不存在，所以使用v-if,传递ratings数据之后再使用 -->
			<span class="block positive" @click="select(2)" :class="newSelectType===2?'active':''">
			{{desc.all}} <span class="count" v-if="ratings">{{ratingsLength}}</span></span>
			<span class="block positive" @click="select(0)" :class="newSelectType===0?'active':''">
			{{desc.positive}} <span class="count" v-if="ratings">{{positives}}</span></span>
			<span class="block negative" @click="select(1)" :class="newSelectType===1?'active':''">
			{{desc.negative}} <span class="count" v-if="ratings">{{negatives}}</span></span>
		</div>
		<div class="switch" :class="newOnlyContent?'on':''" @click="toggleContent">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				newSelectType:this.selectType,
				newOnlyContent:this.onlyContent
			}
		},
		props:['ratings', 'selectType', 'onlyContent', 'desc'],
		methods:{
			select(type){
				this.newSelectType=type;
				console.log(this.newSelectType)
				// 需要告诉父组件，你传给我的值被我修改啦！否则会有警告
				// Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "selectType"
				this.$emit('updateType', type);
			},
			toggleContent(){
				this.newOnlyContent=!this.newOnlyContent;
				this.$emit('updateContent', this.newOnlyContent);
			}
		},
		computed:{
			ratingsLength(){
				return this.ratings.length
			},
			positives(){
				var ran=this.ratings.filter((rating) => {
					return rating.rateType===0
				});
				return ran.length
			},
			negatives(){
				var ran=this.ratings.filter((rating) => {
					return rating.rateType===1
				})
				return ran.length
			}
		}
	}
</script>

<style rel="sheetstylus" lang="stylus">
	@import '../../common/stylus/maxin'
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px 
			border-1px(rgba(7,17,27,.1))
			font-size:0
			.block
				padding:8px 12px
				display:inline-block
				margin-right:8px 
				border-radius:1px 
				font-size:12px 
				line-height:16px
				color:rgb(77,85,93)
				&.active
					color:#fff
				.count
					font-size:8px 
					margin-left:2px
				&.positive
					background:rgba(0,160,220,.2)
					&.active
						background:rgb(0,160,220)
				&.negative
					background:rgba(77,85,93,.2)
					&.active
						background:rgb(77,85,93)
		.switch  
			margin:12px 18px 
			line-height:24px
			border-1px(rgba(7,17,27,.1))
			color:rgb(147,153,159)
			font-size:0
			&.on
				.icon-check_circle
					color:#00c850
			.icon-check_circle
				display:inline-block
				font-size:24px 
				margin-right:4px 
			.text 
				font-size:12px
				display:inline-block
				vertical-align:top
			
</style>
