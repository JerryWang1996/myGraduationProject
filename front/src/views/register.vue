<template>
    <div class="register">
        <div class="registerForm">
            <el-form
            :model="registerForm"
            status-icon
            :rules="rules"
            ref="registerForm"
            :label-position="labelPosition"
            label-width="100px"
            size="medium"
            >
            <el-form-item label="用户名" prop="name">
                <el-input v-model.number="registerForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="registerForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="registerForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
                <el-input v-model.number="registerForm.tel" placeholder="请输入手机号">
                    <el-button slot="append" @click="valid()">获取验证码</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="valid">
                <el-input v-model.number="registerForm.valid" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" prop="car">
                <el-input v-model.number="registerForm.car" placeholder="请输入车牌号"></el-input>
            </el-form-item>
            <div>
                <el-button type="primary" size="small" @click="submitForm('registerForm')">提交</el-button>
                <el-button size="small" @click="resetForm('registerForm')">重置</el-button>
            </div>
            </el-form>
            <div class="foot">
                <span class="footSpan" @click="jump()">返回</span>
            </div>
        </div>
    </div>
</template>
<script>
import {comValidate} from '@/utils/common'
import {register,getValid} from '@/api/register'
export default {
    data() {
    var check = (rule, value, callback) => {
        if(comValidate.isEmpty(value)) {
            callback(new Error("此项有误"))
        }
        switch(true){
            case rule.field === "name":if(!comValidate.validateName(value)) { callback(new Error("用户名格式错误"))} break;
            case rule.field === "pass":if(!comValidate.validatePassword(value)) { callback(new Error("密码格式错误"))} break;
            case rule.field === "checkPass":if(value !== this.registerForm.pass) { callback(new Error("两次输入密码不一致"))} break;
            case rule.field === "tel":if(!comValidate.validatePhone(value)) { callback(new Error("手机号格式错误"))} break;
            case rule.field === "valid":if(isNaN(value)) { callback(new Error("验证码错误"))} break;
        }
        callback();
    };
    return {
        labelPosition: 'left',
        registerForm: {
            name: "",
            pass: "",
            checkPass: "",
            tel: "",
            car: "",
            valid: ""
        },
        rules: {
            name: [{ required: true, validator: check, trigger: "blur" }],
            pass: [{ required: true, validator: check, trigger: "blur" }],
            checkPass: [{ required: true, validator: check, trigger: "blur" }],
            tel:[{ required: true, validator: check, trigger: "blur" }],
            valid:[{ required: true, validator: check, trigger: "blur" }]
        }
    };
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                register(this.registerForm).then(res => {
                    if(res.msg==='创建成功'){
                        this.$router.push({path:'/login'})
                    }
                })
            } else {
                return false;
            }
        });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        jump(){
            this.$router.push({path:'/'});
        },
        valid(){
            if(comValidate.validatePhone(this.registerForm.tel)){
                getValid(this.registerForm.tel)
            }
        }
    }
};
</script>
<style scoped>
.register {
    width: 100%;
    height: 100%;
    min-height: 600px;
    /* background-image: url(..\..\static\img\login\login-bg.jpg);
    background-size: cover;
    background-position: center; */
    position: relative;
}
.registerForm{
    background: #fff;
    display: inline-block;
    border-radius: 4px;
    position: absolute;
    width: 400px;
    padding: 20px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.footSpan{
    cursor: pointer;
    font-size: 12px;
    float: right;
    margin-left: 10px;
    color: #409EFF;
    text-decoration: underline;
}
.foot{
    margin-top: 10px;
}
</style>