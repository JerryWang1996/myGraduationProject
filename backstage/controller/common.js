const {query} = require('../db/mysql.js');

exports.getRoomDate = async ctx => {
    let selectSQL = `select code,size,price1,price2,price3,price4,tel,description,user from room where isUse="0"`;
    let select = await query(selectSQL);
    ctx.body = {
        room:select
    }
}

exports.getCarData = async ctx => {
    let carSQL = `select car,startParking from parking where end is null or end=''`;
    let car = await query(carSQL);
    let carMoneySQL = `select carMoney from admin where name="superadmin"`
    let carMoney = await query(carMoneySQL);
    ctx.body = {
        data:{car,carMoney}
    }
}

exports.endPark = async ctx => {
    let data = ctx.request.body;
    let endParkSQL = `update parking set end='1' where car="${data.car}" and  startParking="${data.startParking}"`;
    await query(endParkSQL).then(_ => {
        ctx.body = {
            message:'操作成功'
        }
    })
}

exports.insertCar = async ctx => {
    let data = ctx.request.body;
    let date = new Date();
    let time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDate()+1) + ' ' + date.getHours() +':00';
    let insertSQL = `insert into parking (car,startParking) values('${data.num}','${time}')`;
    await query(insertSQL).then(_ => {
        ctx.body = {
            message:'操作成功'
        }
    })
}