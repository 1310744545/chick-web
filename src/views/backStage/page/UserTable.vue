<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.keyword" placeholder="请输入要查询的内容" class="handle-input mr10"></el-input>
                <el-select v-model="query.delFlag" class="mr10" style="vertical-align:middle"
                           @change="getData('selectchange')">
                    <el-option :value="0" label="正常用户"></el-option>
                    <el-option :value='1' label="已删除用户"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                v-loading="loading"
                :data="tableData"
                border
                class="table"
            >
                <el-table-column label="序号" width="55" align="center">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="userId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="账号"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center" width="80">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.headPortraitUrl"
                            :preview-src-list="[scope.row.headPortraitUrl]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="用户名字"></el-table-column>
                <el-table-column prop="birthday" label="出生日期"></el-table-column>
                <el-table-column label="性别" width="55">
                    <template slot-scope="scope">
                        {{ scope.row.sex === '0' ? '男' : '女' }}
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机" width="108"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column label="锁定与禁用状态" align="center" width="77">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.lockFlag==='0'?'success':(scope.row.lockFlag==='1'?'danger':'')"
                        >{{ scope.row.lockFlag === '0' ? '正常' : '锁定' }}
                        </el-tag>
                        <el-tag
                            :type="scope.row.enabledFlag==='0'?'success':(scope.row.enabledFlag==='1'?'danger':'')"
                        >{{ scope.row.enabledFlag === '0' ? '正常' : '禁用' }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="createDate" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-lock"
                            @click="toLocked(scope.$index, scope.row)"
                            v-if="scope.row.delFlag==='0'"
                        >{{ scope.row.lockFlag === '0' ? '锁定' : '解锁' }}
                        </el-button>
                        <el-button
                            type="text"
                            icon="el-icon-circle-close"
                            @click="toEnabled(scope.$index, scope.row)"
                            v-if="scope.row.delFlag==='0'"
                        >{{ scope.row.enabledFlag === '0' ? '禁用' : '解禁' }}
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

        <!-- 编辑弹出框 -->
        <!--        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">-->
        <!--            <el-form ref="form" :model="form" label-width="70px">-->
        <!--                <el-form-item label="用户名">-->
        <!--                    <el-input v-model="form.name"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="地址">-->
        <!--                    <el-input v-model="form.address"></el-input>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <span slot="footer" class="dialog-footer">-->
        <!--                <el-button @click="editVisible = false">取 消</el-button>-->
        <!--                <el-button type="primary" @click="saveEdit">确 定</el-button>-->
        <!--            </span>-->
        <!--        </el-dialog>-->
    </div>
</template>

<script>
// import { fetchData } from '../../api/index';
export default {
    name: 'userTable',
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
            loading: false
            // multipleSelection: [],
            // delList: [],
            // editVisible: false,
            // form: {},
            // idx: -1,
            // id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据

        getData(selectchange) {
            this.loading=true;
            if (selectchange) {
                this.query.current = 1;
            }
            const data = {
                keyword: this.query.keyword,
                current: this.query.current,
                size: this.query.size,
                delFlag: this.query.delFlag
            }
            this.getRequest('/user/manager/list', data).then(res => {
                this.tableData = res.data.records;
                this.pageTotal = res.data.total;
                // console.log(res.data.records);
                // console.log(res);
            })
            this.loading=false;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要' + (row.delFlag === '0' ? '删除' : '恢复') + '账号' + row.username + '吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    const data = {
                        userId: row.userId,
                        delFlag: row.delFlag
                    }
                    this.postRequest("/user/manager/deleteOrRenew", data).then(this.getData());
                })
                .catch(() => {
                });
        },
        // 锁定与解锁操作
        toLocked(index, row) {
            // 二次确认锁定
            this.$confirm('确定要' + (row.lockFlag === '0' ? '锁定' : '解锁') + '吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    //确定后的逻辑
                    const data = {
                        userId: row.userId,
                        lockFlag: row.lockFlag
                    }
                    this.postRequest("/user/manager/luckOrUnlock", data).then(this.getData());
                })
                .catch(() => {
                    //取消后的逻辑
                });
        },
        // 禁用与解禁操作
        toEnabled(index, row) {
            this.$confirm('确定要' + (row.enabledFlag === '0' ? '禁用' : '解禁') + '吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    const data = {
                        userId: row.userId,
                        enabledFlag: row.enabledFlag
                    }
                    this.postRequest("/user/manager/enabledOrUnEnabled", data).then(this.getData());
                })
                .catch(() => {
                });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            // target.scrollIntoView();
            this.getData();
        }
    }
};
</script>

<style>
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

.el-table th {
    display: table-cell !important;
}
</style>
