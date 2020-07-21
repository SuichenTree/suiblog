<template>
  <div>
    <el-card class="box-card">
        <div slot="header" style="text-align:left;">
          <span>文章添加页面</span>
        </div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="文章名称">
                        <el-input v-model="form.articleName" placeholder="请输入文章名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="文章链接名称">
                        <el-input v-model="form.articleUrl" placeholder="请输入文章链接名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="文章描述">
                        <el-input type="textarea" :rows="3"
                            v-model="form.articleDes">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="文件传输">
                        <el-upload
                          class="upload-demo"
                          ref="upload"
                          action="https://www.suichen.xyz:9099/shu/blogAdmin/upLoadFile"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :file-list="fileList"
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-button type="warning" @click="resetForm">重置</el-button>
        <el-button  type="primary" @click="addArticle">确定新增</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
        form:{
            articleName:"",
            articleUrl:"",
            articleDes:""
        },
        fileList: [
            {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
            {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ]
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //重置
      resetForm(){
        this.form.articleUrl = "";
        this.form.articleDes = "";
        this.form.articleName = "";
        this.fileList = [];
      },
      //增加文章
      addArticle(){
        let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        };
        console.log("ff="+this.fileList)
        let that = this;
        let param = new URLSearchParams()
        param.append('articleName',this.form.articleName)
        param.append('articleUrl',this.form.articleUrl)
        param.append('articleDes',this.form.articleDes)
        param.append('fileList',this.fileList)
        this.$axios.post("/shu/blogAdmin/upLoadArticle",param,config)
        .then(function(res){
          console.log("11="+res.data)
        }).catch(function(error){
            that.$message.error('服务器未响应，请等待！！！');
        })
      }
    }
}
</script>

<style scoped>
  
</style>