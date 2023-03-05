<template>
    <div>
        <Search @goodsList_search = 'goodsList_search'></Search>
          <!-- 商品展示区域 -->
          <div class="main" >
          <el-row>
            <el-col :span="18" :push="3" @click.native="gobuy">
                <!-- <input type="text" v-model="goodsId" @keyup.enter="go" placeholder="值"> -->
              <ul >
                <li v-for="item in goodsList" :key="item.goodsId" :data-goodsId="item.goodsId">
                  <el-image :src="item.img_url"  class="commodityImage"></el-image>
                  <p>
                    <span class="shop">{{ item.shop }}</span>
                    <span>{{ item.goodsName }}</span>
                  </p>
                  <h3>￥{{ item.price }}</h3>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
    </div>
</template>

<script>
import Search from '@/components/search';
export default {
    props: {

    },
    data() {
        return {
            goodsList:[],
            goodsId:''
        };
    },
    methods: {
        async go(){
           let res = await this.$http.reqSeachData({oneId:this.goodsId})
           this.goodsId = res.data
           console.log(res);
        },
        gobuy(event){
            let element = event.target
            if(element.nodeName == 'LI'){
                element = element
            }else if(element.nodeName == 'SPAN' || element.nodeName == 'IMG'){
                element = event.target.parentElement.parentElement
            }else{
                element = event.target.parentElement
            }
            let {goodsid} = element.dataset
            this.$router.push(`/buy/${goodsid}`)
        },
        async search(){
           const params = this.$route.params.keyword
           if(isNaN(params)){
                let res = await this.$http.reqSeachData({goodsName:params})
                this.goodsList = res.data
           }else{
                let res = await this.$http.reqSeachData({twoId:params})
                this.goodsList = res.data
           }
           
           
        },
        goodsList_search(v){
            this.goodsList = v.data
        }
    },
    mounted(){
        this.search()
    },
    components: {
        Search
    },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main{
  margin-top: 100px;
  width: 100%;
  ul{
    width: 100%;
    min-width: 1000px;
    li{
        float: left;
      width: 24%;
      margin-left: 1%;    
      height: 350px;
      background-color: #fff;
      padding: 20px 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .commodityImage{
        width: 200px;
        height: 200px;
      }
      p{
        margin-top: 50px;
        height: 80px;
        width: 100%;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        /* 将对象作为弹性伸缩盒子模型显示 */
        display: -webkit-box;
        /* 限制在一个块元素显示的文本的行数 */
        /* -webkit-line-clamp 其实是一个不规范属性，使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；*/
        -webkit-line-clamp: 2;
        .shop{
          display: inline-block;
          width: 40px;
          background-color: #d9241a;
          text-align: center;
          font-size: 13px;
          color: #fff;
          margin-right: 10px;

        }
      }
      h3{
        height: 30px;
        width: 100%;
        color: #d9241a;
        text-align: left;
        margin-top: 20px;
      }
    }
  }
}
</style>
