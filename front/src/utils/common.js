import moment from 'moment'

export const comValidate = new function() {
	var dataType = {
		// 手机号
        phone : /^1(3|4|5|7|8)\d{9}$/,
        //用户名：数字或字母6-16位
        name: /^[\w]{6,16}$/,
        //密码：数字或字母6-16位
        password: /^[\w]{6,16}$/
	};
	return {
		/**
		 * 手机号码验证
		 * 
		 * @param val
		 */
		validatePhone : function(val) {
			return dataType.phone.test(val);
        },
        /**
         * 用户名验证
         * 
         */
        validateName : function(val) {
            return dataType.name.test(val);
        },
        /**
         * 密码验证
         * 
         */
        validatePassword : function(val) {
            return dataType.password.test(val);
        },
		/**
		 * 是否为空校验
		 * 
		 * @param obj
		 */
		isEmpty : function(obj) {
			if (undefined === obj || null === obj || "" === obj) {
				return true;
			}
			return false;
		},
	}
};
/**
 * 日期处理
 */
export const dateMoment=moment;
export function dateUtil(val,format){
    if(isNull(val)){
        return "";
    }
    return dateMoment(val).format(format)
}
/**
 * 防抖方法
 */
export function debounce(fn,delay){
    let timer = null;
    return function() {
        if(timer){
        clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay)
    }
}

/**
 * 节流方法
 */
export function throttle(fn,delay){
    let valid = true
    return function() {
        if(!valid){
            return false 
        }
        valid = false;
        setTimeout(() => {
            fn();
            valid = true;
        }, delay)
    }
}