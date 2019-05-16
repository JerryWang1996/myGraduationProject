import { get } from '@/utils/httpRequest'

export function checkToken(){
    return get({
        url: '/checkToken/check'
    })
}