import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })
  //2、拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {
    //console.log(err)
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })

  // 3、发送请求
  return instance(config)
}


// 没有封装实例的时候发送请求
// 不带参数
//axios({
//  url:'http://152.136.185.210:7878/api/hy66',
//  method: 'get'
//}).then(result=>{
//  console.log(result);
//})

// 携带参数
//axios({
//  url:'http://152.136.185.210:7878/api/hy66',
//  method: 'get',
//  params: {
//    type: 'sell',
//    page: 1
//  }
//}).then(result=>{
//  console.log(result);
//})