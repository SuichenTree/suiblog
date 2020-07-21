<template>
  <div class="main">
    <el-row :gutter="20">
      <!-- 文章列表 -->
      <el-col :span="10" :offset="4">
         <el-card class="box-card" style="text-align:left;">
          <div slot="header" class="clearfix" >
            <span>最新文章</span>
          </div>
          <div class="text item">
            <div v-for="(item,index) in tableData" :key="index">
                <el-link :href="item.articleUrl" target="_blank" style="font-weight: bold;font-size:20px;">{{item.articleName}}</el-link>
                <p>{{item.articleDes}}</p>
                <div>
                  <span>查看<i class="el-icon-view el-icon--right"></i>{{item.clickCount}}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>更新时间：{{item.updateTime}}</span>
                </div>
                <div style="margin-top:10px;">
                  <el-tag v-for="(it,index) in item.articleTags" :key="index">{{it}}</el-tag>
                </div>
                <el-divider></el-divider>
            </div>
            <!-- 分页 -->
            <div class="block">
              <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5,10,20,30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
              </el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 信息介绍 -->
      <el-col :span="6">
        <el-card class="box-card" style="text-align:center;">
              <img src="@/assets/logo.png" class="right-logo">
              <div style="font-size:25px;font-weight:bold;">SuiChenTree</div>
              <el-divider>个人信息</el-divider>
              <ul style="text-align:left;">
                <li><el-link href="https://github.com/SuichenTree" target="_blank">Github链接</el-link></li>
                <li><el-link href="mailto:18271801652@163.com" target="_blank">邮件(18271801652@163.com)</el-link></li>
              </ul>
              <el-divider content-position="left">毒鸡汤</el-divider>
              <ul style="text-align:left;">
                <li>精诚所至,金石为开</li>
                <li>欲戴其冠,必承其重</li>
                <li>弱小的人，才习惯嘲讽与否定;内心强大的人，从不吝啬赞美与鼓励！</li>
              </ul>
              <el-divider content-position="left">关于</el-divider>
              <ul style="text-align:left;">
                <li>创作时间：2017/11/9/ ~ NOW</li>
                <li>创作者：SuiChenTree</li>
                <li>本个人博客所有内容，仅仅用于个人学习收集使用！</li>
              </ul>
        </el-card>
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

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-tag{
  margin-top:5px;
  margin-right:10px;
}

.right-logo{
  width: 130px;
  border-radius: 50%;
}
</style>