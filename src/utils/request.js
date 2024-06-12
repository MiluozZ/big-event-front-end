//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

import {useTokenStore} from "@/store/token.js";
import router from "../router";
//添加请求拦截器
instance.interceptors.request.use(config => {
    const tokenStore = useTokenStore();
    if(tokenStore.token) {
        config.headers.Authorization = tokenStore.token
    }
    return config
},(err)=> {
    return Promise.reject(err);
})
//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        if (result.data.code === 0) {
            return result.data;
        }
        alert(result.data.message || '服务异常，请联系管理员');
        return Promise.resolve(result.data);
    },
    err=>{
        if (err.response && err.response.status === 401) {
            alert("请先登陆");
            router.push('/login');
        } else {
            alert('服务异常');
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;