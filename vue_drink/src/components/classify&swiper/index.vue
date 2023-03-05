<template>
    <div>
         <!-- 分类与轮播图区域 -->
        <!-- 离开整个选项区,隐藏二级分类块 -->
        <div class="nav" @mouseleave="mouseleave()">
          <el-row class="options" type="flex" justify="space-around" >
            <!-- 左侧分类区 -->
            <el-col class="oneClassifyBox" :span="5">
              <!-- 一级分类   -->
              <h4>分类</h4>
              <ul>
                <li 
                v-for="item1 in oneClassifyList" 
                :key="item1.index"
                @mouseenter="mouseenter(item1.oneId)"
                ><span>{{item1.oneName}}</span></li>
              </ul>
            </el-col>
            <!-- 如果悬停一级分类,便显示二级分类块 -->
            <el-col class="twoClassifyBox" :span="19" v-show="twoClassifyShow" >
            <ul @click="goSearch">
              <li v-for="item2 in twoClassifyList"
              :key="item2.twoId"
              :data-twoClassifyId = 'item2.twoClassifyId'
              >
            <span  
            >{{item2.twoName}}</span>
            </li>
            </ul>
            </el-col>
            <!-- 如果悬停一级分类,便隐藏右侧轮播图及信息区 块 -->
            <!-- 右侧轮播图及信息区 -->
            <el-col class="swpinfo" :span="19" v-show="twoClassifyShow === false">
              <el-row class="swpinfo_Row">
                <el-col class="swiper" :span="18">
                  <!-- 轮播图走马灯 -->
                  <el-carousel height="100%">
                    <el-carousel-item v-for="item4 in swiperImg" :key="item4.id">
                      <img :src="item4.img" style="width:100%;height: 100%;">
                    </el-carousel-item>
                  </el-carousel>
                  </el-col>
                <el-col class="userInfo" :span="6">
                  <div v-if="userInfo.token">
                    <h1>您好: {{ userInfo.nickname }}</h1>
                    <h2>您当前的余额为: {{userInfo.balance}}</h2>
                  </div>
                  <div v-else>
                    <h1>欢迎来到来饮商城</h1>
                    <h2>请登录</h2>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props: {

    },
    data() {
        return {
            shopDataList:[],
            // 一级分类列表数据
            oneClassifyList:[],
            // 二级分类列表数据
            twoClassifyList: [],
            // 二级分类隐现
            twoClassifyShow: false,
            // 轮播图数据
            swiperImg:[],
        };
    },
    methods: {
        goSearch(event){
          let element = event.target
            if(element.nodeName == 'LI'){
                element = element
            }else if(element.nodeName == 'SPAN'){
                element = event.target.parentElement
            }else{
                element = event.target.firstElementChild
            }
          let {twoclassifyid} = element.dataset
          this.$router.push(`/searchPage/${twoclassifyid}`)
        },
        mouseenter(id){
            this.twoClassifyList = []
            this.twoClassifyShow = true
            var x = 1
            this.shopDataList.forEach(item => {
            if(item.twoId === id){
                this.twoClassifyList.push({'twoName':item.twoName,'twoId':x,'twoClassifyId':item.twoClassifyId});
                x++
            }
            })
         },
        mouseleave(){
            this.twoClassifyShow = false  
        }
    },
    mounted(){
        this.shopDataList = this.$store.state.goods.DataList
         // 获取一级分类列表
        this.shopDataList.forEach(item => {
          if(item.oneName !== ''){
            this.oneClassifyList.push({oneId:item.oneId,oneName:item.oneName})
          }
        })
        //获取轮播图片数据
        var x = 0
        this.shopDataList.forEach(item => {    
          if(item.swiperImg_url){
            x++
            this.swiperImg.push({'img':item.swiperImg_url,'id':x})
          }
        })
    },
   computed:{
    ...mapState({
            userInfo:(state) => {           
                let result = state.user.UserInfo
                if(sessionStorage.getItem('token')){
                    result.token = true;
                   }
                return result
            }
        })
   }
};
</script>

<style scoped lang="less">
// 搜索栏下面的区域
*{
    list-style: none;
}
.nav {
  width: 75%;
  min-width: 1100px;
  margin: 0 auto;
  background-color:#fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
}

// 选项区
.options {
  height: 400px;
  // 分类区
  .oneClassifyBox {
    height: 100%;
    padding: 15px;
    border-radius: 2%;
    background-color:#f7f9fa;
    ul{
      margin-top: 10px;
    }
    ul>li{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ul>li>span:hover{
      color: red;
      cursor: pointer;
    }
    twoClassifyBox{
      width: 80;
    }
  }
  .twoClassifyBox{
    padding: 20px;
    ul{
      display: flex;
      li{
        height: 40px;
        width: 100px;
        text-align: center;
      }
      li:hover{
        color: red;
        cursor: pointer;
      }
    }
  }
// 轮播图与个人信息区
  .swpinfo {
    height: 100%;
    // 轮播图与个人信息所在栏
    .swpinfo_Row {
        height: 100%;
        // 轮播图区
        .swiper {
          height: 100%;
    
          // 走马灯
          .el-carousel{
            width: 95%;
            height: 400px;
            margin: 0 auto;
            border-radius: 15px;
          }
          .el-carousel-item{
            img{
              width: 100%;
              height: 100%;
            }
            
          }
    
          .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
          }
    
          .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
          }
        }      
        // 个人信息区
        .userInfo {
          padding: 20px;
          height: 100%;
  
      }
    }
  }
}
</style>
