<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.keyword" placeholder="请输入工具名" class="handle-input mr10"></el-input>
                <el-select v-model="query.delFlag" class="mr10" style="vertical-align:top"
                           @change="getData('selectchange')">
                    <el-option :value="0" label="正常工具"></el-option>
                    <el-option :value='1' label="已删除工具"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="add">新增工具</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="ID" width="200" align="center" v-if="false"></el-table-column>
                <el-table-column prop="name" label="工具名">
                    <template slot-scope="scope">
                        <div v-html="scope.row.name" class="title"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="工具路径" width="200">
                    <template slot-scope="scope">
                        <div v-html="scope.row.path" class="content1"></div>
                    </template>
                </el-table-column>
                <el-table-column label="预览(查看大图,仅支持图片)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.imgUrl"
                            :preview-src-list="[scope.row.imgUrl]"
                        >
                            <template #error>
                                <div class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </template>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="创建时间" width="160px"></el-table-column>
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

        <!--编辑弹出框-->
        <el-dialog title="新增工具" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" label-width="70px">
                <span style="color: red;margin: 0 65px 0 0">工具名称:</span>
                <el-input class="handle-input " v-model="tool.name"></el-input><br><br>
                <span style="color: red;margin: 0 10px 0 0">工具路径(以/开头):</span>
                <el-input class="handle-input" v-model="tool.path"></el-input><br><br>
                <span style="color: red;margin: 0 65px 0 0">工具图片:</span>
                <el-select v-model="tool.fileId">
                    <el-option v-for="item in fileList" :value="item.id" >
                        <el-image :src="item.url" style="width: 30px;height: 30px;"></el-image>
                    </el-option>
                </el-select>
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
import {quillEditor} from 'vue-quill-editor';

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
            editVisible: false,
            form: {},
            tool: {
                name: '',
                path: '',
                fileId: ''
            },
            fileList: []
            // idx: -1,
            // id: -1
        };
    },
    components: {
        // mavonEditor
        quillEditor
    },
    created() {
        if (sessionStorage.getItem('toolsManagerCurrent') != null) {
            this.query.current = parseInt(sessionStorage.getItem('toolsManagerCurrent'));
        }
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
            this.postRequest('/chick/tools/list', data).then(res => {
                console.log(res.data)
                this.tableData = res.data.records;
                this.pageTotal = res.data.total;
                sessionStorage.setItem('toolsManagerCurrent', this.query.current);
            })
        },
        // 触发搜索按钮
        handleSearch() {
            sessionStorage.setItem('toolsManagerCurrent',1);
            this.query.current=1;
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
                        toolId: row.id,
                        delFlag: row.delFlag
                    }
                    this.postRequest("/chick/tools/deleteOrRenew", data).then(this.getData());
                })
                .catch(() => {
                });
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
            this.postRequest("/announcement/manager/edit", data).then(res => {
                this.editVisible = false;
                this.getData();
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            this.getData();
        },
        change(value, render) {
            // render 为 markdown 解析后的结果
            this.html = render;
        },
        $imgAdd(pos, $file) {
            var formdata = new FormData();
            formdata.append('file', $file);
            // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
            this.$axios({
                url: '/common/upload',
                method: 'post',
                data: formdata,
                headers: {'Content-Type': 'multipart/form-data'},
            }).then((url) => {
                this.$refs.md.$img2Url(pos, url);
            })
        },
        add() {
            this.postRequest('/chick/File/listAllByType', {type: 'bbcc3dd1-7f97-43b2-8a2d-6a229f77dcf7'}).then(res => {
                this.fileList = res.data;
                console.log(res.data)
            })
            this.tool.name = '',
                this.tool.path = '',
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

.content1, .title {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.el-table th {
    display: table-cell !important;
}
</style>
