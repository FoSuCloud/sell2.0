<template>
	<div class="roundmap">
		<div class="img">
			<ul class="imgul">
				<li v-for="(item, i) in img" :key="item.src" v-show="imgid===i" class="roundli">
						<img :src="item.src" width="100px" height="100px">
						<span class="left" :class="imgid%2===0?'active':''"></span>
						<span class="right" :class="imgid%2===1?'active':''"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// import home from '../../assets/logo.png'
	// 这种方法也行，但是只能一次导入一个图片
	export default {
		data(){
			return {
				img:[{src:require('../../assets/advertisement/1.jpg')}, {src:require('../../assets/advertisement/2.jpg')}, {src:require('../../assets/advertisement/3.jpg')}],
				roundid:0
			}
		},
		created(){
			setInterval(() => {
				this.play()
			}, 1000)
		},
		methods:{
			play(){
				if(this.roundid<this.img.length){
					this.roundid++;
				}
				if(this.roundid===this.img.length){
					this.roundid=0;
				}
			}
		},
		computed:{
			imgid(){
				return this.roundid;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.roundmap
		.img
			.imgul
				width:100%
				height:150px
				overflow:hidden
				position:relative
				.roundli
					width:100%
					height:100%
					img
						width:100%
						height:100%
					span
						border-radius:50%
						width:10px
						height:10px
						background:rgb(240,240,240,.8)
						margin-left:50%
						bottom:2px
						position:absolute
						&.active
							background:rgb(146,146,146,.8)
					.left 
						left:-10px
					.right
						left:10px
					
</style>
