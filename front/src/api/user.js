import { post } from '@/utils/httpRequest'


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