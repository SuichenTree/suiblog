<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://localhost:9099/shu/blogAdmin/upLoadFile"
      name="files"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-success="upFileSuccess"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
    data() {
      return {
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
      upFileSuccess(response, file, fileList){
          this.fileList.push(response);
      }
    }
}
</script>

<style scoped>
  
</style>