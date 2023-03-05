<template>
    <div>
        <!-- 搜索区域 -->
        <el-row class="searchRow">
          <el-col :span="4">
          </el-col>
          <el-col :span="16">
            <el-input placeholder="请输入内容" class="searchBox" v-model="gosearch"  @keyup.enter.native="goSearch">
              <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
          gosearch:''
        };
    },
    methods: {
      async goSearch(e){
        // 跳转路由,
        // 解决路由跳转时的NavigationDuplicated错误
        // 指定跳转成功的回调函数或catch错误
          this.$router.push(`/searchPage/${this.gosearch}`).catch(()=>{})
          this.$router.push(`/searchPage/${this.gosearch}`,()=>{})
          this.$router.push(`/searchPage/${this.gosearch}`,undefined,()=>{})
          // 如果不是从主页面跳转来的，就发起请求，并将数据传给父组件SearchPage
          if(this.$route.name !== 'home'){
            let res = await this.$http.reqSeachData({goodsName:this.gosearch})
            this.$emit('goodsList_search',res)
          }   
      },
    },
};
</script>

<style scoped lang="less">
// 搜索栏
.searchRow {
  margin: 0 auto;
  height: 100px;
  display: flex;
  align-items: center;

  .el-col {
    display: flex;
    justify-content: center;
  }

  // 搜索框
  .searchBox {
    width: 60%;

    .el-button {
      margin: auto auto;
    }
  }
}
</style>
