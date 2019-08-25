import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/home/seller/goods'
import ratings from '@/components/home/seller/ratings'
import seller from '@/components/home/seller/seller'
import home from '@/components/home/home'
import my from '@/components/my/my'
import buy from '@/components/buy/buy'
import beforegood from '@/components/home/seller/beforegood'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Router)
Vue.use({axios, VueAxios});
// 必须要设置这一步，否则找不到axios
Vue.prototype.axios = axios;
// linkActiveClass是vue-router内置的状态，触发相应的router-link时，就会给元素添加class属性 'active'
// 然后我们就可以针对该属性设置样式了
export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
  		// 路由重定向
      redirect: '/home'
    },
  {
  	path:'/home',
  	name:'home',
  	component:home,
		children:[
				{path:'', name:'goods', component:goods},
				{path:'goods', name:'goods', component:goods},
				{path:'ratings', name:'ratings', component:ratings},
				{path:'seller', name:'sellers', component:seller}
		]
  },
  {
  	path:'/buy',
  	name:'buy',
  	component:buy
  },
  {
  	path:'/my',
  	name:'my',
  	component:my
  }
  ]
})
