<template>
  <div class="head">
    <el-row :gutter="20">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="6">
             <div style="text-align:center;line-height:61px;font-size:20px">
              <span>SuichenTree BLOG</span>
            </div>
          </el-col>
          <el-col :span="6">
            <el-menu router default-active="/blog/index" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="/blog/index">首页</el-menu-item>
                <el-menu-item index="/blog/article">文章</el-menu-item>
                <el-menu-item index="/blog/adminLogin">博客管理员登录</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>