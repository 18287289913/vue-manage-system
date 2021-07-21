import axios from 'axios'
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口
  // baseURL: process.env.BASE_API,
  baseURL: "http://localhost:3012",
  // baseURL: "/",
  // 超时时间 单位是ms
  timeout: 5000
})



// 2.请求拦截器
service.interceptors.request.use(config => {
  //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
   config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
   config.headers = {
     'Content-Type':'application/json;charset=UTF-8' //配置请求头
   }
  //  注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
   const token = localStorage.getItem("token");
   if(token){
      // config.params = {'token':token} //如果要求携带在参数中
      config.headers.token= token; //如果要求携带在请求头中
    }
  return config
}, error => {
  Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
  //接收到响应数据并成功后的一些共有的处理，关闭loading等
  
  return response
}, error => {
  return Promise.resolve(error.response)
})
//4.导出文件
export default service