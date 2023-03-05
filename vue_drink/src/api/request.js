// 对axios进行二次封装
import axios  from "axios";

// 引入进度条组件
import Nprogress from 'nprogress'
// start:进度条开始  done:进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css'


// 1.利用axios对象的方法create，去创建一个axios实例
let requests = axios.create({
    // 配置对象
    // 基础路径，发请求时，路径中会追加api字符
    baseURL:"http://127.0.0.1:3000",
    // 代表请求超时的时间5s
    timeout:5000
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，header请求头
    // 进度条开始
    config.headers.Authorization = window.sessionStorage.getItem('token')
    Nprogress.start()
    return config
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数，服务器响应数据以后，响应拦截器可以检测到，可以做一些事情
    // 进度条结束
    Nprogress.done()
   return res.data
},error => {
    return Promise.reject(new Error('faile'))
})

// 对外暴露二次封装的axios，也就是requests
export default requests