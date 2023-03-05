// 导入数据库操作模块
const db = require('../db/index')

// 添加购物车
exports.postShopping_add = (req,res) => {
   const sql1 = `select * from shopping where userId=? and goodsId=?`
   db.query(sql1,[req.user.Id,req.body.goodsId],(err,results) => {
      console.log(results);
      if(results.length == 1){
         const sql2 = `update shopping set number=number+${req.body.number} where userId=${req.user.Id} and goodsId=${req.body.goodsId}`
         db.query(sql2,[req.user.Id,req.body.goodsId,req.body.number],(err,results) => {
            if(err) return res.cc('更新失败')
            res.cc('更新成功',0)
           })
      }else{
         const sql3 = `insert into shopping(userId,goodsId,number) values(?,?,?)`
         db.query(sql3,[req.user.Id,req.body.goodsId,req.body.number],(err,results) => {
         if(err) return res.cc('加入购物车失败')
         if(results.affectedRows !== 1) return res.cc('影响多行')
         res.cc('加入购物车成功',0)
         })
      }
   })
   
},

 // 更新购物车
exports.putShopping_update= (req,res) => {
   if(req.body.symbol == 'put'){
      const sql = `update shopping set number=${req.body.number} where userId=${req.user.Id} and goodsId=${req.body.goodsId}`    
      db.query(sql,[req.body.symbol,req.user.Id,req.body.goodsId,req.body.number],(err,results) => {
         if(err) return res.cc('更新失败')
         res.cc('更新成功',0)
        })
   }else{
      const sql = `update shopping set number=${req.body.number}${req.body.symbol}1 where userId=${req.user.Id} and goodsId=${req.body.goodsId}`
      db.query(sql,[req.body.symbol,req.user.Id,req.body.goodsId,req.body.number],(err,results) => {
         if(err) return res.cc('更新失败')
         res.cc('更新成功',0)
        })
   }
  
}


// 删除购物车
exports.deleteShopping_delete= (req,res) => {
    // 可批量删除
   //  const sql = `delete goodsId from shopping where (select * from shoppin where userId=${req.user.Id}) in `
   const sql = `delete from shopping where userId=? and goodsId=${req.body.goodsId}`
    db.query(sql,[req.user.Id,req.body.goodsId],(err,results) => {
     if(err) return res.cc('删除失败')
     res.cc('删除成功',0)
    })
 }

// 购物车数据
exports.getShopping_get = (req,res) => {
   console.log(req);
   const sql = `select a.goodsId,a.goodsName,a.price,a.shop,a.img_url,b.number from goods a,shopping b where a.goodsId=b.goodsId and b.goodsId in(select goodsId from shopping where userId=?)`
   db.query(sql,[req.user.Id],(err,results) => {
       if(err) return res.cc('获取购物车数据失败'+err)
       res.send({
           status:0,
           message:'获取购物车数据成功！',
           data:results
       })
   })
}
