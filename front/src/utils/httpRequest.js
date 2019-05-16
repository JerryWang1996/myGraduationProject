import axios from 'axios'
import { Message, Notification } from 'element-ui'
import { getToken, setToken } from '@/utils/auth'
import qs from 'qs'

// create an axios instance
const service = axios.create({
    baseURL: `http://${location.hostname}:3000`, // api 的 base_url
    timeout: 15000, // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // 让每个请求携带[Park-Token]
        if (getToken()) {
            config.headers['token'] = getToken();
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
        if(!response.data){
            Message({
                message: '系统出错',
                type: 'error',
                duration: 2000
            })
            return
        }
        if(response.data.token != undefined){
            setToken(response.data.token);
        }
        let msg = response.data.msg;
        if(msg != undefined && msg != null && msg.length>0){
            Notification({
                title: '提示',
                message:msg,
                duration:2000,
                type: 'info'
            });
        }
        return response;
    }
)

export function post({ url, data = {} }) {
    return new Promise((resolve, reject) => {
        service.post(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

export function get({ url, data = {} }) {
    return new Promise((resolve, reject) => {
        service.get(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}


