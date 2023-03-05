//引入mysql模块
let mysql = require("mysql")

// 连接数据库 mysql.createConnection方法是连接数据库，把它实例化，里面需要传入一些参数
let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'hardware'
})
// mysql.createConnection 有一个connect方法，用来连接数据库
db.connect((err) => {
    if(err){
        console.log('连接失败：'+err.stack);
    }
    console.log("连接成功");
})

module.exports = db