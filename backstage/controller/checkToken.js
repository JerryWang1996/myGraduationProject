const {query} = require('../db/mysql.js');

exports.check = async ctx =>{
    let token = ctx.request.header.token;
    let tokenSQL = `select deadline,user_id from token where token=${token}`;
    let check = await query(tokenSQL);
    if(!check.length){
        ctx.body = {
            msg:'身份验证出错，请重新登录'
        }
    } else {
        let lastTokenSQL = `select token,deadline from token where user_id="${check[0].user_id}"`;
        let lastToken = await query(lastTokenSQL);
        if(lastToken[0].deadline > new Date().getTime()){
            // 更新token
            let token = Math.random().toString().slice(-10);
            // token 30分钟内有效
            let deadline = new Date().getTime() + 1000*60*30;
            let selectTokenSQL = `update token set token="${token}",deadline="${deadline}" where user_id="${check[0].user_id}"`;
            await query(selectTokenSQL).then(res => {
                ctx.body = {
                    role: check[0].user_id<10?'admin':'user',
                    token
                }
            })
        } else{
            ctx.body = {
                msg:'登录过期'
            }
        }
    }
}

exports.getInfo = async ctx =>{
    let token = ctx.request.header.token;
    let nameSQL = `(select distinct name from token inner join user on user.id=(select user_id from token where token.token="${token}")) union (select distinct name from token inner join admin on admin.id=(select user_id from token where token.token="${token}"))`;
    let name = await query(nameSQL);
    if(name.length){
        ctx.body = {
            name:name[0].name
        }
    }
}