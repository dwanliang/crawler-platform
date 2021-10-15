import axios from 'axios';//导入
const url = "http://lzy.cn/api/";
const service = axios.create({
  baseURL: url, // url = base url + 请求url
  timeout: 50000 // 请求超时时间
})

//请求拦截
service.interceptors.request.use(
  config => {//请求前
   if(localStorage.getItem('token')){
       config.headers.token = localStorage.getItem('token')//请求前把token加到请求头
    }
    return config
  },
  error => {
    return Promise.reject(error)//返回错误
  }
)
//响应拦截
service.interceptors.response.use((response) => {
  const res = response.data
  if (res.code==200) { 
    return res//返回then
  } else {
    return Promise.reject('error')//返回catch
  }
}, error => {
    return Promise.reject(error)//返回catch
  }
)
const http = {
  get(url='',params = {}){
    return new Promise((resolve,reject) =>{
      service.get(url, {params}).then((res) =>{
          resolve(res);
      }).catch((error) =>{
          reject(error);
      });
    })
  },
  post(url='',data = {}){
    return new Promise((resolve,reject) =>{
      service.post(url, data).then((res) =>{
          resolve(res);
      }).catch((error) =>{
          reject(error);
      });
    })
  }
}
export default http//导出事件