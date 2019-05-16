import { post } from '@/utils/httpRequest'
import md5 from 'js-md5'

export function userLogin(param) {
    let data = {
        name: param.name,
        password: md5(param.password)
    }
    return post({
        url: '/user/login',
        data
    })
}

export function adminLogin(param) {
    let data = {
        name: param.name,
        password: md5(param.password)
    }
    return post({
        url: '/admin/login',
        data
    })
}