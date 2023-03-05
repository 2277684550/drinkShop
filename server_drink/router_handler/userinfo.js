// 导入数据库操作模块
const db = require('../db/index')

// 获取用户信息
exports.getUserInfo = (req,res) => {
    // 定义 SQL 语句
        // where id=? 是查询id为（你要查询的那一行的数据的id）
    const sql = `select username,nickname,email,user_pic,balance from ev_users where id=?`
    // 调用 db.query() 执行 SQL 语句
        // 因为数据库的属性的Id，首字母是大写的，登陆时储存在token里面，现在们以token的 Id值为索引获取对应的值
        db.query(sql,[req.user.Id],(err,results) => {
        if(err) return res.cc(err)
        //执行 SQL 语句成功，但是查询结果可能为空
        if(results.length !==1 ) return res.cc('获取用户信息失败'+results.length+req.body.Id)
        res.send({
            status:0,
            message:'获取用户信息成功！',
            data:results[0]
        })
    })
}

// 更新用户头像
exports.updateAvatar = (req,res) => {
    // 通过Id来进行定位更改信息
   const sql = `update ev_users set user_pic=? where id=?`
   db.query(sql,[req.body.avatar,req.user.Id],(err,results) => {
    if(err) return res.cc('更换头像失败')
    if(results.affectedRows !== 1) return res.cc('影响多行')
    res.cc('更换头像成功',0)
   })
}

//  更新用户昵称
exports.updateNickname = (req,res) => {
     // 通过Id来进行定位更改信息
    const sql = `update ev_users set nickname=? where id=?`
    db.query(sql,[req.body.nickname,req.body.Id],(err,results) => {
     if(err) return res.cc('更新昵称失败'+req.body.nickname+req.body.Id)
     if(results.affectedRows !== 1) return res.cc('影响多行')
     res.cc('更新昵称成功',0)
    })
 }
//   更新用户邮箱
exports.updateEmail = (req,res) => {
     // 通过Id来进行定位更改信息
     const sql =  `update ev_users set email=? where Id=?`
    db.query(sql,[req.body.email,req.body.Id],(err,results) => {
     if(err) return res.cc('更新用邮箱失败'+err)
     if(results.affectedRows !== 1) return res.cc('影响多行')
     res.cc('更新邮箱成功',0)
    })
 }

 //  更新用户余额
exports.updateBalance = (req,res) => {
     // 通过Id来进行定位更改信息
    const sql = `update ev_users set balance=balance+?  where id=?`
    db.query(sql,[req.body.balance,req.body.Id],(err,results) => {
     if(err) return res.cc('充值失败'+req.body.balance+req.body.Id)
     if(results.affectedRows !== 1) return res.cc('影响多行')
     res.cc('充值成功',0)
    })
 }
 
