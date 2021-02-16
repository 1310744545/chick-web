<template>
    <el-container class="app">
<!--        <div style="width: 100%;height: 60px;position: fixed">-->
            <el-header class="header">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item style="margin-left: 20px"><a href="/">
                        <el-image :src="homeLogo" style="height: 55px;width: 55px"></el-image>
                    </a></el-menu-item>
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/tools">在线工具</el-menu-item>
                    <el-menu-item index="/software">软件</el-menu-item>
                    <el-menu-item index="/writing">帖子</el-menu-item>
                    <el-menu-item index="/film">影视</el-menu-item>
                    <el-menu-item index="/intro">简介</el-menu-item>
                    <el-menu-item>
                        <el-input
                            size="medium"
                            placeholder="当页内容搜索"
                            prefix-icon="el-icon-search"
                            v-model="input">
                            <el-button slot="append" style="width:70px" type="primary">搜索</el-button>
                        </el-input>
                    </el-menu-item>
                    <el-menu-item style="float: right;margin-right: 50px" :hidden="!loginFlag">
                        <el-button type="primary">登录</el-button>
                    </el-menu-item>
                    <el-menu-item index="logout" style="float: right;margin: 0 30px" :hidden="loginFlag">退出<i
                        class="el-icon-switch-button"></i></el-menu-item>
                    <el-submenu index="myself" style="float: right" :hidden="loginFlag">
                        <template slot="title">
                            <el-col :span="12">
                                <div class="demo-basic--circle">
                                    <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
                                </div>
                            </el-col>
                        </template>
                        <el-menu-item index="information">个人信息</el-menu-item>
                        <el-menu-item index="write">写帖子</el-menu-item>
                        <el-menu-item index="manageWriting">帖子管理</el-menu-item>
                        <el-menu-item index="setting">设置(未开放)</el-menu-item>
                        <el-menu-item index="enshrine">收藏(未开放)</el-menu-item>
                        <el-menu-item index="history">历史(未开放)</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
<!--        </div>-->
        <el-main class="main">
            <router-view></router-view>
<!--            <div>-->
<!--                <el-button type="primary" @click="get">get</el-button>-->
<!--                <el-button type="primary" @click="remove">remove</el-button>-->
<!--                <el-button type="primary" @click="add">add</el-button>-->
<!--                <el-button type="primary" @click="update">update</el-button>-->
<!--                <el-button type="primary" @click="test">test</el-button>-->
<!--                <el-upload-->
<!--                    class="upload-demo"-->
<!--                    action="/user/upload"-->
<!--                    :show-file-list="false"-->
<!--                    :before-upload="beforeAvatarUpload"-->
<!--                    :limit="3">-->
<!--                    <el-button size="small" type="primary">点击上传</el-button>-->
<!--                </el-upload>-->
<!--            </div>-->
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            activeIndex: '/',
            fit: ['content'],
            homeLogo: require('@/assets/home.jpg'),
            loginFlag: false,
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            input: '',
            key: '/'
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
            // this.activeIndex = this.$route.path;
            this.$router.push(key);
            console.log(key, keyPath);
        },
        beforeAvatarUpload(file){
            console.log(file)
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created() {
        this.activeIndex = this.$route.path
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
.header {
    z-index:10;
    position: fixed;
    width: 100%;
    min-width: 1140px;
    padding: 0;
    height: 300px;
}
.main {
    margin-top: 60px;
    padding: 0;
}
</style>
