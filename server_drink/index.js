// 1.引入express框架
let express = require('express')
// 2.用express实例化一个app对象
let app = express()
// 7.1 导入验证规则包
const joi = require('joi')
// 3.允许跨域
const cors = require('cors')
app.use(cors()) 

// 4.1 导入解析前端传入进来的值的包
var bodyParser = require('body-parser');

// // 4.2 解析 application/json
// app.use(bodyParser.json());
// // 4.3 解析 url编码
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false, limit: '600mb'})) 
app.use(bodyParser.json({limit: '600mb'}))

// 4.4 配置表单数据的中间件，注意：这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended:false}))



// 5.在全局定义中间件
// 一定要在路由之前，封装 res.cc 函数
app.use((req,res,next) => {
    // status 默认值为1 表示失败的情况
    // err的值可能是一个错误对象，也可能时一个错误的描述字符串
    res.cc = function (err,status = 1){
        res.send({
            status,
            // 三元表达式，如果调用了 ERR 错误返回函数，那么就返回错误对象，否则就是没有调用错误函数，说明传入的是一个错误字符串
            message:err instanceof Error ? err.message :err
        })
    }
    // express 中间件函数。调用next() 基本上会转移到下一个中​​间件函数
    next()
})

// 8.1 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

// 8.2 调用app.use()注册全局的中间件
    // 注册解析 Token 的中间件，传入要解析的密钥，unless是排除哪些接口不需要身份认证
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api|\/goods/]}))

// 6.1.1导入并使用用户的路由模块
const userRouter = require('./router/user')
// 6.1.2每次访问路由模块的每一个路由的时候都必须在地址前面加上一个api
app.use('/api',userRouter)

// 6.2.1导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
// 6.2.2每次访问路由模块的每一个路由的时候都必须在地址前面加上一个my
app.use('/my',userinfoRouter)

// 6.3.1导入并使用查询所有商品的路由模块
const goodsRouter = require('./router/goods')
// 6.3.2每次访问路由模块的每一个路由的时候都必须在地址前面加上一个goods
app.use('/goods',goodsRouter)

// 6.5.1导入并使用购物车的路由模块
const shoppingRouter = require('./router/shopping')
// 6.5.2每次访问路由模块的每一个路由的时候都必须在地址前面加上一个shopping
app.use('/shopping',shoppingRouter)

// 7.2 定义错误级别的中间件
app.use((err,req,res,next) => {
    //验证失败导致的错误
    if(err instanceof joi.ValidationError)return res.cc(err)
    // token 验证出现问题 身份验证失败后的错误
    // if(err.name === 'UnauthorizedError') return res.cc('身份验证失败')
    //未知的错误
    res.cc(err)
})

// 7.监听刚才写的3000端口，并回调输出地址
app.listen(3000,() => {
    console.log('http://127.0.0.1:3001');
})