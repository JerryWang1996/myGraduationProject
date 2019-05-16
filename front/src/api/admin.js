import { post,get } from '@/utils/httpRequest'
import {checkToken} from '@/api/checkToken'

export function change(data){
    return post({
        url:'/admin/change',
        data
    })
}

export function newWarehouse(data){
    return post({
        url:'/admin/newWarehouse',
        data
    })
}

export function adminInitialization(){
    return get({
        url:'/admin/adminInitialization'
    })
}

export function deleteRoom(code){
    return post({
        url:'/admin/deleteRoom',
        data:{code}
    })
}

export function rentToHim(user,code){
    return post({
        url: '/admin/rentToHim',
        data:{user,code}
    })
}