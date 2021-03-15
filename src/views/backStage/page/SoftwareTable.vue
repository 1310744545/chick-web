<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="文件名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-select v-model="query.delFlag" class="mr10" style="vertical-align:top;margin-left: 10px"
                           @change="changeDel">
                    <el-option :value="0" label="正常软件"></el-option>
                    <el-option :value='1' label="已删除软件"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" @click="add">添加软件</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="id" label="ID" width="55" align="center" v-if="false"></el-table-column>
                <el-table-column prop="name" label="文件名"></el-table-column>
                <el-table-column prop="company" label="开发商"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="createDate" label="上传时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="success"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-if="scope.row.delFlag === '0'"
                        >编辑
                        </el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >{{ scope.row.delFlag === '0' ? '删除' : '恢复' }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.current"
                    :page-size="query.size"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 添加文件 -->
        <el-dialog title="添加文件" :visible.sync="editVisible" width="580px">
            <el-form ref="form" :model="form" label-width="80px" >
                <el-input v-if="false" v-model="addData.id"></el-input>
                <el-form-item label="软件名" class="required" required style="width: 500px">
                    <el-input v-model="addData.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="发行公司" style="width: 500px;margin: 20px 0 0 0;">
                    <el-input v-model="addData.remarks">

                    </el-input>
                </el-form-item>
                <el-form-item label="软件描述" style="width: 500px;margin: 20px 0 0 0;">
                    <el-input type="textarea" v-model="addData.description">

                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import axios from 'axios'
export default {
    name: 'filmTable',
    data() {
        return {
            query: {
                current: 1,
                size: 5,
                keyword: '',
                delFlag: 0
            },
            tableData: [],
            pageTotal: 1,
            loading: false,
            form:{},
            addData:{
                id:'',
                name:'',
                company:'',
                description:''
            },
            editVisible: false,
            fileList:[],
            param:'',
            delList: [],
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            const data = {
                keyword: this.query.keyword,
                current: this.query.current,
                size: this.query.size,
                delFlag: this.query.delFlag
            }
            this.postRequest('/chick/software/list', data).then(res => {
                this.tableData = res.data.records;
                this.pageTotal = res.data.total;
                // console.log(res.data.records);
                console.log(res);
            })
        },
        changeType(value) {
            // console.log(value);
            this.query.type = value;
            this.getData();
        },
        changeDel(value) {
            // console.log(value);
            this.query.delFlag = value;
            this.getData()
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        add() {
            this.addData.name = '',
            this.addData.company = '',
            this.addData.description = '',
            this.editVisible=true
        },
        onBeforeUpload(file){
            if (file.size > 10485760){
                Message.error('上传文件请小于10mb')
                this.fileList=[]
            }
            // console.log(file)
        },
        Upload(param){
            if (param.file.size > 10485760){
                Message.error('上传文件请小于10mb')
                this.fileList=[]
            }
            this.param=param
            // console.log(param)
        },
        // 保存编辑
        saveAdd() {
            if (this.addData.name===''){
                Message.error('请填写文件名')
                return
            }
            this.postRequest('/chick/software/editSoftware', this.addData).then(res=>{
                console.log(res);
            })
        },
        // 删除操作
        handleDelete(index, row) {
            // console.log(row)
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    const data = {
                        softwareId: row.id,
                        delFlag: row.delFlag
                    }
                    this.postRequest("/chick/software/deleteOrRenew", data).then(res=>{
                        this.getData()
                    });
                })
                .catch(() => {
                });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            let strId = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
                strId += this.multipleSelection[i].id + ',';
            }
            this.postRequest("/chick/File/batchRemove", {fileIds:strId}).then(res=>{
                this.getData()
                this.multipleSelection = [];
            })
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
