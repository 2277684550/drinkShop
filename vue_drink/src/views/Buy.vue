<template>
    <div>
        <el-row class="buy">
        <!-- 放大镜区域 -->
            <el-col :span="5" :offset="3">
            <div class="left">
            <img class="leftImg" :src="goodsData.img_url" alt="" />
            <!-- 鼠标层罩 -->
            <div v-show="topShow" class="top" :style="topStyle"></div>
            <!-- 最顶层覆盖了整个原图空间的透明层罩 -->
            <div
                class="maskTop"
                @mouseenter="enterHandler"
                @mousemove="moveHandler"
                @mouseout="outHandler"
            ></div>
            </div>
            <div v-show="rShow" class="right">
            <img
                :style="r_img"
                class="rightImg"
                :src="goodsData.img_url"
                alt=""
            />
            </div>
        </el-col>
        <!-- 商品信息 -->
        <el-col :span="6" :offset="5">
            <h1>{{goodsData.goodsName}}</h1>
            <el-row style="margin-top: 200px;">
                <el-col :span="6" >
                    <div class="number">
                        <el-input v-model="number" @change="changeNumber"></el-input>
                        <div class="button">
                            <button @click="Add">+</button>
                            <button @click="Del">-</button>
                        </div>
                     </div>
                </el-col>
                <el-col :span="5">
                    <el-button type="danger" @click.native="AddShopping">加入购物车</el-button>
                </el-col>
            </el-row>     
        </el-col>
        </el-row>
     </div>  
</template>

<script>


export default {
    props: {

    },
    data() {
        return {
            goodsData:{},
            topStyle: { transform: "" },
            r_img: {},
            topShow: false,
            rShow: false,
            number:1
        };
    },
    methods: {
        async reqGoods(){
            let {data:res} = await this.$http.reqSeachData({goodsId:this.$route.params.keyword})
            // console.log(res[0]);
            this.goodsData = res[0]
            // console.log(this.goodsData);
        },
       // 鼠标进入原图空间函数
        enterHandler() {
        // 层罩及放大空间的显示
        this.topShow = true;
        this.rShow = true;
        },
        // 鼠标移动函数
        moveHandler(event) {
        // 鼠标的坐标位置
        let x = event.offsetX;
        let y = event.offsetY;
        // 层罩的左上角坐标位置，并对其进行限制：无法超出原图区域左上角
        let topX = x - 100 < 0 ? 0 : x - 100;
        let topY = y - 100 < 0 ? 0 : y - 100;
        // 对层罩位置再一次限制，保证层罩只能在原图区域空间内
        if (topX > 200) {
            topX = 200;
        }
        if (topY > 200) {
            topY = 200;
        }
        // 通过 transform 进行移动控制
        this.topStyle.transform = `translate(${topX}px,${topY}px)`;
        this.r_img.transform = `translate(-${2 * topX}px,-${2 * topY}px)`;
        },
        // 鼠标移出函数
        outHandler() {
        // 控制层罩与放大空间的隐藏
        this.topShow = false;
        this.rShow = false;
        },
        changeNumber(event){
            // 用户输入的文本*1转为int型
            let value = event * 1
            // 如果用户输入的非法或者小于1，结果都改为1
            // isNaN是判断用户输入的参数（可为任意类型）是否'不是数值'，
            // 如果不是则返回true，如果是则返回false
            if(isNaN(value)||value < 1){
                this.number = 1
            }else{
                // 如果输入的是小数，便转为整数
                this.number = parseInt(value)
            }
        },
        Add(){
            this.number++
        },
        Del(){
            if(this.number>1){
                this.number--
            }
        },
        async AddShopping(){
            if(window.sessionStorage.getItem('token')){
                //    判断该商品是否已经加过购物车
                await this.$http.reqAddShopping({goodsId:this.goodsData.goodsId,number:this.number}).then(res => {
                    if(res.status == 0){
                    this.$message.success(res.message)
                    }else{
                    this.$message.error(res.message)
                    }   
             })
            }else{
                this.$router.push({path:'/login'})
            }
        }
        },

    mounted(){
        this.reqGoods()
    }
};
</script>

<style scoped lang="less">
.buy{
    margin-top: 50px;
    // min-width: 1100px;
}
/* 放大的图片，通过定位将左上角定位到(0,0) */
.rightImg {
  display: inline-block;
  width: 800px;
  height: 800px;
  position: absolute;
  top: 0;
  left: 0;
} /* 右边的区域图片放大空间 */
.right {
  margin-left: 412px;
  width: 400px;
  height: 400px;
    z-index: 9999;
  position: absolute;
  overflow: hidden;
} /* 一个最高层层罩 */
.maskTop {
  width: 400px;
  height: 400px;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
} /* 层罩，通过定位将左上角定位到(0,0) */
.top {
  width: 200px;
  height: 200px;
  background-color: lightcoral;
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
} /* 原图的显示 */
.leftImg {
  width: 400px;
  height: 400px;
  display: inline-block;
} /* 原图的容器 */
.left {
  width: 400px;
  height: 400px;

  float: left;
  position: relative;
}
.shopping{
    width: 100%;
}
.number{
    width: 70px;
    display: flex;
    .el-input{
        width: 50px; 
          
    }
    .button{
        height: 50px;
        width: 20px;
    }
    button{
        width: 20px;
        height: 20px;
    }
}
</style>
