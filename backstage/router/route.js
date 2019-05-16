const router = require('koa-router')();

const user = require('../controller/user.js')
const admin = require('../controller/admin.js')
const checkToken = require('../controller/checkToken.js')
const common = require('../controller/common.js')

// 用户操作
router.post('/user/login',user.login)
router.post('/user/register',user.register)
router.post('/user/getValid',user.getValid)
router.post('/user/getData',user.getData)
router.post('/user/bidRoom',user.bidRoom)
router.get('/user/bidInvalid',user.bidInvalid)
router.post('/user/rentRoom',user.rentRoom)

// 管理员操作
router.post('/admin/login',admin.login)
router.post('/admin/change',admin.change)
router.post('/admin/newWarehouse',admin.newWarehouse)
router.get('/admin/adminInitialization',admin.adminInitialization)
router.post('/admin/deleteRoom',admin.deleteRoom)
router.post('/admin/rentToHim',admin.rentToHim)

// 验证token
router.get('/checkToken/check',checkToken.check)

// 获取用户信息
router.get('/checkToken/getInfo',checkToken.getInfo)

// 主页操作
router.get('/common/getRoomDate',common.getRoomDate)
router.get('/common/getCarData',common.getCarData)
router.post('/common/endPark',common.endPark)
router.post('/common/insertCar',common.insertCar)


module.exports = router