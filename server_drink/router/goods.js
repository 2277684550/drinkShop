const express = require('express')
const router = express.Router()

// 导入路由处理模块
const classify_handler = require('../router_handler/goods')
// 挂载路由
router.get('/classify',classify_handler.getClassify)

// 导入路由处理模块
const search_handler = require('../router_handler/goods')
// 挂载路由
router.get('/search',search_handler.getSearch)

module.exports = router