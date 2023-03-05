<template>
    <div class="mine">
      <!-- 页头 -->
      <el-page-header @back="$router.push('/')" content="个人中心" > </el-page-header>
      <!-- 内容主体 -->
      <div class="main">
        <!-- tabs 标签页 -->
        <el-tabs tab-position="left" style="height: 700px">
          <!-- 个人信息标签页 -->
          <el-tab-pane label="个人信息">
            <!-- 头像行 -->
            <el-row v-for="(item, index) in userProperty" :key="index" class="userInfo">
              <el-col :span="12">
                <div v-if="index === 0">
                  {{ item }}:
                  <img :src="userInfo.user_pic" v-if="amend[index] === true" class="avatar">
                  <el-upload v-if="amend[0] !== true" class="avatar-uploader" accept="JPG, .PNG, .JPEG,.jpg, .png, .jpeg"
                    list-type="picture" :headers="headers" :action="url" :multiple="false" :show-file-list="false"
                    :http-request="uploadImg">
                    <img v-if="imgString" :src="imgString" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon" size="mini"></i>
                  </el-upload>
                </div>
                <div v-else-if="index === 1">
                  <span>{{ item }}:</span>
                  <span v-if="amend[index] === true">{{ userInfo.nickname }}</span>
                  <el-input v-else v-model="userInfo.nickname"></el-input>
                </div>
                <div v-else>
                  <span>{{ item }}:</span>
                  <span v-if="amend[index] === true">{{ userInfo.email }}</span>
                  <el-input v-else v-model="userInfo.email"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <el-button size="mini" v-if="amend[index] === true" @click="btn_amend(index)">点击修改</el-button>
                <el-button type="warning" size="mini" v-if="amend[index] !== true" @click="cancel_update(index)">
                  取消修改</el-button>
                <el-button type="primary" size="mini" v-if="amend[index] !== true" @click="update_userInfo(index)">
                  确认修改</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="充值">
            <p>当前余额为：{{ userInfo.balance }}</p>
            <el-button type="primary" @click="uplate_balance()">充值</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </template>
  
  <script>
  import {mapState} from 'vuex'
  export default {
    props: {},
    data() {
      return {
        Id:'',
        // 图片上传参数
        imgString: "",
        base64_avatar: "",
        // 图片上传头部信息（如果需要token就需要携带头部信息）
        headers: {
          Authorization: window.sessionStorage.getItem("token"),
        },
        // 图片上传路径
        url: "http://127.0.0.1:3000/my/update/avatar",
        userProperty: ['用户头像', '昵称', '邮箱'],
        // 修改信息按钮
        amend: { 0: true, 1: true, 2: true, 3: true },
      };
    },
    mounted() {
        this.Id = this.$store.state.user.UserLogin.userId
    },
    methods: { 
      // 转换base64方法时Promise对象，必须换成同步
      // 网上还有其它办法，但是尝试过后，这个方法出错的概率最低
      async uploadImg(file) {
        // 这里不一定是file.file，如果使用的方法不一样，有的是file.raw
        // 这里传入的应该是组件中携带的文件信息
        let base64Str = await this.getBase64(file.file);
        this.imgString = base64Str;
      },
      // 获取图片转base64，这里用的是Promise，所以调用方法时必须转换成同步（async，await）
      // 否则上传数据时好时坏，能不能上传成功全看运气 ^_^
      getBase64(file) {
        return new Promise(function (resolve, reject) {
          const reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function () {
            imgResult = reader.result;
          };
          reader.onerror = function (error) {
            reject(error);
          };
          reader.onloadend = function () {
            resolve(imgResult);
          };
        });
      },
      // 点击修改按钮隐藏自身，并显示确认修改按钮
      btn_amend(index) {
        this.amend[index] = false;
      },
      //取消修改
      cancel_update(index) { 
        this.amend[index] = true;
      },
      //确认修改之后上传修改信息
      async update_userInfo(index) {    
        // 更新头像 
        if (index === 0) {
            await this.$http.reqUpdateAvatar({Id:this.Id,avatar:this.imgString}).then(res=>{
            if (res.status !== 0) {
              this.$message.error(res.message)
                this.amend[index] = false;
              } else {
                this.$message.success(res.message)
                this.amend[index] = true;
              }
            })
            this.$store.dispatch('UserInfo',{Id:this.Id})
           }
        // 更新昵称
        if (index === 1) {
            await this.$http.reqUpdateNickname({Id:this.Id,nickname:this.userInfo.nickname}).then(res=>{
                if (res.status !== 0) {
                  this.$message.error(res.message)
                this.amend[index] = false;
                } else {
                  this.$message.success(res.message)
                this.amend[index] = true;
                
                }
            })
        }
        // 更新邮箱
        if (index === 2) {
            await this.$http.reqUpdateEmail({Id:this.Id,email: this.userInfo.email}).then(res=>{
                if (res.status !== 0) {
                  this.$message.error(res.message)
                this.amend[index] = false;
                } else {
                  this.$message.success(res.message)
                this.amend[index] = true;
                }
            })
        }
      },
    },
    computed:{
        ...mapState({
            userInfo:(state) => {           
                let result = state.user.UserInfo
                return result
            }
        })
    }
  };
  </script>
  
  <style scoped lang="less">
.mine{
    width: 80%;
    margin: 0 auto;
    min-width: 1100px;
}

  .main {
    width: 100%;
    margin: 50px auto;
    box-sizing: border-box;
    min-width: 1100px;

  }
  
  .el-page-header {
    margin-top: 20px;
    margin-left: 20px;
  }
  
  // 头像上传区
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
    margin: 20px 0 0 20px;
  }
  
  .el-row {
    height: 150px;
    display: flex;
    align-items: center;
  
    .el-col {
      div {
        display: flex;
        align-items: center;
  
        span {
          display: block;
          margin-right: 20px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  
  .el-input {
    width: 250px;
  }
  </style>
  