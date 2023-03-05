// home模块的小仓库
import { 
    reqUserLogin,
    reqUserInfo,
 } from "@/api"

import router from '@/router/index'
 import { Message } from 'element-ui';
// state:仓库储存数据的地方
const state = {
    //state 中的默认初始值别瞎写，服务器返回什么，默认值就为什么
    UserLogin:{},
    UserInfo:{}
   
}
// mutations:修改state的唯一手段,只有mutations可以修改state的数据
const mutations = {
    USERLOGIN(state,UserLogin){
        state.UserLogin = UserLogin
    },
    USERINFO(state,UserInfo){
        state.UserInfo = UserInfo
    },

    
}
// actions:处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    async UserInfo({commit},data){
        let userInfo =  await reqUserInfo()
        commit('USERINFO',userInfo.data)     
    },
    // 这里可以书写业务逻辑,但是不能修改直接修改state,要提交mutations,让mutations提交
    async UserLogin({dispatch,commit},data){
        await reqUserLogin(data).then( res =>{
            if(res.status == 0){
                console.log(res);
              Message.success(res.message)
              window.sessionStorage.setItem('token',res.token);
              router.go(-1)
              commit('USERLOGIN',res)
              dispatch('UserInfo',res.userId)
            }else{
              Message.error(res.message)
            }
          });
            
           //  1.将登录成功之后的token，保存到客户端的 session Storage 中
            //     1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
            //     1.2 token 只应在当前网站打开期间生效，所以将token 保存在 sessionStorage 中          
           
           
    
    },

}
// getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
const getters = {}

// 对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}