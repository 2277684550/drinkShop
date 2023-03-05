<template>
    <div>
        <el-row >
            <el-col :span="18" :offset="3">
                <el-table
                    ref="multipleTable"
                    :data="shoppingGoodsList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    @selection-change="handleSelectionChange"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label=""
                    width="100"  
                    >
                    <template slot-scope="scope">
                        <el-image :src="scope.row.img_url"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="商品信息"
                    show-overflow-tooltip
                    >
                    <template slot-scope="scope">{{ scope.row.goodsName }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="单价"
                    width="120">
                    <template slot-scope="scope">￥{{ scope.row.price }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="数量"
                    width="120"
                    >
                    <template slot-scope="scope">
                        <button @click="Del(scope.row)">-</button>
                        <input @input="inputNumber(scope.row)" @change="changeNumber(scope.row)"  v-model="scope.row.number" class="number">
                        <button @click="Add(scope.row)">+</button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="金额"
                    width="120">
                    <template slot-scope="scope"><span style="color: red;">￥{{ Math.floor(scope.row.price*scope.row.number*100)/100 }}</span> </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作"
                    width="240">
                    <template slot-scope="scope">
                        <el-button @click.native="reqDel(scope.row.goodsId)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="18" :offset="3"> 
                <el-row class="fotter">
                        <el-col :span="8" :push="12" class="bottom">
                            <span>已选商品</span><span class="span">{{ selectNumber }}</span> <span>件</span>
                            
                        </el-col>
                        <el-col :span="8" :push="10" class="bottom">
                            <span>合计（不含运费）：</span><span class="span">{{ selectMoney }}</span> 
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
            shoppingGoodsList:[],
            multipleSelection: []
        };
    },
    methods: {
        async reqShoppingList(){
            const Id = this.$store.state.user.UserLogin.userId
            await this.$http.reqShopping({Id:Id}).then(res => {
                this.shoppingGoodsList = res.data
            })
        },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      async reqDel(e){
        let Del = await this.$http.reqDeleteShopping({goodsId:e}).then(res => {
                if(res.status == 0){
                    this.$message.success(res.$message)
                    this.reqShoppingList()
                }else{
                    this.$message.error(res.$message)
                }
            }) 
      },
      
      inputNumber(event){
            // 用户输入的文本*1转为int型
            let value = event.number * 1
            // 如果用户输入的非法或者小于1，结果都改为1
            // isNaN是判断用户输入的参数（可为任意类型）是否'不是数值'，
            // 如果不是则返回true，如果是则返回false
            if(isNaN(value)||value < 1){
                event.number = 1
            }else{
                // 如果输入的是小数，便转为整数
                event.number = parseInt(value)
            }
        },
    
      async changeNumber(event){
            // 用户输入的文本*1转为int型
            let value = event.number * 1
            await this.$http.reqPutShopping({symbol:'put',goodsId:event.goodsId,number:value}).then(res => {
                
            }) 
        },
        async Add(e){
            e.number+=1
            await this.$http.reqPutShopping({symbol:'+',goodsId:e.goodsId,number:e.number}).then(res => {
             
            }) 
        },
        async Del(e){
            e.number-=1
            await this.$http.reqPutShopping({symbol:'-',goodsId:e.goodsId,number:e.number}).then(res => {
              
            }) 
        },
    },
    mounted(){
        this.reqShoppingList()
    },
    computed:{
        selectNumber(){
            return this.multipleSelection.length
        },
        selectMoney(){
            let val = this.multipleSelection
            var num = 0
            val.forEach(item => {       
                var n = item.number*item.price 
                num+=n  
	    	})
            num = Math.floor(num * 100) / 100;  
            return num
        }
    }
};
</script>

<style scoped lang="less">
.number{
    width: 30px;
    height: 15px; 
    text-align: center;
}

.fotter{
    background-color: #fff;
    z-index: 9999;
   position: fixed;
   border-left: 20px solid white;
   border-right:20px solid white;
   box-sizing: border-box;
   width:inherit;
    bottom:-50px;
   height: 80px;
  min-width: 1100px;
    left: 50%;
    transform: translate(-50%,-50%);
    .el-col{
        display: flex;
        height: 100%;
        align-items: center;
    }
  
        .span{
            font-size: 30px;
            color: #ff4400;
    
    }
}
</style>
