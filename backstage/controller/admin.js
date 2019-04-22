const {query} = require('../db/mysql.js');

exports.login = async ctx => {
    let data = ctx.request.body;
    let selectSQL = `select password,id from admin where name="${data.name}"`;
    let select = await query(selectSQL);
    if(!!select.length && select[0].password===data.password){
        // 创建token
        let token = Math.random().toString().slice(-10);
        let deadline = new Date().getTime() + 1000*60*30;
        let selcetTokenSQL = `insert into token (token,deadline,user_id) values("${token}","${deadline}","${select[0].id}") on duplicate key update token="${token}",deadline="${deadline}"`;
        await query(selcetTokenSQL).then(res => {
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

exports.change = async ctx =>{
    let data = ctx.request.body;
    let changeSQL = `update admin set carMoney="${data.carMoney}",validDeadline="${data.validDeadline}" where name="superadmin"`;
    let change = await query(changeSQL);
    if(!!change.changedRows){
        ctx.body = {
            msg:'修改成功'
        }
    }else {
        ctx.body = {
            msg:'修改失败'
        }
    }
}

exports.newWarehouse = async ctx =>{
    let data = ctx.request.body;
    let newWarehouseSQL = `insert into room (code,size,price1,price2,price3,price4,tel,description,isUse,user) values("${data.code}","${data.size}","${data.price1}","${data.price2}","${data.price3}","${data.price4}","${data.tel}","${data.description}","0","") on duplicate key update size="${data.size}",price1="${data.price1}",price2="${data.price2}",price3="${data.price3}",price4="${data.price4}",tel="${data.tel}",description="${data.description}",isUse="0",user=""`;
    await query(newWarehouseSQL).then(res => {
        ctx.body = {
            msg:'新增或修改仓库成功'
        }
    }).catch(res => {
        ctx.body = {
            msg:'新增仓库失败'
        }
    })
}

exports.adminInitialization = async ctx =>{
    let selectSQL = `select code,size,price1,price2,price3,price4,tel,description,user from room where isUse="0"`;
    let select = await query(selectSQL);
    let selectSQL2 = `select carMoney,validDeadline from admin where name='superadmin'`;
    let select2 = await query(selectSQL2);
    ctx.body = {
        room:select,
        setting:select2
    }
}

exports.deleteRoom = async ctx => {
    let code = ctx.request.body.code;
    let deleteRoomSQL = `delete from room where code="${code}"`;
    await query(deleteRoomSQL).then(_ => {
        ctx.body = {
            msg:'删除成功'
        }
    }).catch(_ => {
        ctx.body = {
            msg:'删除失败'
        }
    })
}

exports.rentToHim = async ctx => {
    let data = ctx.request.body;
    let rentSQL = `update room set isUse="1",user="${data.user}" where code="${data.code}"`;
    await query(rentSQL).then(_ => {
        ctx.body = {
            msg:'操作成功'
        }
    })
}