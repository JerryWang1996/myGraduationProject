<template>
<div class="main">
    <div class="head">
        <p><i class="fa fa-user" aria-hidden="true"></i>&nbsp;用户中心</p>
        <div class="info">
            <el-dropdown>
                <span class="el-dropdown-link title">
                    <i class="fa fa-bell-o"></i>&nbsp;{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="jump()"><i class="fa fa-sign-out list"></i>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
    <el-row class="tac">
        <el-menu
            class="el-menu-vertical-demo"
            @select="handleSelect"
        >
            <el-menu-item index="1">
            <i class="el-icon-goods"></i>
            <span slot="title">仓库信息</span>
            </el-menu-item>
            <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">日常缴费</span>
            </el-menu-item>
            <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">账户管理</span>
            </el-menu-item>
            <el-menu-item index="4">
            <i class="el-icon-circle-plus"></i>
            <span slot="title">更多功能</span>
            </el-menu-item>
        </el-menu>
    </el-row>
    <div v-show="!this.activeIndex" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;首页</p>
        <img src="../../static/img/welcome.jpg" alt="" style="width:100%">
    </div>
    <div v-show="this.activeIndex==1" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;仓库信息</p>
        <div style="height:600px;background-color:#fff">
            <el-table
                :data="roomData"
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
                    <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleClick(scope.row)" v-show="scope.row.user == '' || !scope.row.user.includes(userName)">竞标</el-button>
                        <span style="color:#0387da;" v-show="scope.row.user!='' && scope.row.user.includes(userName)">已竞标</span>
                    </template>
                    </el-table-column>
            </el-table>
        </div>
    </div>
    <div v-show="this.activeIndex==2" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;日常缴费</p>
        <div style="background-color:#fff">
            <div style="padding:20px">
                <el-table
                :data="roomTableData"
                height="550"
                border
                size="medium"
                style="width: 100%">
                    <el-table-column
                    prop="code"
                    label="仓库号码"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="size"
                    label="仓库面积"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="price1"
                    label="房租"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="price2"
                    label="物业费"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="price3"
                    label="水电费"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="price4"
                    label="停车费"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="tel"
                    label="联系电话"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="description"
                    label="仓库描述"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="开始时间"
                    width="200">
                    <template>
                        <span>{{today}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="endDay"
                    label="结束时间"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    fixed="right"
                    width="100">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="renew(scope.$index, scope.row)">租赁</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- <div style="padding:20px">
                <el-table
                :data="carTableData"
                height="300"
                border
                size="medium"
                style="width: 100%">
                    <el-table-column
                    prop="car"
                    label="车牌号码"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="价格"
                    width="200">
                    <template >
                        <span>{{carMoney}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="startParking"
                    label="开始时间">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button
                        size="medium"
                        @click="settle(scope.$index, scope.row)">结账</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div> -->
        </div>
    </div>
    <div v-show="this.activeIndex==3" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;账户管理</p>
        <div style="height:600px;background-color:#fff">
            <p style="margin:0;padding-left: 24px;">账户余额：<span style="color:lightcoral">{{balance}}</span>元</p>
            <div style="padding-left:24px"><el-button size="medium" @click="recharge()">充值</el-button></div>
        </div> 
    </div>
    <div v-show="this.activeIndex==4" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;更多功能</p>
        <p style="position: absolute;left: 24px;">敬请期待...</p>
        <img src="../../static/img/welcome.jpg" alt="" style="width:100%">
    </div>
    <el-dialog
    title="租赁"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
        <el-form :label-position="labelPosition" size="medium" label-width="80px" ref="pay"  :model="pay" :rules="rules">
            <el-form-item label="租赁时长">
                <el-radio-group v-model="pay.priceType">
                    <el-radio label="0" @change="changPay">按月</el-radio>
                    <el-radio label="1" @change="changPay">按季度</el-radio>
                    <el-radio label="2" @change="changPay">按年</el-radio>
                </el-radio-group>
                <el-input v-model="payTime" v-show="payTimeShow">
                    <template slot="append">{{payTimeUnit}}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="支付方式">
                <el-radio-group v-model="pay.type">
                    <el-radio label="1" >支付宝</el-radio>
                    <el-radio label="2" >微信</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm('pay')">取 消</el-button>
            <el-button type="primary" @click="submitForm('pay')">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import {getInfo} from '@/api/getInfo'
import { removeToken } from '@/utils/auth'
import {getRoomDate} from '@/api/common'
import {getData,bidRoom} from '@/api/user'
export default {
    data(){
        const date = new Date();
        return {
            userName:'',
            activeIndex:'',
            roomTableData: [],
            // carTableData: [],
            balance:20000,
            dialogVisible: false,
            labelPosition: 'left',
            pay:{},
            rules:{},
            roomData:[],
            today:date.getFullYear()+' '+ (date.getMonth()+1)+'-'+date.getDate(),
            // carMoney:'',
            payTime:'',
            payTimeUnit:'',
            payTimeShow:false
        }
    },
    created(){
        getInfo().then(res => {
            this.userName = res.name;
            getData(this.userName).then(_ => {
                // this.balance = _.data.data[0] == undefined?0:_.data.data[0].balance;
                this.roomTableData = _.data;
                // this.carTableData = [_.data.data[0]];
                // this.carMoney = _.data.carMoney[0].carMoney;
            })
        })
        getRoomDate().then(_ => {
            this.roomData = _.room;
        })
    },
    methods: {
        handleSelect(key){
            this.activeIndex = key;
        },
        jump(){
            removeToken();
            this.$router.push({path:'/'});
        },
        renew(index, row) {
            // console.log(index, row);
            // window.open('https://auth.alipay.com/login/index.htm');
            this.dialogVisible=true;
        },
        // settle(){
        //     window.open('https://auth.alipay.com/login/index.htm');
        //     // this.dialogVisible=true;
        // },
        recharge(){
            window.open('https://auth.alipay.com/login/index.htm');
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.dialogVisible=false;
            this.payTimeShow=false;
            this.payTime='';
            this.payTimeUnit='';
            this.pay={};
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                window.open('https://auth.alipay.com/login/index.htm');
                this.dialogVisible=false;
                this.payTimeShow=false;
                this.payTime='';
                this.payTimeUnit='';
                this.pay={};
            } else {
                return false;
            }
            });
        },
        // rent(row){
        //     window.open('https://auth.alipay.com/login/index.htm');
        //     console.log(row);
        // },
        handleClick(row){
            let data = {
                user:this.userName,
                code:row.code
            }
            bidRoom(data).then(_ => {
                getRoomDate().then(_ => {
                    this.roomData = _.room;
                })
            })
        },
        changPay(index){
            this.payTimeShow = true;
            switch(true){
                case index==0:this.payTimeUnit='月';break;
                case index==1:this.payTimeUnit='季度';break;
                case index==2:this.payTimeUnit='年';break;
            }
        }
    }
};
</script>
<style scoped>
.head{
    width: 100%;
    height: 70px;
    background-color: #0387da;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 29;
    box-shadow: 0px 3px 10px -3px rgba(0,0,0,.5);
}
.head p{
    line-height: 70px;
    text-align: left;
    color: #ffffff;
    margin: 0;
    padding: 0 0 0 10px;
    font-size: 20px;
}
.main {
    width: 100%;
    height: 100%;
    min-height: 600px;
    position: relative;
}
.tac{
    width: 200px;
    position: fixed;
    top: 75px;
    min-height: calc(100% - 75px);
    background-color: #ffffff;
    border-right: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 10px 0px 8px -7px;
}
.info{
    position: absolute;
    right: 36px;
    top: 26px;
    cursor: pointer;
}
.info .title{
    color: #fff;
}
.item{
    position: absolute;
    top: 75px;
    left: 205px;
    width: calc(100% - 210px);
    background-color: #ffffff;
    height: 51px;
    background: #fff;
    line-height: 51px;
    text-align: left;
}
</style>