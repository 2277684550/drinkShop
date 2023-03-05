// 该模块只负责处理路由之间的规则

const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要的验证规则对象
    // 因为'../schema/user' 模块是一个对象,需要用一个对象来接受，又因为我们只需要里面的reg_login_schema对象，
    // 所以需要解构赋值，用reg_login_schema来接受
const {reg_login_schema} = require('../schema/user')

//注册新用户
        // 把客户的的请求映射到处理函数中，但是这个函数如何定义，路由模块不关心，你需要去路由处理函数去查看
        //加入一个参数，调用exprossJoi中间件函数，并将对应的规则传进去
        // 如果中间件的验证成功了，那就继续执行后面的处理函数
        // 如果验证失败了，将会抛出一个全局的错误，所以需要在index.js里面去捕获这个错误
router.post('/reguser',expressJoi(reg_login_schema),user_handler.regUser) 
//登录
router.post('/login',expressJoi(reg_login_schema),user_handler.login)

module.exports = router