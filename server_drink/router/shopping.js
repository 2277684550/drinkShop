const express = require('express')
const router = express.Router()

// 导入路由处理模块
const shopping_handler = require('../router_handler/shopping')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则
const {update_number_schema} = require('../schema/user')

// 挂载路由
//添加购物车
router.post('/add',shopping_handler.postShopping_add);
//更新购物车某一产品数量
router.put('/update',expressJoi(update_number_schema),shopping_handler.putShopping_update);
//删除购物车某一产品
router.delete('/delete',shopping_handler.deleteShopping_delete);
//获取购物车数据
router.get('/get',shopping_handler.getShopping_get);

module.exports = router