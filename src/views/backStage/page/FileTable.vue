<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除
                </el-button>
                <el-input v-model="query.keyword" placeholder="文件名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-select v-model="query.delFlag" class="mr10" style="margin-left: 10px"
                           @change="changeDel">
                    <el-option :value="0" label="正常文件"></el-option>
                    <el-option :value='1' label="已删除文件"></el-option>
                </el-select>
                <el-select v-model="query.type" class="mr10"
                           @change="changeType">
                    <el-option key="all" value="" label="全部"></el-option>
                    <el-option :key="item.id" :value="item.id" v-for="(item, index) in typeList"
                               :label="item.name"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" @click="add" >添加文件</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center" v-if="false"></el-table-column>
                <el-table-column prop="name" label="文件名"></el-table-column>
                <el-table-column prop="url" label="地址" width="300px"></el-table-column>
                <el-table-column label="预览(查看大图,仅支持图片)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.url"
                            :preview-src-list="[scope.row.url]"
                        >
                            <template #error>
                                <div class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </template>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="typeName" label="文件类型"></el-table-column>
                <el-table-column prop="createDate" label="上传时间"></el-table-column>
                <el-table-column prop="createName" label="上传人"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
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
        <el-dialog title="添加文件" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="文件类型" class="required" required>
                    <el-select v-model="upLoadData.addType">
                        <el-option :key="item.id" :value="item.id" v-for="(item, index) in typeList"
                                   :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-upload
                    class="upload-demo"
                    drag
                    :data="upLoadData"
                    action=""
                    :limit= 1
                    :file-list="fileList"
                    :before-upload="onBeforeUpload"
                    :http-request="Upload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <template #tip>
                        <div class="el-upload__tip">
                            上传文件不超过 10mb
                        </div>
                    </template>
                </el-upload>
                <el-form-item label="备注" style="width: 300px;margin: 20px 0 0 0;">
                    <el-input v-model="upLoadData.remarks">

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
            typeList: [],
            query: {
                current: 1,
                size: 5,
                keyword: '',
                type: '',
                delFlag: 0
            },
            tableData: [],
            pageTotal: 1,
            loading: false,
            form:{},
            upLoadData:{
                addType:'',
                remarks:''
            },
            editVisible: false,
            fileList:[],
            param:'',
            delList: [],
        };
    },
    created() {
        if (sessionStorage.getItem('fileCurrent')!=null){
            this.query.current = parseInt(sessionStorage.getItem('fileCurrent'));
        }
        this.getData();
        this.getType();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            const data = {
                keyword: this.query.keyword,
                current: this.query.current,
                size: this.query.size,
                type: this.query.type,
                delFlag: this.query.delFlag
            }
            this.postRequest('/chick/File/list', data).then(res => {
                this.tableData = res.data.records;
                this.pageTotal = res.data.total;
                sessionStorage.setItem('fileCurrent',this.query.current);

                // console.log(res.data.records);
                // console.log(res);
            })
        },
        getType() {
            const data = {
                zdName: '文件类型'
            }
            this.postRequest('/chick/sysZd/getZdxByZdName', data).then(res => {
                // console.log(res.data.records);
                this.typeList = res.data;
                // console.log(res.data);
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
            sessionStorage.setItem('fileCurrent',1);
            this.query.current=1;
            this.getData();
        },
        add() {
            this.upLoadData.addType=''
            this.fileList=[]
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
            if (this.upLoadData.addType===''){
                Message.error('请选择文件类型')
                return
            }
            console.log(this.param)
            const formData = new FormData()
            formData.append('file',this.param.file);
            formData.append('type',this.param.data.addType);
            formData.append('remarks',this.param.data.remarks);
            axios.post("/chick/File/managerUploadFile", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
                if (res.code === 0){
                    this.editVisible=false;
                    this.getData();
                }
            })

            // console.log(this.file)
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
                        fileId: row.id,
                        delFlag: row.delFlag
                    }
                    this.postRequest("/chick/File/deleteOrRenew", data).then(res=>{
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
