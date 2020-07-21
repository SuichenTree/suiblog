<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header" class="clearfix">
                <el-row type="flex" class="row-bg">
                        <el-button size="small" type="primary" @click="toAddArticleTag">关联文章与标签</el-button>
                </el-row>
            </div>
            <!-- 分页表格 -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="articleTagId" label="记录编号" width="100"></el-table-column>
                <el-table-column prop="articleName" label="文章名称"></el-table-column>
                <el-table-column prop="articleDes"  label="文章描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="tagName" label="标签名称">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{scope.row.tagName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作"  width="180">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="toEdit(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="toDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <!-- 分页 -->
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="12">
                    <div class="block">
                        <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5,10]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-card>
         <!-- 文章所属标签编辑对话框表单 -->
        <el-dialog title="文章所属标签编辑" width="30%" :visible.sync="dialogFormEdit" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="记录编号">
                    <el-input v-model="form.articleTagId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="文章名称">
                    <el-input v-model="form.articleName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="文章描述">
                    <el-input type="textarea" :rows="2" 
                        v-model="form.articleDes" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="所属标签">
                    <el-select v-model="form.tagId" placeholder="请选择">
                        <el-option
                        v-for="item in tags"
                        :key="item.tagId"
                        :label="item.tagName"
                        :value="item.tagId">
                        <span style="float: left">{{ item.tagName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tagId }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="EditInfo">确定修改</el-button>
            </div>
        </el-dialog>
        <!-- 关联文章与标签对话框表单 -->
        <el-dialog title="关联文章与标签" width="30%" :visible.sync="dialogFormAdd" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="add">
                <el-form-item label="测试名称">
                    <el-select v-model="add.articleId" placeholder="请选择">
                        <el-option
                        v-for="item in articles"
                        :key="item.articleId"
                        :label="item.articleName"
                        :value="item.articleId">
                        <span style="float: left">{{ item.articleName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.articleId }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属标签">
                    <el-select v-model="add.tagId" placeholder="请选择">
                        <el-option
                        v-for="item in tags"
                        :key="item.tagId"
                        :label="item.tagName"
                        :value="item.tagId">
                        <span style="float: left">{{ item.tagName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tagId }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="AddInfo">确定新增</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //文章数据
            articles:[],
            //标签数据
            tags:[],
            //分页表格数据
            tableData: [],
            total:10,
            currentPage:1,
            pageSize:10,
            //对话框
            dialogFormEdit:false,
            dialogFormAdd:false,
            form: {
                articleTagId:"",
                articleId:"",
                tagId:"",
                articleName:"",
                articleDes:"",
                tagName:""
            },
            add:{
                articleId:"",
                tagId:""
            }
        }
    },methods:{
        //删除文章所属标签
        toDelete(obj){
            let that = this;
            this.$confirm('此操作将永久删除该文章与该标签的关联?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/shu/blogAdmin/articleTag",{params: {articleTagId:obj.articleTagId}})
                .then(function (res) {
                if(res.data.success == 1){
                    console.log("删除成功");
                    that.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    console.log("删除失败");
                    that.$message({
                        type: 'warning',
                        message: '删除失败!'
                    });
                }
                })
                .catch(function (error) {
                    console.log("服务器未响应，请等待！！");
                    that.$message({
                        type: 'warning',
                        message: '服务器未响应，请等待！！！!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //对话框关闭后的回调函数
        handleClose(done) {
            this.form.articleId ="";
            this.form.articleName ="";
            this.form.articleDes ="";
            this.form.articleTagId ="";
            this.form.tagName = "";
            this.form.tagId ="";
            done();
        },
        //打开新增对话框
        toAddArticleTag(obj){
            this.dialogFormAdd = true;
        }, 
        //打开编辑文章对话框
        toEdit(obj){
            this.form.articleId = obj.articleId;
            this.form.articleName = obj.articleName;
            this.form.articleDes = obj.articleDes;
            this.form.articleTagId = obj.articleTagId;
            this.form.tagId = obj.tagId;
            this.form.tagName = obj.tagName;
            this.dialogFormEdit = true;
        },
        //新增文章标签信息
        AddInfo(){
            let that = this;
            let param = new URLSearchParams()
            param.append('articleId', this.add.articleId)
            param.append('tagId', this.add.tagId)
            this.$axios.post("/shu/blogAdmin/articleTag",param)
            .then(function(res){
                if(res.data.success === 1){
                    //隐藏对话框
                    that.dialogFormAdd = false;
                    //消息提示
                    that.$message.success('关联成功');
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    that.$message.error('关联失败！');
                }
            }).catch(function(error){
                that.$message.error('服务器未响应，请等待！！！');
            })
        },
        //编辑文章标签信息
        EditInfo(){
            let that = this;
            let param = new URLSearchParams()
            param.append('articleId', this.form.articleId)
            param.append('articleTagId', this.form.articleTagId)
            param.append('tagId', this.form.tagId)
            
            this.$axios.put("/shu/blogAdmin/articleTag",param)
            .then(function(res){
                if(res.data.success === 1){
                    //隐藏对话框
                    that.dialogFormEdit = false;
                    //消息提示
                    that.$message.success('修改成功');
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    that.$message.error('修改失败,输入信息有误！！！');
                }
            }).catch(function(error){
                that.$message.error('服务器未响应，请等待！！！');
            })
        },
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
                //生命周期
                this.$axios.get("/shu/blogAdmin/getAllArticleTag",{params: {currentPage:this.currentPage,pageSize:this.pageSize}})
                .then(function (res) {
                    that.tableData = res.data.tableData;
                    that.total = res.data.totalNumber;
                })
                .catch(function (error) {
                    console.log("服务器未响应，请等待！！");
                })
        },
        //查询全部标签数据
        selectAllTag(){
            let that = this;
                //生命周期
                this.$axios.get("/shu/blogAdmin/tag")
                .then(function (res) {
                    that.tags = res.data.tagData;
                })
                .catch(function (error) {
                    console.log("服务器未响应，请等待！！");
                })
        },
         //查询全部文章数据
        selectAllArticle(){
            let that = this;
            //生命周期
            this.$axios.get("/shu/blogAdmin/article")
            .then(function (res) {
                that.articles = res.data.articlesData;
            })
            .catch(function (error) {
                console.log("服务器未响应，请等待！！");
            })
        }
    },mounted(){
        //调用分页查询方法
        this.PaginationSelect();
        this.selectAllTag();
        this.selectAllArticle();
    }
}
</script>

<style>

</style>