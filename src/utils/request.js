/**
 * Created by wx on 2018-11-06.
 */
import axios from 'axios'
import Qs from 'query-string'

const instance = axios.create({
  timeout: 10000 // 请求超时时间
  // maxRedirects: 5,
})

instance.interceptors.request.use(
  config => {
    if (config.isPlan) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = Qs.stringify({ csjson: JSON.stringify(config.data) })
    } else if (config.isFormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
      let formData = new FormData()
      for (let i in config.data) {
        formData.append(i, config.data[i])
      }
      config.data = formData
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  resp => {
    // console.log(resp)
    const res = resp.data
    if (res.code === 0) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log(error)
    if (error.message.includes('Network')) {
      error.message = '网络不给力，请稍后再试'
    } else if (typeof error.code === 'undefined') {
      error.message = '连接出错，请重试'
    }
    return Promise.reject(error)
  }
)

export default ({ url, method = 'get', params = {}, data = {}, isPlan = true, isFormData = false } = {}) => {
  // console.log(url)
  // console.log(params)
  if (!url) {
    return
  }
  if (/[A-Z]/.test(method)) {
    method = method.toLocaleLowerCase()
  }
  return new Promise((resolve, reject) => {
    instance.request({
      url,
      params,
      data,
      isPlan,
      isFormData,
      method
    }).then((res) => {
      resolve(res)
    }).catch(error => {
      // console.log(error)
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      }
      reject(error)
    })
  })
}
