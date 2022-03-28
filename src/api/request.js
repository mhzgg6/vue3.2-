import axios from "axios"
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: 'https://lianghj.top:8888/api/private/v1/',
  timeout: 5000
})
console.log(process.env.VUE_APP_BASE_API)

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  },
  (error) => {
    console.log(error.response)
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)

export default service