import { get } from '@/utils/httpRequest'

export function getInfo(){
    return get({
        url: '/checkToken/getInfo'
    })
}