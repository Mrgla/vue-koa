// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { Icon, Button, Col, Row, Search, Swipe, SwipeItem, Lazyload, Toast, List, Field, NavBar, Tab, Tabs, Tabbar, TabbarItem } from "vant";
Vue.use(Icon)
Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Toast)
Vue.use(List)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
