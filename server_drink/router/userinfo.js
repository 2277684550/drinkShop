const express = require('express')
const router = express.Router()

// 导入路由处理模块
const userinfo_handler = require('../router_handler/userinfo')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则
const {update_avatar_schema,update_nickname_schema,update_email_schema,update_balance_schema} = require('../schema/user')

// 请求用户信息路由
router.get('/userinfo',userinfo_handler.getUserInfo)

// 更新用户头像路由，并引入验证规则，不通过验证规则，无法进入处理函数
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)
//更新用户昵称路由，并引入验证规则，不通过验证规则，无法进入处理函数
router.post('/update/nickname',expressJoi(update_nickname_schema),userinfo_handler.updateNickname)
//更新用户邮箱路由，并引入验证规则，不通过验证规则，无法进入处理函数
router.post('/update/email',expressJoi(update_email_schema),userinfo_handler.updateEmail)
//更新用户余额路由，并引入验证规则，不通过验证规则，无法进入处理函数
router.post('/update/balance',expressJoi(update_balance_schema),userinfo_handler.updateBalance)

module.exports = router