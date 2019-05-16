<template>
<div class="admin">
    <div class="head">
        <p><i class="fa fa-user" aria-hidden="true"></i>&nbsp;管理中心</p>
        <div class="info">
            <el-dropdown>
                <span class="el-dropdown-link title">
                    <i class="fa fa-bell-o"></i>&nbsp;{{admin}}<i class="el-icon-arrow-down el-icon--right"></i>
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
        <el-submenu index="1">
        <template slot="title">
            <i class="el-icon-setting"></i>
            <span>后台设置</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="1-1">仓库招标</el-menu-item>
            <el-menu-item index="1-2">配置</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
            <el-menu-item index="2">
            <i class="el-icon-circle-plus"></i>
            <span slot="title">更多功能</span>
            </el-menu-item>
        </el-menu>
    </el-row>
    <div v-show="!this.activeIndex" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;首页</p>
        <img src="../../static/img/welcome.jpg" alt="" style="width:100%">
    </div>
    <div v-show="this.activeIndex=='1-1'" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;仓库招标</p>
        <div style="height:600px;background-color:#fff">
            <div style="padding:20px">
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
                    prop="user"
                    label="竞标者">
                    <template slot-scope="scope">
                        <ul style="list-style-type: none;padding: 0;margin: 0;">
                            <li v-for="todo in scope.row.user.split(' ')" :key="todo.code" v-show="todo!=''" style="cursor: pointer;" @click="check(todo,scope.row.code)">{{todo}}</li>
                        </ul>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleClick(scope.row)">取消</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="width: 20px;margin: 0 auto;">
                <el-button size="medium" type="primary" icon="el-icon-circle-plus" circle @click="dialogVisible=true"></el-button>
            </div>
        </div>
    </div>
    <div v-show="this.activeIndex=='1-2'" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;配置</p>
        <div style="height:600px;background-color:#fff">
            <div>
                <label style="width: 160px;display: inline-block;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;停车单价：</label>
                <el-input size="medium" placeholder="请输入内容" type="number" v-model="setting.carMoney">
                    <template slot="append">元/小时</template>
                </el-input>
            </div>
            <div>
                <label style="width: 160px;display: inline-block;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;验证码有效时间：</label>
                <el-input size="medium" placeholder="请输入内容" type="number" v-model="setting.validDeadline">
                    <template slot="append">s</template>
                </el-input>
            </div>
            <div style="padding-left: 22px;">
                <el-button type="primary" @click="modify()">提交修改</el-button>
            </div>
        </div>
    </div>
    <div v-show="this.activeIndex==2" class="item">
        <p style="margin:0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;更多功能</p>
        <p style="position: absolute;left: 24px;">敬请期待...</p>
        <img src="../../static/img/welcome.jpg" alt="" style="width:100%">
    </div>
    <el-dialog
    title="新增(修改)仓库"
    :visible.sync="dialogVisible"
    width="35%"
    :before-close="handleClose">
        <el-form :label-position="labelPosition" size="medium" label-width="120px" ref="roomFrom"  :model="roomFromData" :rules="rules">
        <el-form-item label="仓库号码"  prop="code">
            <el-input v-model="roomFromData.code"></el-input>
        </el-form-item>
        <el-form-item label="仓库面积" prop="size">
            <el-input v-model="roomFromData.size">
                <template slot="append">㎡</template>
            </el-input>
        </el-form-item>
        <el-form-item label="仓库房租" prop="price1">
            <el-input v-model="roomFromData.price1">
                <template slot="append">元/月</template>
            </el-input>
        </el-form-item>
        <el-form-item label="物业费" prop="price2">
            <el-input v-model="roomFromData.price2">
                <template slot="append">元/月</template>
            </el-input>
        </el-form-item>
        <el-form-item label="水电费" prop="price3">
            <el-input v-model="roomFromData.price3">
                <template slot="append">元/月</template>
            </el-input>
        </el-form-item>
        <el-form-item label="停车费" prop="price4">
            <el-input v-model="roomFromData.price4">
                <template slot="append">元/月</template>
            </el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
            <el-input v-model="roomFromData.tel"></el-input>
        </el-form-item>
        <el-form-item label="仓库描述" prop="description">
            <el-input v-model="roomFromData.description" type="textarea" :rows="2"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm('roomFrom')">取 消</el-button>
            <el-button type="primary" @click="submitForm('roomFrom')">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import {getInfo} from '@/api/getInfo'
import { removeToken } from '@/utils/auth'
import {change,newWarehouse,adminInitialization,deleteRoom,rentToHim} from '@/api/admin'
export default {
    data(){
        return {
            admin:'',
            activeIndex:'',
            setting:{
                carMoney:'',
                validDeadline:''
            },
            roomTableData:[],
            dialogVisible: false,
            labelPosition: 'left',
            roomFromData:{
                code:'',
                size:'',
                price1:'',
                price2:'',
                price3:'',
                price4:'',
                tel:'',
                description:''
            },
            rules: {
                code: [{ required: true, message: '请输入仓库号码', trigger: 'blur' },
                { min: 1 ,message: '仓库号码不能为空', trigger: 'blur' }
                ],
                size: [{ required: true, message: '请输入仓库面积', trigger: 'blur' },
                { min: 1, message: '仓库面积不能为空', trigger: 'blur' }
                ],
                price1: [{ required: true, message: '请输入仓库费用', trigger: 'blur' },
                { min: 1, message: '仓库费用不能为空', trigger: 'blur' }
                ],
                price2: [{ required: true, message: '请输入仓库费用', trigger: 'blur' },
                { min: 1, message: '仓库费用不能为空', trigger: 'blur' }
                ],
                price3: [{ required: true, message: '请输入仓库费用', trigger: 'blur' },
                { min: 1, message: '仓库费用不能为空', trigger: 'blur' }
                ],
                price4: [{ required: true, message: '请输入仓库费用', trigger: 'blur' },
                { min: 1, message: '仓库费用不能为空', trigger: 'blur' }
                ],
                tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' },
                { min: 11, max: 11, message: '联系电话格式错误', trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        getInfo().then(res => {
            this.admin = res.name;
        })
        adminInitialization().then(res => {
            this.roomTableData = res.room;
            this.setting.carMoney = res.setting[0].carMoney;
            this.setting.validDeadline = res.setting[0].validDeadline;
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
        modify(){
            let data = {
                carMoney:this.setting.carMoney,
                validDeadline:this.setting.validDeadline
            }
            change(data)
        },
        handleClick(row){
            this.$confirm(`请确认是否取消招标`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteRoom(row.code).then(_ => {
                    adminInitialization().then(res => {
                        this.roomTableData = res.room;
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
        },
        handleClick2(code){
            
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.dialogVisible=false;
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                newWarehouse(this.roomFromData).then(res => {
                    adminInitialization().then(res => {
                        this.roomTableData = res.room;
                    })
                    this.$refs[formName].resetFields();
                    this.dialogVisible=false;
                });
            } else {
                return false;
            }
            });
        },
        check(user,code){
            this.$confirm(`是否将仓库租给用户${user}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                rentToHim(user,code).then(_ => {
                    adminInitialization().then(res => {
                        this.roomTableData = res.room;
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                })
            })
        }
    }
}
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
.admin {
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
.el-input{
    width: 300px;
}
</style>