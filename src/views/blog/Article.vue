<template>
  <div class="main">
    <el-row :gutter="20">
      <!-- 文章列表 -->
      <el-col :span="12" :offset="4">
         <el-card class="box-card" style="text-align:left;">
          <div slot="header" class="clearfix" >
            <span>文章列表</span>

            <span style="float: right; padding: 3px 0" type="text" v-if="keyWord != null">搜索关键词：{{keyWord}}</span>
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
            <el-divider>标签云</el-divider>
            <div class="tags">
              <el-tag type="success" v-for="(item,index) in tagArray" :key="index" @click="tagbeSelect(index)">{{item.tagName}}</el-tag>
            </div>
            <el-divider content-position="left">文章搜索</el-divider>
            <div>
                <el-input placeholder="请输入文章名称" v-model="articleName">
                <el-button slot="append" icon="el-icon-search" @click="searchButton"></el-button>
                </el-input>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data(){
      return {
        //标签组
        tagArray:[],
        //分页初始数据
        total:10,
        currentPage:1,
        pageSize:10,
        tableData:[],
        //搜索框文章名称
        articleName:null,
        //选中的标签编号
        tagId:null,
        keyWord:null
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
        this.$axios.get("/shu/blog/getAllArticle",{params: {tagId:this.tagId,articleName:this.articleName,currentPage:this.currentPage,pageSize:this.pageSize}})
        .then(function (res) {
          //渲染表格分页
          that.tableData = res.data.tableData;
          that.total = res.data.totalNumber;
        })
        .catch(function (error) {
          console.log("服务器未响应，请等待！！");
        })
      },
      //查询所有标签
      TagSelect(){
        let that = this;
        this.$axios.get("/shu/blog/getAllTag")
        .then(function (res) {
          //渲染标签数组
          that.tagArray = res.data.tagArray;
        })
        .catch(function (error) {
          console.log("服务器未响应，请等待！！");
        })
      },
      //标签被选中方法
      tagbeSelect(index){
        let beTag = this.tagArray[index];
        //赋值标签id
        this.tagId = beTag.tagId;
         //设置关键词
        this.keyWord = beTag.tagName;
        //调用分页查询方法
        this.PaginationSelect();
      },
      //搜索按钮方法
      searchButton(){
         //调用分页查询方法
        this.PaginationSelect();
        //设置关键词
        this.keyWord = this.articleName;
        //清空搜索词
        this.articleName = null;
        
      }
    },mounted(){
        //调用分页查询方法
        this.PaginationSelect();
        //所有标签
        this.TagSelect();
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