const db = require('../db/index')

// 查询所有商品及分类
exports.getClassify = (req,res) => {
    const sql = `select oneId,oneName,twoId,twoClassifyId,twoName,swiperImg_url from goods where twoClassifyId`
    db.query(sql,(err,results) => {
        if(err) return res.cc('获取分类信息失败')
        res.send({
            status:0,
            message:'获取分类信息成功！',
            data:results
        })
    })
}

// 查询有条件的商品
exports.getSearch = (req,res) => {
    // 定义 SQL 语句

         // where id=? 是查询id为（你要查询的那一行的数据的id）
         const sql = "select goodsId,goodsName,price,shop,month_sales,img_url from goods where locate(?,goodsName) or goodsId=? or threeId=? or threeId=(select twoClassifyId from goods where twoId=?)"
         // 调用 db.query() 执行 SQL 语句   
         db.query(sql,[req.query.goodsName,req.query.goodsId,req.query.twoId,req.query.oneId],(err,results) => {
             if(err) return res.cc(err) 
             //执行 SQL 语句成功，但是查询结果可能为空
             if(err) return res.cc('获取商品信息信息失败')
             res.send({
                 status:0,
                 message:'查询商品信息成功！',
                 data:results
             })
         })
 }