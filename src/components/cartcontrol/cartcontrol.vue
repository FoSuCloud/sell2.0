<template>
	<div class="cartcontrol">
		<transition name="cart">		
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="descCart"></div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop="addCart"></div>
	</div>
</template>

<script>
	import vue from 'vue'
	export default{
		props:['food'],
		methods:{
			addCart(){
				//由于数据对象中新增属性不更新，所以我们可以使用vue.set来手动重新更新
				if(!this.food.count){
					// vue.set('对象名','对象字段','对象字段被修改后的值')
					vue.set(this.food, 'count', 1)
				}else{
					// 数据属性被set嵌套到对象以后，就可以实时更新啦
					this.food.count++;
				}
				// 提交cart_add事件给父组件，第二个参数是要传递的参数
				this.$emit('cart_add', event.target);
			},
			descCart(){
				if(this.food.count>0){
					this.food.count--;
				}
			}
		}
	}
</script>

<style  lang="stylus" rel="sheetstylus">
	.cartcontrol
		font-size:0
		.cart-decrease
			display:inline-block
			padding:6px
			font-size:24px
			line-height:24px
			color:rgb(0,160,220)
			transition:all .5s linear
			&.cart-enter-active,&.cart-leave-active
				opacity:1
				transform:translate3D(0,0,0)
			&.cart-leave-to,&.cart-enter
				opacity:0
				// 3D滚动效果git c
				transform:translate3D(24px,0,0)
		.cart-count
			display:inline-block
			font-size:10px
			line-height:24px
			width:12px
			padding-top:6px
			text-align:center
			color:rgb(147,153,159)
			vertical-align:top
		.cart-add
			display:inline-block
			padding:6px
			font-size:24px
			line-height:24px
			color:rgb(0,160,220)
			
</style>
