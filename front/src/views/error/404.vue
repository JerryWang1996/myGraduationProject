<template>
  <div class="error">
    <h1>找不到页面</h1>
    <el-button type="info" round @click="back()"><i class="fa fa-arrow-left" aria-hidden="true"></i>点击返回</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods:{
    back(){
      this.$router.replace({path:'/'});
    }
  }
}
</script>
<style  scoped>
.error{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>




