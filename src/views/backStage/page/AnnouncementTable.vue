<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.keyword" placeholder="请输入标题" class="handle-input mr10"></el-input>
                <el-select v-model="query.delFlag" class="mr10" style="vertical-align:middle"
                           @change="getData('selectchange')">
                    <el-option :value="0" label="正常公告"></el-option>
                    <el-option :value='1' label="已删除公告"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="add">发布公告</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="ID" width="55" align="center" v-if="false"></el-table-column>
                <el-table-column prop="title" label="公告标题">
                    <template slot-scope="scope">
                        <div v-html="scope.row.title" class="title"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="公告内容" width="400px">
                    <template slot-scope="scope">
                        <div v-html="scope.row.content" class="content1"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="text" label="公告类型">
                    <template slot-scope="scope">
                        {{scope.row.type==='0'?'bug修改':scope.row.type==='1'?'系统公告':scope.row.type==='2'?'内容更新':'站长公告'}}
                    </template>

                </el-table-column>
                <el-table-column prop="createBy" label="创建者"></el-table-column>
                <el-table-column prop="createDate" label="创建时间" width="160px"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.row.id, scope.row)"
                            v-if="scope.row.delFlag==='0'"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >{{ scope.row.delFlag === '0' ? '删除' : '恢复' }}</el-button>
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

        <!--编辑弹出框-->
        <el-dialog title="发布公告" :visible.sync="editVisible" width="80%">
            <el-form ref="form" :model="form" label-width="70px">
                <div style="width: auto;margin: 0 auto">
                    <el-input class="handle-input mr10" v-model="announcement.id" v-if="false"></el-input>
                    <span style="color: red">公告标题:</span>
                    <el-input class="handle-input mr10" v-model="announcement.title" ></el-input>
                    <span style="color: red">公告类别:</span>
                    <el-select v-model="announcement.type">
                        <el-option value="0" label="bug修改"></el-option>
                        <el-option value="1" label="系统公告"></el-option>
                        <el-option value="2" label="内容更新"></el-option>
                        <el-option value="3" label="站长公告"></el-option>
                    </el-select>
                </div>
                <el-divider></el-divider>
                <div style="height: 50px;width: 100%">
                    <span style="color: red;text-align: center;display:block;">公告内容:</span>
                </div>
                <div class="container">
                    <quill-editor  v-model="announcement.content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 300px"/>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
//这里采用富文本编辑器,而不是markdown编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
// import { mavonEditor } from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// import { fetchData } from '../../api/index';
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
            pageTotal: 0,
            // multipleSelection: [],
            // delList: [],
            editVisible: false,
            form: {},
            announcement:{
                id: '',
                title: '',
                content: '',
                type:''
            }
            // idx: -1,
            // id: -1
        };
    },
    components: {
        // mavonEditor
        quillEditor
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData(selectchange) {
            if (selectchange) {
                this.query.current = 1;
            }
            const data = {
                keyword: this.query.keyword,
                current: this.query.current,
                size: this.query.size,
                delFlag: this.query.delFlag
            }
            this.getRequest('/announcement/manager/list',data).then(res => {
                this.tableData = res.data.records;
                this.pageTotal = res.data.total;
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要' + (row.delFlag === '0' ? '删除' : '恢复') + '吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    const data = {
                        id: row.id,
                        delFlag: row.delFlag
                    }
                    this.postRequest("/announcement/manager/deleteOrRenew", data).then(this.getData());
                })
                .catch(() => {});
        },
        // 编辑操作
        handleEdit(id, row) {
            this.announcement.id = id;
            this.announcement.title = row.title;
            this.announcement.content = row.content;
            this.announcement.type = row.type;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            const data = {
                id: this.announcement.id,
                title: this.announcement.title,
                content: this.announcement.content,
                type: this.announcement.type
            }
            this.postRequest("/announcement/manager/edit", data).then(res=>{
                this.editVisible = false;
                this.getData();
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            this.getData();
        },
        $imgAdd(pos, $file){
            var formdata = new FormData();
            formdata.append('file', $file);
            // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
            this.$axios({
                url: '/common/upload',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((url) => {
                this.$refs.md.$img2Url(pos, url);
            })
        },
        change(value, render){
            // render 为 markdown 解析后的结果
            this.html = render;
        },
        add(){
            this.announcement.id ='',
            this.announcement.title ='',
            this.announcement.content = '',
            this.announcement.type= ''
            this.editVisible = true;
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

.content1,.title{
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
}
.el-table th {
    display: table-cell !important;
}
</style>
