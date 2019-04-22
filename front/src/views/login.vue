<template>
  <div class="login">
    <div class="loginContent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户登录" name="first">
          <el-form
            :model="userData"
            status-icon
            :rules="rules"
            ref="user"
            :label-position="labelPosition"
            label-width="80px"
            size="mini"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="userData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="userData.password" autocomplete="off"></el-input>
            </el-form-item>
            <div>
              <el-button class="submit" type="primary" size="medium" @click="submitForm('user')">提交</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="管理员登录" name="second">
          <el-form
            :model="adminData"
            status-icon
            :rules="rules"
            ref="admin"
            :label-position="labelPosition"
            label-width="80px"
            size="mini"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="adminData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="adminData.password" autocomplete="off"></el-input>
            </el-form-item>
            <div>
              <el-button class="submit" type="primary" size="medium" @click="submitForm('admin')">提交</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="foot">
        <span class="footSpan" @click="jump('register')" v-if="registerShow">注册</span>
        <span class="footSpan" @click="jump('back')">返回</span>
      </div>
    </div>
  </div>
</template>
<script>
import {userLogin,adminLogin} from '@/api/login'
import {comValidate} from '@/utils/common'
export default {
  data() {
    var check = (rule, value, callback) => {
        switch(true){
            case rule.field === "name":
              if(comValidate.isEmpty(value)) { callback(new Error("请输入用户名"))} 
              if(!comValidate.validateName(value)) { callback(new Error("用户名格式错误"))} 
              break;
            case rule.field === "password":
              if(comValidate.isEmpty(value)) { callback(new Error("请输入密码"))}
              if(!comValidate.validatePassword(value)) { callback(new Error("密码格式错误"))}
              break;
        }
        callback();
    };
    return {
      activeName: "first",
      labelPosition: "left",
      registerShow: true,
      userData: {
        name: "",
        password: ""
      },
      adminData: {
        name: "",
        password: ""
      },
      rules: {
          name: [
            { validator: check, trigger: 'blur' }
          ],
          password: [
            { validator: check, trigger: 'blur' }
          ]
        }
    };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submit(formName)
          } else {
            return false;
          }
        });
      },
      submit(formName){
        if(formName === 'user'){
          userLogin(this.userData).then(res => {
            if(res.msg==='登录成功'){
              this.$router.push({name:'main'});
            }
          })
        }else{
          adminLogin(this.adminData).then(res => {
            if(res.msg==='登录成功'){
              this.$router.push({name:'admin'});
            }
          })
        }
      },
      jump(type){
          switch(true){
              case type=='register': this.$router.push({path:'/register'}); break;
              case type=='back': this.$router.push({path:'/'}); break;
          }
      },
      handleClick(tab) {
        this.registerShow = tab.index == 0?true:false;
      }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  min-height: 600px;
  /* background-image: url(..\..\static\img\login\login-bg.jpg);
  background-size: cover;
  background-position: center; */
  position: relative;
}
.loginContent {
  background: #fff;
  display: inline-block;
  border-radius: 4px;
  position: absolute;
  width: 300px;
  padding: 10px 20px;
  height: 220px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.submit{
    width: 100%;
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
