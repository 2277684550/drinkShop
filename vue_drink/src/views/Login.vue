<template>
  <div class="LoginBcakGround">
    <h1>来饮商城登录页面</h1>
      <!-- login容器 -->
    <div class="Login_container">
      <!-- 创建一个盒子，将盒子居中 -->
      <div class="login_box">
        <!-- 头像区域 -->
        <!-- 图标盒子 -->
        <div class="avatar_box">
          <img src="../assets/logo.jpg" />
        </div>
        <!-- 登录表单区域 -->
        <!--绑定data数据，并且用rules绑定验证表单验证,用ref来上传表单信息-->
        <el-form
          ref="loginFromRef"
          class="login_form"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <!--prop为要拿下面的input里的数据与loginFormRules属性相验证 -->
            <el-input 
            placeholder="请输入用户名"
            prefix-icon="el-icon-s-custom" 
            v-model="loginForm.username">
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <!-- show-password为element自带的密码框属性,点击显示密码,再点隐藏 -->
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              show-password
            >
            </el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="info" @click="reguser()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: {},
  data() {
    return {
      loginForm: {
        username: "admin", //双向绑定,验证是否成功
        password: "123456",
      },
      // 表单验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          //required为必填项，message为验证错误时触发的提示，trigger为触发条件，这里为失去焦点触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          // min为最小长度，max为最大长度
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      //浏览器宽度高度
      windowHeight:'',
      windowWidth :''
    };
  },
  methods: {
    login() {
      // this.$refs.loginFromRef为表单的引用对象,validate是对表单的预校验，里面会接收一个回调函数，
      // 返回一个boolean值，来返回表单的验证结果
      this.$refs.loginFromRef.validate(async (valid) => {
        // 如果valid为false，就取反，return，什么也不操作
        if (!valid) return;
        const username = this.loginForm.username;
        const password = this.loginForm.password;
        console.log(this.$router);
        this.$store.dispatch('UserLogin',{username,password})
      })
    },
    reguser(){
      this.$router.push('/reguser')
    }

  },
  computed:{
        ...mapState({
            userinfo:(state) => {
                return state.user.UserLogin
            }
        })
    }
};
</script>

<style scoped lang="less">
.LoginBcakGround{
  margin: 0;
  padding: 0;
  height: 800px;
  width: 100%;
}
h1{
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%,-50%);
  color: gray;
  font-size: 40px;
  text-shadow:2px 1px 1px gray;
}
.login_form {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
}
.btns {
  display: flex;
  justify-content: center;
}
.Login_container {
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffff;
  border-radius: 3px;
  border: 1px solid gray;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid gray;
  border-radius: 50%;
  padding: 10px; //增加内边距，把图片挤进去
  box-shadow: 0 0 10px #ddd; //给边框加阴影，向外扩散10px
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    // 因为图片本身是只有图像颜色画存在，其余地方都是空的,所以可以添加背景色，
    //这样中间留出来一个padding的距离
    width: 100%;
    height: 100%;
    // 图片本身（本身也是一个块元素）也设置成圆形
    border-radius: 50%;
    background-color: #eee;
  }
}
</style>
