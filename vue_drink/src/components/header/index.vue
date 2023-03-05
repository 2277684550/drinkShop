<template>
    <div class="header">
        <el-row class="userRow">
          <el-col :span="2" >
            <router-link to="/" class="title">
              <h3>来饮</h3>
            </router-link>   
          </el-col>
          <!-- 右上角头像 -->
          <!-- 登陆就显示用户头像区 -->
          <el-col :span="1" :offset="21">
            <el-dropdown @command="handleCommand" v-if="user.token" placement="bottom">
              <span class="el-dropdown-link">
                <el-avatar :size="40"><img :src="user.user_pic"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown" class="userDropdown">
                <el-dropdown-item command="my">个人中心</el-dropdown-item>
                <el-dropdown-item command="recharge">充值</el-dropdown-item>
                <el-dropdown-item command="shoppingCart">购物车</el-dropdown-item>
                <el-dropdown-item command="exitLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 没登陆就显示登录按钮 -->
            <el-button @click="goLogin" type="info" size="mini" circle v-else class="btn">登录</el-button>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import router from '@/router/index'
export default {
    data() {
        return {
           
        };
    },
    mounted(){
    },
    methods: {
         // 头像框下面的下拉选项点击事件
        handleCommand(command) {
            if (command === 'exitLogin') {
                this.user.token = false
                router.push({path:'/'})
                sessionStorage.clear();
                window.location.reload()
                              
            }else 
            if(command === 'my'){
                this.goMy()
            }
            if(command === 'shoppingCart'){
                this.goShoppingCar()
            }
        },
        // 跳转登录页面
        goLogin() {
        this.$router.push({ path: '/login' })
        },
        // 跳转个人中心页面
        goMy() {
        this.$router.push({ path: '/mine' })
        },
        // 跳转购物车页面
        goShoppingCar() {
        this.$router.push({ path: '/shopping' })
        },
        // 跳转购买页面
        goBuy() {
            this.$router.push({ path: '/buy' })
        },
    },
    computed:{
        ...mapState({
            user:(state) => {           
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
.header{
  height: 100%;
  display: flex;
  align-items: center;
}
.title{
  text-decoration: none;
  font-size: 28px;
  color: black;
}
  .userRow {
    width: 75%;
    min-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

.el-avatar>img {
    width: 100%;
}
.btn{
  width: 40px;
  height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
// 用户头像下拉框设置
.userDropdown {
  width: 100px;
  text-align: center;

}
</style>
