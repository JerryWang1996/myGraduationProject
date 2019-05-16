import { post,get } from '@/utils/httpRequest'
import md5 from 'js-md5'

export function register(param){
    let data={
        name: param.name,
        pass: md5(param.pass),
        tel: param.tel,
        car: param.car,
        valid: param.valid
    }
    return post({
        url: '/user/register',
        data
    })
}

export function getValid(tel){
    let data={
        tel
    }
    return post({
        url: '/user/getValid',
        data
    })
}