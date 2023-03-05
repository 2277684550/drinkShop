// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
// string() 值必须是字符串
// alphanum() 值只能是包含 a-zA-Z0-9 的字符串
// min(length) 最小长度
// max(length) 最大长度
// required() 值是必须项，不能为 undefined
// pattern(正则表达式) 值必须符合正则表达式的规则
// dataUri() 值必须是bsae64 格式字符串（转成bsae64 格式的图片），如
//                                         data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAVjAAAAAA==
// email() 值必须为邮箱
// number() 值必须为数字
// integer() 值必须为整数

// 定义验证 username 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 定义验证 password 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义验证 avatar 头像的验证规则
const avatar = joi.string().dataUri().required()
// 定义验证 nickname 昵称的验证规则
const nickname = joi.string().required()
// 定义验证 email 邮箱的验证规则
const email = joi.string().email().required()
// 定义验证 balance 余额的验证规则
const balance = joi.number().integer().min(1).required()
// 定义验证 goodsId 的验证规则
const goodsId = joi.required()
// 定义验证 number 数量的验证规则
const number = joi.number().integer().min(1).required()
// 定义验证 userId 的验证规则
const Id = joi.number().integer().min(1).required()
const userId = joi.number().integer().min(1).required()
const symbol = joi.string().required()
// 定义验证规则和登录表单数据的规则对象
exports.reg_login_schema = {
    // 因为我们的表单数据都在req的body里面存着，所以我们就验证body里面的数据
    // 所以我们定义一个body属性，指向这个body对象，里面包含了这两条验证规则
    body:{
        username,
        password,
    }
}

// 验证规则对象 --更新用户头像
exports.update_avatar_schema = {
    body:{
        avatar,
        Id
    }
}

// 验证规则对象 --更新用户昵称
exports.update_nickname_schema = {
    body:{
        nickname,
        Id
    }
}

// 验证规则对象 --更新用户邮箱
exports.update_email_schema = {
    body:{
        email,
        Id
    }
}

// 验证规则对象 --更新用户余额
exports.update_balance_schema = {
    body:{
       balance,
       Id
    }
}
// 验证规则对象 --更新购物车产品数量
exports.update_number_schema = {
    body:{
        // 其实goodsId可以不需要验证，但是它被包含在body里面，如果不验证，这条数据无法通过，就会检测不到该数据
        goodsId,
        number,
        symbol     
    }
}