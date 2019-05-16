const {query} = require('../db/mysql.js');

exports.updateToken = async user_id => {
    let lastTokenSQL = `select token,deadline from token where user_id="${user_id}"`;
    let lastToken = await query(lastTokenSQL);
    if(lastToken[0].deadline > new Date().getTime()){
        // 更新token
        let token = Math.random().toString().slice(-10);
        // token 30分钟内有效
        let deadline = new Date().getTime() + 1000*60*30;
        let selectTokenSQL = `insert into token (token,deadline,user_id) values("${token}","${deadline}","${user_id}") on duplicate key update token="${token}",deadline="${deadline}"`;
        await query(selectTokenSQL).then(() => {
            reslove(token);
        })
        // return true;
    } else {
        return false;
    }
}