import { get,post } from '@/utils/httpRequest'

export function getRoomDate(){
    return get({
        url:'/common/getRoomDate'
    })
}

export function getCarData(){
    return get({
        url:'/common/getCarData'
    })
}

export function endPark(data){
    return post({
        url:'/common/endPark',
        data
    })
}

export function insertCar(data){
    return post({
        url:'/common/insertCar',
        data
    })
}