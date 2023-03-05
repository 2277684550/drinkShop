<template>
  <div id="app">
   <Index v-if="isRouterAlive"></Index>
  </div>
</template>

<script>
// 引入header组件
import Index from '@/views/index.vue'
import Header from '@/components/header'
export default {
  name: 'app',
  provide(){
        return{
            reload:this.reload        
        }    
    },
    data(){
        return{
            isRouterAlive:true        
        }    
    },
  components: {
    Header,
    Index
  },
  methods:{
    reload(){
            this.isRouterAlive=false;
            this.$nextTick(function(){
                this.isRouterAlive = true;            
            })        
        }   
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
  mounted(){
    //发起网络请求,并把请求的数据放到vuex的state中
    this.$store.dispatch('DataList')
    console.log('APP.vue');
  }
}
</script>

<style>
html,
body,
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* 设置最小宽度 */
  min-width: 1100px;
}
.el-main{
  /* 设置main的背景颜色 */
  background-color: #f4f4f4;
}
</style>
