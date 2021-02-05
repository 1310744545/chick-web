<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item ><a href="/"><el-image :src="homeLogo" style="height: 55px;width: 55px" ></el-image></a></el-menu-item>
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">工具</el-menu-item>
                <el-menu-item index="3">帖子</el-menu-item>
                <el-menu-item index="4">影视</el-menu-item>
                <el-menu-item index="5">简介</el-menu-item>
                <el-menu-item>
                    <el-input
                        size="small"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input">
                    </el-input>
                </el-menu-item>
                <el-menu-item style="float: right;margin-right: 50px" :hidden="!loginFlag">
                    <el-button type="primary">登录</el-button>
                </el-menu-item>
                <el-menu-item index="6" style="float: right;margin: 0 30px" :hidden="loginFlag">退出<i class="el-icon-switch-button" ></i></el-menu-item>
                <el-submenu index="7" style="float: right" :hidden="loginFlag">
                    <template slot="title">
                            <el-col :span="12">
                                <div class="demo-basic--circle">
                                    <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
                                </div>
                            </el-col>
                    </template>
                    <el-menu-item index="7-1">个人信息</el-menu-item>
                    <el-menu-item index="7-2">写帖子</el-menu-item>
                    <el-menu-item index="7-3">帖子管理</el-menu-item>
                    <el-menu-item index="7-4">设置(未开放)</el-menu-item>
                    <el-menu-item index="7-5">收藏(未开放)</el-menu-item>
                    <el-menu-item index="7-5">历史(未开放)</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-main>Main
            <div>
                <el-button type="primary" @click="get">get</el-button>
                <el-button type="primary" @click="remove">remove</el-button>
                <el-button type="primary" @click="add">add</el-button>
                <el-button type="primary" @click="update">update</el-button>
                <el-button type="primary" @click="test">test</el-button>
            </div>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            activeIndex: '1',
            fit: ['content'],
            homeLogo: require('@/assets/home.jpg'),
            loginFlag: false,
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            input:'',
            key:1
        }
    },
    methods: {
        get() {
            this.getRequest('/get', null).then(res => {
                console.log(res);
            })
        },
        remove() {
            this.postRequest('/remove', null).then(res => {
                console.log(res);
            })
        },
        add() {
            this.postRequest('/add', null).then(res => {
                console.log(res);
            })
        },
        update() {
            this.postRequest('/update', null).then(res => {
                console.log(res);
            })
        },
        test() {
            this.postRequest('/test', null).then(res => {
                console.log(res);
            })
        },
        handleSelect(key, keyPath) {
            this.key = key;
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
.el-input > input{
    height: 10px;
}
</style>
