<template>
  <div class="ReguserBcakGround">
    <h1>来饮商城注册页面</h1>
      <!-- reguser容器 -->
    <div class="Reguser_container">
      <!-- 创建一个盒子，将盒子居中 -->
      <div class="reguser_box">
        <!-- 头像区域 -->
        <!-- 图标盒子 -->
        <div class="avatar_box">
          <img src="../assets/logo.jpg" />
        </div>
        <!-- 登录表单区域 -->
        <!--绑定data数据，并且用rules绑定验证表单验证,用ref来上传表单信息-->
        <el-form
          ref="reguserFromRef"
          class="reguser_form"
          :model="reguserForm"
          :rules="reguserFormRules"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <!--prop为要拿下面的input里的数据与reguserFormRules属性相验证 -->
            <el-input 
            placeholder="请输入用户名"
            prefix-icon="el-icon-s-custom" 
            v-model="reguserForm.username">
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <!-- show-password为element自带的密码框属性,点击显示密码,再点隐藏 -->
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="reguserForm.password"
              autocomplete="off"
              show-password
            >
            </el-input>
          </el-form-item>
          <!-- 再次输入密码 -->
          <el-form-item prop="checkPassword">
            <!-- show-password为element自带的密码框属性,点击显示密码,再点隐藏 -->
            <el-input
              placeholder="请再次输入密码"
              prefix-icon="el-icon-lock"
              v-model="reguserForm.checkPassword"
              autocomplete="off"
              show-password
            >
            </el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="reguser()">注册</el-button>
            <el-button type="info" @click="resetReguserForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.reguserForm.checkPassword !== '') {
            this.$refs.reguserFromRef.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.reguserForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      reguserForm: {
        username: "", //双向绑定,验证是否成功
        password: "",
        checkPassword:""
      },
      // 表单验证规则
      reguserFormRules: {
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
          { validator: validatePass, trigger: 'blur'},
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
         // 验证第二次密码是否合法
         checkPassword: [
          { validator: validatePass2, trigger: 'blur'},
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置表单
    resetReguserForm() {
      // this指向Reguser组件，获取其数据，$refs是组件里面的一个对象，reguserFromRef是上面表单上传的表单信息
      // resetFields()是element自带的函数，对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.reguserFromRef.resetFields();
    },
    reguser() {
      // this.$refs.reguserFromRef为表单的引用对象,validate是对表单的预校验，里面会接收一个回调函数，
      // 返回一个boolean值，来返回表单的验证结果
      this.$http.reqUserReguser(this.reguserForm).then(res => {
        if(res.status == 0){
          this.$message.success(res.message)
          this.$router.push('/login')
        }else{
          this.$message.error(res.message)
        }   
      })
      }
  },
  components: {},
};
</script>

<style scoped lang="less">
.ReguserBcakGround{
  height: 100%;
  width: 100%;
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
.reguser_form {
  width: 80%;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -30%);
}
.btns {
  display: flex;
  justify-content: center;
}
.Reguser_container {
  height: 100%;
}
.reguser_box {
  width: 450px;
  height: 360px;
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
