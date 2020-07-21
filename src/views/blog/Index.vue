<template>
  <div class="index">
    <el-container>
        <el-header>
          <!--头部组件 -->
          <b_Head/>
        </el-header>
        <!-- 主体组件 -->
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>




<script>
import b_Head from '@/components/blog/Head.vue'

export default {
  name: 'index',
  data(){
    return{
    }
  },
  methods: {
  },
  components: {
    "b_Head":b_Head
  }
}
</script>

<style>
html,body,#app,.el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;
}
.index{
    height: 100%;
}
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: rgb(221, 232, 241);
  color: #333;
  text-align: center;
}
.el-header{
  background-color: #FFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>