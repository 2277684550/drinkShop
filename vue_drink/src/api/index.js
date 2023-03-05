// 当前这个模块,对API统一管理
import requests from './request'

//--------------------------获取商品接口---------------------------------
//获取商品及分类数据
export const reqDataList = ()=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/goods/classify',method:'get'})
}

//搜索商品
export const reqSeachData = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/goods/search',params:data,method:'get'})
}

//--------------------------登录注册接口---------------------------------
//登录
export const reqUserLogin = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/api/login',data,method:'post'})
}
//注册
export const reqUserReguser = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    console.log(data);
    return requests({url:'/api/reguser',data,method:'post'})
}

//--------------------------用户信息接口---------------------------------

// 请求用户信息
export const reqUserInfo = (data)=>{
    console.log(data);
    return requests({url:'/my/userInfo',data,method:'get'})
}

//修改头像
export const reqUpdateAvatar = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/my/update/avatar',data,method:'post'})
}

//修改昵称
export const reqUpdateNickname = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/my/update/nickname',data,method:'post'})
}

//修改邮箱
export const reqUpdateEmail = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/my/update/email',data,method:'post'})
}

//修改余额
export const reqUpdateBalance = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/my/update/balance',data,method:'post'})
}

//--------------------------购物车接口---------------------------------
//添加购物车
export const reqAddShopping = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/shopping/add',data,method:'post'})
}

//获取购物车数据
export const reqShopping = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/shopping/get',data,method:'get'})
}

//判断商品是否在购物车内
export const reqShopping_panduan = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/shopping/panduan',params:data,method:'get'})
}

//删除购物车
export const reqDeleteShopping = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/shopping/delete',data,method:'delete'})
}

//更新购物车商品数量
export const reqPutShopping = (data)=>{
    // 发请求，第一个参数为接口地址，第二个参数为请求方式 
    return requests({url:'/shopping/update',data,method:'put'})
}

export default {
    reqDataList,
    reqSeachData,
    reqUserLogin,
    reqUserInfo,
    reqUserReguser,
    reqUpdateAvatar,
    reqUpdateNickname,
    reqUpdateEmail,
    reqUpdateBalance,
    reqAddShopping,
    reqShopping,
    reqShopping_panduan,
    reqDeleteShopping,
    reqPutShopping
}