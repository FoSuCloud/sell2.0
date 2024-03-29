// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// 引入index.styl文件(index.styl导入了其他的styl文件)
import './common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'
// 高德地图api
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 申请的高德key
  key: '53cd6d63c910f06e8a5a6179b750cb21',
  v: '1.4.4',
  // 插件集合
  plugin: [
	 "Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
  ]
});

Vue.config.productionTip = false

Vue.use(VueLazyload, {
	error: require('./assets/logo.png'), //这个是请求失败后显示的图片
	loading: require('./assets/loading.gif'), //这个是加载的loading过渡效果
	try: 1 // 这个是加载图片数量
})

Vue.use(Vuex);
var store=new Vuex.Store({
	state:{
			homeshow:false,
			moneyshow:false
	},
	mutations:{
		changehomeshow(state){
			state.homeshow=!state.homeshow;
		},
		changemoneyshow(state){
			state.moneyshow=!state.moneyshow;
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  store,
  components: { App },
  template: '<App/>'
});
