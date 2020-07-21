<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>管理员登录</span>
            </div>
            <el-form label-position="left" label-width="50px" :model="Account">
              <el-form-item label="名称">
                <el-input v-model="Account.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="Account.passWord" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data(){
      return {
        Account:{
           userName:null,
           passWord:null
        }
      }
    },
    methods:{
      resetForm(){
        this.Account.userName = null;
        this.Account.passWord = null;
      },
      submitForm(){
        let that = this;
        if( this.Account.userName&&this.Account.passWord){
          this.$axios.get("/shu/blog/login",{params: {userName:this.Account.userName,passWord:this.Account.passWord}})
          .then(function (res) {
            //渲染表格分页
            if(res.data.success == 1){
              console.log("博客管理员登录成功");
              //跳转到博客管理后台
              that.$router.push({
               path: '/blog/admin',
               query: {
                   isAdmin:1
               }
              })
            }else{
              console.log("博客管理员登录失败");
              that.$message.warning('登录失败');
            }
          })
          .catch(function (error) {
            console.log("服务器未响应，请等待！！");
          })
        }else{
          that.$message.warning('信息未填写完整！！！');
        }
      }
    }
}
</script>

<style>

</style>