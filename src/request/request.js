//拦截
import axios from 'axios';

//创建一个单例
const instance = axios.create({
    baseURL: 'https://www.netdisc.cloud',
    timeout: 4000
})
//拦截器==请求拦截,所有的网络请求都会先走这个方法
instance.interceptors.request.use(config => {
    //token
    // let token = localStorage.getItem('token');
    // if(token){
    //     config.headers.token = token;
    // }
    return config;
}, err => {
    return Promise.reject(err);
});

//拦截器==响应拦截 所有的数据返回数据之后都会先执行这个方法
instance.interceptors.response.use(res => {
    return res;
}, err => {
    return Promise.reject(err);
}
);
//导出
export default instance;