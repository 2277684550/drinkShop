//该模块只负责路由的处理函数
// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcrypt.js 包,用来加密密码
const bcrypt = require('bcryptjs')
//导入生成token包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')
const { jwtSecretKey } = require('../config')
// 注册新用户的处理函数
exports.regUser = (req,res) => {
    // 1.获取客户端提交的表单数据
    const userinfo = req.body
    console.log(req);
    // 2.对表单的数据进行合法的判断
    // if(!userinfo.username || !userinfo.password){
    //     return res.send({ status:1 ,message: '用户名或密码不合法'})
    // }
    // 3.检测用户名是否被占用
        // 3.1 定义 SQL 语句，查询用户名是否被占用
        const salStr = 'select * from ev_users where username=?' //查询ev_users 表中的username是否有该数据，如果有，则返回一个数组
        // 3.2 调用数据库函数
    
        db.query(salStr,userinfo.username,(err,result) => {
            // 3.2.1 查询失败操作
            if(err){
                // 如果失败，则返回一个失败数据，状态为1则失败，为0则成功
                // return res.send({status:1,message:err.message})
                return res.cc(err)
            }
            // 3.2.2 查询成功操作
            // 判断用户名是否被占用，因为查询结果是一个数组，如果数组不为空，那么长度就不为0，说明查询到了数据，证明数据库里面有该用户名
            if(result.length > 0){
                // return res.send({ status: 1, message:'用户名被占用，请更换其他用户名'})
                return res.cc('用户名被占用，请更换其他用户名')
            }
            // 3.2.3 如果用户名可以使用，那么就加密密码
            // 调用 bcrypt.hasnSync() 对密码进行加密
            userinfo.password = bcrypt.hashSync(userinfo.password,10)
            // 3.2.4 定义插入新用户的 SQL 语句 ,通过set 快速插入一个新用户，? 为占位符
            const sql = 'insert into ev_users set ?'
            // 3.2.5 调用 db.query() 执行 SQL 语句
            db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results) => {
                // 判断 SQL 语句是否执行成功
                // if(err) return res.send({ status: 1, message: err.message})
                if(err) return res.cc(err)
                // 判断影响函数是否为 1，也就是判断是否只影响了数据库的一行数据，因为插入新用户也就是插入一行，所以只影响了一行，
                // 如果不为 1，则说明插入出了问题
                // if(results.affectedRows !== 1) return res.send({ status: 1, message:'注册用户失败，请稍后重试'})
                if(results.affectedRows !== 1) return res.cc('注册用户失败，请稍后重试')
                // 注册用户成功
                // res.send({status:0,message:'注册成功 '})
                res.cc('注册成功',0)
            })
       
        })
}

// 登录的处理函数
exports.login = (req,res) => {
    // 接收表单数据
    const userInfo = req.body
    // 定义 SQL 语句
    const sql = `select * from ev_users where username=?`
    // 执行 SQL 语句，根据用户名查询用户信息
    db.query(sql,userInfo.username,(err,results) => {
        // 执行 SQL 语句失败
        if(err)return res.cc(err)
        // 执行 SQL 语句成功，但是获取到的数据条数不等于1，也就是不等于1，
            // result获取到的数据是一个数组，因为我们只查询到了一行数据，放在了数组的 0 索引处，数组的长度为 1
            // 所以如果数组的长度不为 1，那么数组就为空，说明没有查询到用户
        if(results.length !== 1) return res.cc('该用户不存在')      
        // 判断密码是否正确
        // bcrypt.compareSync第一个参数为用户提交的密码，第二个参数为数据库的密码，如果相符，就返回true，否则false
        const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
        // 如果compareResult 为false，就说明密码不对
        if(!compareResult) return res.cc('密码错误')
        // 在服务器端生成 Token字符串
            // 由于密码过于敏感不能携带在token中，头像太大，也不宜放在token中，所以需要剔除
            // 用es6的运算展开符，展开这个数组，并将password与user_pic:的值都赋空
        const user = {...results[0],password:'',user_pic:''}
        // 对用户的信息进行加密，生成 Token 字符串
            // jwt.sign为taoken包的方法
            // 第一个参数为要加密的对象，第二个参数为加密的时候需要用到密钥值，第三个参数为token的有效期
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{ expiresIn: config.expiresIn }) 
        // 调用 res.send 方法将 Token 响应给客户
        res.send({
            userId:results[0].Id,
            status:0,   
            message:'登陆成功',
            token: 'Bearer ' + tokenStr, //'Bearer ' 是客户端需要的，这里写上方便客户端使用，记得Bearer后面有个空格，不要漏了
        })
    })

}