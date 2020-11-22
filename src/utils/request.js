/**
 * 基于axios封装的请求模块
 */
import axios from 'axios'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://localhost:3000/'
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      window.sessionStorage.removeItem('user')
      router.push('/login')
    }
    return Promise.reject(error)
  })

// 导出请求方法
export default request
