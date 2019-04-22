import router from '@/router/index'
import { getToken, removeToken } from '@/utils/auth'
import {checkToken} from '@/api/checkToken'

// 不重定向白名单
const whiteList = ['/', '/login', '/register', '/404'];
const userList = ['/main'];
const adminList = ['/admin'];

router.beforeEach((to, from, next) => {
    if (whiteList.includes(to.path)){
        next();
    } else if(getToken() && getToken() != undefined){
        checkToken().then(res =>{
            if(res.role==='user'){
                if(userList.includes(to.path)){
                    next();
                } else {
                    removeToken();
                    next({
                        path: '/login'
                    })
                }
            }else if(res.role==='admin'){
                if(adminList.includes(to.path)){
                    next();
                } else{
                    removeToken();
                    next({
                        path: '/login'
                    })
                }
            }else {
                removeToken();
                next({
                    path: '/login'
                })
            }
        })
    }else if(userList.includes(to.path) || adminList.includes(to.path)){
        next({
            path: '/login'
        })
    } else{
        // 处理不存在路由
        next({
            path: '/404'
        })
    } 
})