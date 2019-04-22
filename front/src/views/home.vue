<template>
    <div style="padding-top:10px">
        <div class="container">
            <div class="head">
                <img src="..\..\static\img\logo\logo.jpg" alt="北辰物流园区" class="banner">
                <img src="..\..\static\img\logo\logo1.jpg" alt="" class="banner1">
                <span class="login" @click="jump('user')"><i class="fa fa-user"></i>登录</span>
            </div>
        </div>
        <div class="container">
            <el-menu
            :default-active="activeIndex"
            class="navigation"
            mode="horizontal"
            @select="handleSelect"
            background-color="cornflowerblue"
            text-color="#ffffff"
            active-text-color="#ffffff"
            >
                <el-menu-item index="1">网站首页</el-menu-item>
                <el-menu-item index="2">商户中心</el-menu-item>
                <el-menu-item index="3">车辆中心</el-menu-item>
                <el-menu-item index="4">仓库招标</el-menu-item>
                <el-menu-item index="5">联系我们</el-menu-item>
                <el-menu-item index="6">更多功能</el-menu-item>
            </el-menu>
        </div>
        <div class="container" v-show="activeIndex==1">
            <div class="block">
                <el-carousel height="250px">
                    <el-carousel-item v-for="item in 3" :key="item">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="mid">
                <div class="news">
                    <label>园区新闻</label>
                    <ul class="newsUl">
                        <li><a href="" target="_blank">备战旺季 多方助力 ——《深度解读VAT、助力eBay、Wish、亚马逊平台运营秘笈》分享会</a></li>
                        <li><a href="" target="_blank">北辰电商产业园受邀参加2018鹰熊汇跨境电商全球峰会</a></li>
                        <li><a href="" target="_blank">提升党建质量，构建“两新”党建共同体 —— 华南城园区党委书记做客党建节目</a></li>
                        <li><a href="" target="_blank">测试消息1111111</a></li>
                        <li><a href="" target="_blank">测试消息2222222</a></li>
                        <li><a href="" target="_blank">测试消息3333333</a></li>
                    </ul>
                </div>
                <div class="news">
                    <label>园区公告</label>
                    <ul class="newsUl">
                        <li><a href="" target="_blank">双节庆来囉!!! 快来谜城选购吧, 欢迎各位的光临!</a></li>
                        <li><a href="" target="_blank">商务部：推动电商进农村 实行“农商互联”</a></li>
                        <li><a href="" target="_blank">市经贸信息委转发《商务部关于进一步推进国家电子商务示范基地建设工作的指导意见》的通知</a></li>
                        <li><a href="" target="_blank">测试消息1111111</a></li>
                        <li><a href="" target="_blank">测试消息2222222</a></li>
                        <li><a href="" target="_blank">测试消息3333333</a></li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <img src="../../static/img/home/item1.jpg" alt="测试图片" style="width: 100%;">
            </div>
        </div>
        <div class="container" v-show="activeIndex==2">
            <p style="height:400px;line-height:400px;"><i class="fa fa-check-square-o"></i>&nbsp;登录后可访问商户中心，进行更多操作</p>
        </div>
        <div class="container" v-show="activeIndex==3" style="padding-top:0;background-color: #fff;">
            <!-- <p style="height:400px;line-height:400px;"><i class="fa fa-check-square-o"></i>&nbsp;登录后可访问车辆中心，进行更多操作</p> -->
        <el-input
        class="search"
        v-model="search"
        size="medium"
        placeholder="输入车牌号搜索"/>
            <el-table
            :data="carData"
            height="500"
            border
            size="medium"
            style="width:100%;padding:0 10px">
                <el-table-column
                prop="car"
                label="车牌号码"
                width="150">
                </el-table-column>
                <el-table-column
                label="停车价格(元/小时)"
                width="150">
                <span>{{carMoney}}</span>
                </el-table-column>
                <el-table-column 
                prop="startParking"
                label="开始时间">
                </el-table-column>
                <el-table-column
                label="结束时间">
                    <template slot-scope="scope">
                        <el-date-picker v-model='parkingDate[scope.$index]' type='datetime' size='mini' placeholder='选择结束停车时间'></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="endParking(scope.row,scope.$index)">结束</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="container" v-show="activeIndex==4" style="padding-top:0">
            <el-table
                :data="roomTableData"
                height="500"
                border
                size="medium"
                style="width: 100%">
                    <el-table-column
                    prop="code"
                    label="仓库号码">
                    </el-table-column>
                    <el-table-column
                    prop="size"
                    label="仓库面积">
                    </el-table-column>
                    <el-table-column
                    prop="price1"
                    label="房租">
                    </el-table-column>
                    <el-table-column
                    prop="price2"
                    label="物业费">
                    </el-table-column>
                    <el-table-column
                    prop="price3"
                    label="水电费">
                    </el-table-column>
                    <el-table-column
                    prop="price4"
                    label="停车费">
                    </el-table-column>
                    <el-table-column
                    label="总费用">
                        <template slot-scope="scope">
                            {{Number(scope.row.price1)+Number(scope.row.price2)+Number(scope.row.price3)+Number(scope.row.price4)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="tel"
                    label="联系电话">
                    </el-table-column>
                    <el-table-column
                    prop="description"
                    label="仓库描述">
                    </el-table-column>
            </el-table>
        </div>
        <div class="container" v-show="activeIndex==5">
            <p style="height:400px;line-height:400px;">
                <i class="fa fa-phone" aria-hidden="true"></i>&nbsp;0555-22222222&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;test_mail@jerry.com
            </p>
        </div>
        <div class="container" v-show="activeIndex==6">
            <p style="height:400px;line-height:400px;">更多精彩内容敬请期待</p>
        </div>
        <div class="last">
            <div class="footer">
		    邮箱: test_mail@jerry.com 客服热线: 400-000-0000  电话:0555-22222222<br>
            copyright © 2019 www.testpark.com All Rights Reserved<br>
            <a href="" target="_blank">津ICP备00000000号-11</a><br>		
            北辰物流园区版权所有
            </div>
        </div>
    <!-- <router-view/> -->
    </div>
</template>
<script>
import {getRoomDate,getCarData,endPark} from '@/api/common'
export default {
    data(){
        return {
            activeIndex:'1',
            roomTableData:[],
            carData:[],
            tempCarData:[],
            search:'',
            carMoney:0,
            parkingDate:[]
        }
    },
    created(){
        getRoomDate().then(_ => {
            this.roomTableData = _.room;
        })
        getCarData().then(_ => {
            this.carData = _.data.car;
            this.tempCarData = _.data.car;
            this.carMoney = _.data.carMoney[0].carMoney;
        })
    },
    watch: {
        // 车牌模糊查询
        search: function(val, oldVal){
            this.carData = this.tempCarData.filter( item => (~item.car.indexOf(val.toUpperCase())));
            this.parkingDate = [];
        }
    },
    methods: {
        jump(){
            this.$router.push({path:'/login'});
        },
        handleSelect(key) {
            this.activeIndex = key;
        },
        endParking(row,index){
            if(this.parkingDate[index] == undefined){
                this.$message({
                    type:'info',
                    message:'请选择停车结束时间'
                })
                return ;
            }
            let cost = (this.parkingDate[index].getTime() - new Date(row.startParking).getTime()) / (1000*60*60) * this.carMoney;
            if(cost<=0){
                this.$message({
                    type:'info',
                    message:'结束时间选择有误'
                })
                return ;
            }
            this.$confirm(`请确认是否结束停车,停车费用：${cost.toFixed(2)}元`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                endPark(row).then(_ => {
                    this.$message({
                    type: 'success',
                    message: _.message
                    });
                    getCarData().then(_ => {
                        this.carData = _.data.car;
                        this.tempCarData = _.data.car;
                        this.carMoney = _.data.carMoney[0].carMoney;
                        this.parkingDate = [];
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
        }
    }
}
</script>
<style scoped>
.container{
    width: 1000px;
    margin: 0 auto;
    padding-top: 10px;
    min-width: 1000px;
    background-color: rgb(231, 230, 230);
}
.banner{
    float: left;
}
.banner1{
    float: left;
    width: 154px;
    margin-top: 18px;
    margin-left: 160px;
}
.head{
    width: 100%;
    height: 90px;
    overflow: hidden;
    position: relative;
}
.login{
    cursor: pointer;
    position: absolute;
    right: 10px;
    color: cornflowerblue;
}
.admin{
    cursor: pointer;
    color: cornflowerblue;
}
.navigation , .navigation>li{
    height: 50px;
}
.block{
    width: 1000px;
    margin: 0 auto;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
.el-carousel__item:nth-child(3) {
    background-image: url(..\..\static\img\home\banner-1.jpg);
    background-size: cover;
    background-position: center;
}
.el-carousel__item:nth-child(4) {
    background-image: url(..\..\static\img\home\banner-2.jpg);
    background-size: cover;
    background-position: center;
}
.el-carousel__item:nth-child(5) {
    background-image: url(..\..\static\img\home\banner-3.jpg);
    background-size: cover;
    background-position: center;
}
.mid{
    display: flex;
    padding: 20px;
}
.news{
    flex-basis: 50%;
    margin: 10px;
    border: 1px solid lightsteelblue;
    border-radius: 5px;
    padding: 10px;
}
.news >label{
    float: left;
    font-size: 20px;
    font-weight: 600;
}
.newsUl {
    margin-top: 2em;
    padding: 0;
}
.newsUl li{
    max-width: 420px;
    list-style-type: none;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 20px;
}
.last{
    padding-top: 50px;
}
.footer{
    font-size: 12px;
    line-height: 22px;
}
.last a{
    color: #2c3e50;
    text-decoration: none;
}
.bottom {
    padding-bottom: 20px;
}
.bottom::after{
    content: '点击显示更多内容';
    cursor: pointer;
    text-decoration: underline;
}
.search{
    padding: 10px;
    width: 200px;
    box-sizing: border-box;
    display: inline-block;
    transform: translate(-400px);
}
</style>
