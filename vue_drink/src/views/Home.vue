<template>
  <div class="home">
    <Search></Search>
    <Classify_Swiper></Classify_Swiper>
  </div>
</template>

<script>
// 引入搜索组件
import Search from '@/components/search'
// 引入轮播图和分类组件
import Classify_Swiper from '@/components/classify&swiper'
export default {
  name: 'Home',
  components: {
    Search,
    Classify_Swiper
  },
  mounted(){

  }
}
</script>
