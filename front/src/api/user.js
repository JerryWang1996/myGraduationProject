import { get,post } from '@/utils/httpRequest'

export function getData(name) {
    let data = {
        userName: name
    }
    return post({
        url: '/user/getData',
        data
    })
}

export function bidRoom(data){
    return post({
        url: '/user/bidRoom',
        data
    })
}

export function bidInvalid(){
    return get({
        url: '/user/bidInvalid'
    })
}

export function rentRoom(data){
    return post({
        url: '/user/rentRoom',
        data
    })
}