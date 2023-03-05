import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 创建一个新的VueRouter对象
const Router = new VueRouter({
  // 配置路由，因为是数组，所以可以配置多个路由
  routes:[
    {
      path: '/',
      name: 'home',
      component:() => import('@/views/Home')
    },
    {
      path: '/login',
      name: 'login',
      component:() => import('@/views/Login')
    },
    {
      path: '/reguser',
      name: 'reguser',
      component:() => import('@/views/Reguser')
    },
    {
      path: '/mine',
      name: 'mine',
      component:() => import('@/views/Mine')
    },
    {
      path: '/searchPage/:keyword?',
      name: 'searchPage',
      component:() => import('@/views/SearchPage')
    },
    {
      path: '/buy/:keyword?',
      name: 'buy',
      component:() => import('@/views/Buy')
    },
    {
      path: '/shopping',
      name: 'shopping',
      component:() => import('@/views/Shopping')
    },
  ],
  // mode:'hash', //使用URL hash值来做路由，支持所有浏览器，
  // linkActiveClass:'act'
})


//跳转前触发，前面的Router为上面的路由实例
Router.beforeEach((to, from, next) => { //to.Route :即将要进入到路由对象
  //from:Router ：当前导航正要离开的路由
  //next:Function :一定要调用该方法来resolve这个钩子
  //next('/')或者next({ path:'/'}) :跳转到一个不同的的地址 
// 如果跳转buy组件时，且取反isLogin，因为此时isLogin为空，也就是未登录，
// 取反则为true，便可以使用if条件，然后如果未登录，则跳转登录页面，
//因为上面buy.vue里面有退出登录按钮，点击后令isLogin为false，这里每一次可以检测，是否为false
//如果为则跳转登录页
// if(to.fullPath == '/buy' && (!sessionStorage.getItem('token'))){
// next('/login')
// }

// 如果没有条件限制，则路由该跳转哪就跳转哪
next()    
})



export default Router
