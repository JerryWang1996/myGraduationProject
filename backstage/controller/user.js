const {query} = require('../db/mysql.js');

exports.register = async ctx =>{
    let data = ctx.request.body;
    let selectUserSQL = `select tel from user where tel="${data.tel}"`;
    let selectUser = await query(selectUserSQL);
    if(selectUser.length){
        ctx.body = {
            msg:'手机号已注册'
        }
        return ;
    }
    let selectNameSQL = `select name from user where name="${data.name}"`;
    let selectName = await query(selectNameSQL);
    if(selectName.length){
        ctx.body = {
            msg:'用户名已被使用'
        }
        return ;
    }
    let selectValidSQL = `select valid,deadline from valid where tel="${data.tel}"`;
    let valid = await query(selectValidSQL);
    if(valid[0].valid === data.valid && valid[0].deadline > new Date().getTime()){
        let registerSQL = `insert into user (name,password,tel,car) values ("${data.name}","${data.pass}","${data.tel}","${data.car}")`;
        await query(registerSQL).then(res => {
            ctx.body = {
                msg:'创建成功'
            }
        });
    } else{
        ctx.body = {
            msg:'创建失败,验证码失效'
        }
    }
}

exports.getValid = async ctx =>{
    let data = ctx.request.body;
    let valid = Math.random().toString().slice(-6);
    let deadlineSQL = `select validDeadline from admin where name="superadmin"`;
    let deadline = await query(deadlineSQL);
    // let validSQL = `insert into valid (tel,valid,deadline) values ("${data.tel}","${valid}","${new Date().getTime()+1000*deadline}")`;
    let validSQL = `insert into valid (tel,valid,deadline) values("${data.tel}","${valid}","${new Date().getTime()+1000*deadline[0].validDeadline}") on duplicate key update valid="${valid}",deadline="${new Date().getTime()+1000*deadline[0].validDeadline}"`;
    await query(validSQL).then(res => {
        ctx.body = {
            msg:'获取验证码成功'
        }
    }).catch(err => {
        ctx.body={
            msg:'获取验证码失败'
        }
    })
}

exports.login = async ctx => {
    let data = ctx.request.body;
    let selectSQL = `select password,id from user where name="${data.name}"`;
    let select = await query(selectSQL);
    if(!!select.length && select[0].password===data.password){
        // 创建token
        let token = Math.random().toString().slice(-10);
        let deadline = new Date().getTime() + 1000*60*30;
        let selectTokenSQL = `insert into token (token,deadline,user_id) values("${token}","${deadline}","${select[0].id}") on duplicate key update token="${token}",deadline="${deadline}"`;
        await query(selectTokenSQL).then(res => {
            ctx.body = {
                msg:'登录成功',
                token
            }
        })
    } else {
        ctx.body = {
            msg:'登录失败,密码错误'
        }
    }
}

exports.getData = async ctx =>{
    let userName = ctx.request.body.userName;
    // let dataSQL = `select * from cost where userName="${userName}"`;
    let dataSQL = `select * from room where isUse="1" and user="${userName}"`;
    let data = await query(dataSQL);
    ctx.body = {
        data
    }
}

exports.bidRoom = async ctx => {
    let data = ctx.request.body;
    let bidRoomSQL = `update room set user=concat(user,' ${data.user}') where code=${data.code}`;
    await query(bidRoomSQL).then(res => {
        ctx.body = {
            msg:'竞标成功'
        }
    }).catch(err => {
        ctx.body = {
            msg:'竞价失败'
        }
    })
}

exports.bidInvalid = async ctx => {
    let bidInvalidSQL = `update room set isUse=0,user='',rentStartTime='',rentEndTime='',assignTime='' where (rentStartTime != '' AND rentEndTime < unix_timestamp(now())*1000) or (assignTime < unix_timestamp(now())*1000-259200000 AND assignTime != '' AND rentStartTime = '')`;
    await query(bidInvalidSQL).then(res => {
        ctx.body = {
            message:'更改成功'
        }
    })
}

exports.rentRoom = async ctx => {
    let data = ctx.request.body;
    // let rentRoomSQL = `update room set rentEndTime=(case when rentStartTime='' then unix_timestamp(now())*1000 else rentStartTime+1000 end) where code='002'; `;
    let rentRoomSQL = `update room set rentStartTime = '${new Date().getTime()}' where rentStartTime='' and code='${data.code}'`;
    await query(rentRoomSQL);
    // let rentRoomSQL2 = `update room set rentEndTime=rentStartTime+1000*60*60*24*30*${data.month} where code='${data.code}'`;
    let rentRoomSQL2 = `update room set rentEndTime=(case when rentEndTime='' then rentStartTime+1000*60*60*24*30*${data.month} else rentEndTime+1000*60*60*24*30*${data.month} end) where code='${data.code}'`;
    await query(rentRoomSQL2).then(res => {
        ctx.body = {
            msg:'租赁成功'
        }
    })
}