<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header" class="clearfix">
                <el-row type="flex" class="row-bg">
                        <el-button size="small" type="primary" @click="toAddArticle">新增文章</el-button>
                </el-row>
            </div>
            <!-- 分页表格 -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="文章链接">
                            <span>{{ props.row.articleUrl}}</span>
                        </el-form-item>
                        <el-form-item label="文章描述">
                            <span>{{ props.row.articleDes}}</span>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column prop="articleId" label="文章ID" width="100"></el-table-column>
                <el-table-column prop="articleName" label="文章名称"></el-table-column>
                <el-table-column prop="articleUrl" label="文章链接" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="articleDes"  label="文章描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="修改时间"></el-table-column>
                <el-table-column prop="articleClick" label="点击数"></el-table-column>
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
         <!-- 文章编辑对话框表单 -->
        <el-dialog title="文章编辑管理" width="30%" :visible.sync="dialogFormEdit" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="文章ID">
                    <el-input v-model="form.articleId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="文章名称">
                    <el-input v-model="form.articleName" ></el-input>
                </el-form-item>
                <el-form-item label="文章描述">
                    <el-input type="textarea" :rows="2" 
                        v-model="form.articleDes">
                    </el-input>
                </el-form-item>
                <el-form-item label="文章链接">
                    <el-input v-model="form.articleUrl" ></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="form.createTime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="修改时间">
                    <el-date-picker
                        v-model="form.updateTime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="文章点击数">
                <el-input-number v-model="form.articleClick" :min="1"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="EditInfo">确定修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //分页表格数据
            tableData: [],
            total:10,
            currentPage:1,
            pageSize:10,
            //对话框
            dialogFormEdit:false,
            form: {
                articleId:"",
                articleName:"",
                articleDes:"",
                articleUrl:"",
                articleClick:0,
                createTime:"",
                updateTime:""
            },
        }
    },methods:{
        //删除文章
        toDelete(obj){
            let that = this;
            this.$confirm('此操作将永久删除该文章?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/shu/blogAdmin/article",{params: {articleId:obj.articleId}})
                .then(function (res) {
                if(res.data.success == 1){
                    console.log("删除文章成功");
                    that.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    console.log("删除文章失败");
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
            this.form.articleUrl ="";
            this.form.articleClick = 0;
            this.form.createTime ="";
            this.form.updateTime ="";
            done();
        },
        //打开编辑文章对话框
        toEdit(obj){
            this.form.articleId = obj.articleId;
            this.form.articleName = obj.articleName;
            this.form.articleDes = obj.articleDes;
            this.form.articleUrl = obj.articleUrl;
            this.form.articleClick = obj.articleClick;
            this.form.createTime = obj.createTime;
            this.form.updateTime = obj.updateTime;
            this.dialogFormEdit = true;
        },
        //编辑文章主体信息
        EditInfo(){
            let that = this;
            let param = new URLSearchParams()
            param.append('articleId', this.form.articleId)
            param.append('articleName', this.form.articleName)
            param.append('articleDes', this.form.articleDes)
            param.append('articleUrl', this.form.articleUrl)
            param.append('articleClick', this.form.articleClick)
            param.append('createTime', this.form.createTime)
            param.append('updateTime', this.form.updateTime)
            
            this.$axios.put("/shu/blogAdmin/article",param)
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
        //新增文章
        toAddArticle(){

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
                this.$axios.get("/shu/blogAdmin/getAllArticle",{params: {currentPage:this.currentPage,pageSize:this.pageSize}})
                .then(function (res) {
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

<style>

</style>