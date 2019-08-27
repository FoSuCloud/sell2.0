// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// 引入index.styl文件(index.styl导入了其他的styl文件)
import './common/stylus/index.styl'
Vue.config.productionTip = false

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
