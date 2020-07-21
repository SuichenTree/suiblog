<template>
  <div class="main">
    <el-row :gutter="20">
         <!--导航 -->
        <el-col :span="3" :offset="1">
            <el-menu default-active="/blog/admin/article" router class="el-menu-vertical-demo">
                <el-menu-item index="/blog/admin/article">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章管理</span>
                </el-menu-item>
                <el-menu-item index="/blog/admin/addArticle">
                    <i class="el-icon-menu"></i>
                    <span slot="title">新增文章</span>
                </el-menu-item>
                <el-menu-item index="/blog/admin/tag">
                    <i class="el-icon-menu"></i>
                    <span slot="title">标签管理</span>
                </el-menu-item>
                <el-menu-item index="/blog/admin/articletag">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章所属标签管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <!--子路由页面-->
        <el-col :span="19" >
           <router-view/>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data(){
      return {
        //分页初始数据
        total:10,
        currentPage:1,
        pageSize:10,
        tableData:[]
      }
    },
    methods:{
       //分页处理1
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        //调用分页查询方法
        this.PaginationSelect();
      },
      //分页处理2
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //调用分页查询方法
        this.PaginationSelect();
      },
      //分页查询
      PaginationSelect(){
        let that = this;
        this.$axios.get("/shu/blog/getAllArticle",{params: {currentPage:this.currentPage,pageSize:this.pageSize}})
        .then(function (res) {
          //渲染表格分页
          that.tableData = res.data.tableData;
          that.total = res.data.totalNumber;
        })
        .catch(function (error) {
          console.log("服务器未响应，请等待！！");
        })
      }
    },mounted(){
       //调用分页查询方法
       this.PaginationSelect();
    }
}
</script>

<style scoped>

</style>