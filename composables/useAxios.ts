import axios from 'axios';

let getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token') ?? 'noToken'
  } else return 'noToken'
}

function createAxios() {
  let instance = axios.create({
    baseURL: "/serverapi",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken()
    }
  })

  instance.interceptors.response.use((res) => {
    return res;
  }, error => {
    if (error.status == 401) {
      useToastStore().errorToast("未登录或Token失效，请重新登录")
      navigateTo('/login')
    } else {
      console.log("请求出错了！", error)
    }
  })
  return instance;
}

let axiosInstance = createAxios();
export function refreshAxiosInstance() {
  axiosInstance = createAxios();
}
export const useAxios = () => axiosInstance;