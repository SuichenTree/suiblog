<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header" class="clearfix">
                <el-row type="flex" class="row-bg">
                        <el-button size="small" type="primary" @click="toAddTag">新增标签</el-button>
                </el-row>
            </div>
            <!-- 分页表格 -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="tagId" label="标签ID" ></el-table-column>
                <el-table-column prop="tagName" label="标签名称"></el-table-column>
                <el-table-column fixed="right" label="操作">
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
        <!-- 标签编辑对话框表单 -->
        <el-dialog title="标签编辑" width="30%" :visible.sync="dialogFormEdit" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="标签ID">
                    <el-input v-model="form.tagId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="标签名称">
                    <el-input v-model="form.tagName" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="EditInfo">确定修改</el-button>
            </div>
        </el-dialog>
        <!-- 标签新增对话框表单 -->
        <el-dialog title="标签新增" width="30%" :visible.sync="dialogFormAdd" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="标签名称">
                    <el-input v-model="form.tagName"></el-input>
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
            //分页表格数据
            tableData: [],
            total:10,
            currentPage:1,
            pageSize:10,
            //对话框
            dialogFormEdit:false,
            dialogFormAdd:false,
            form: {
                tagId:"",
                tagName:""
            },
        }
    },methods:{
        //删除标签
        toDelete(obj){
            let that = this;
            this.$confirm('此操作将永久删除该标签?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/shu/blogAdmin/tag",{params: {tagId:obj.tagId}})
                .then(function (res) {
                if(res.data.success == 1){
                    console.log("删除标签成功");
                    that.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    console.log("删除标签失败");
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
            this.form.tagId ="";
            this.form.tagName ="";
            done();
        },
        //打开编辑标签对话框
        toEdit(obj){
            this.form.tagId = obj.tagId;
            this.form.tagName = obj.tagName;
            this.dialogFormEdit = true;
        },
        //编辑文章主体信息
        EditInfo(){
            let that = this;
            let param = new URLSearchParams()
            param.append('tagId', this.form.tagId)
            param.append('tagName', this.form.tagName)
            
            this.$axios.put("/shu/blogAdmin/tag",param)
            .then(function(res){
                if(res.data.success === 1){
                    //隐藏对话框
                    that.dialogFormEdit = false;
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
        //打开新增标签对话框
        toAddTag(){
            this.dialogFormAdd = true;
        },
        //新增标签
        AddInfo(){
            let that = this;
            let param = new URLSearchParams()
            param.append('tagName', this.form.tagName)
            
            this.$axios.post("/shu/blogAdmin/tag",param)
            .then(function(res){
                if(res.data.success === 1){
                    //隐藏对话框
                    that.dialogFormAdd = false;
                    that.$message.success('创建成功');
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    that.$message.error('创建失败！');
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
            this.$axios.get("/shu/blogAdmin/getAllTag",{params: {currentPage:this.currentPage,pageSize:this.pageSize}})
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