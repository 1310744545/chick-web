<template>
    <el-container class="app">
        <el-header class="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item style="margin-left: 20px"><a href="/">
                    <el-image :src="homeLogo" style="height: 55px;width: 55px"></el-image>
                </a></el-menu-item>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/tools">在线工具</el-menu-item>
                <el-menu-item index="/software">软件下载</el-menu-item>
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
                <el-menu-item style="float: right;margin-right: 50px" :hidden="loginFlag">
                    <el-button type="primary" @click="login">登录</el-button>
                </el-menu-item>
                <el-menu-item class="logout" @click="logout" style="float: right;margin: 0 30px 0 0"
                              :hidden="!loginFlag">
                    退出<i class="el-icon-switch-button"></i>
                </el-menu-item>


                <!--                <el-dropdown style="float: right;padding: 10px 20px 0 0" :hidden="!loginFlag">-->
                <!--                    <el-col :span="16">-->
                <!--                        <el-image style="height: 40px;width: 40px" :src="user.headPortraitUrl"></el-image>-->
                <!--                    </el-col>-->
                <!--                    <template #dropdown>-->
                <!--                        <el-dropdown-menu>-->

                <!--                            <el-dropdown-item v-bind:to="/information/">个人信息</el-dropdown-item>-->
                <!--                            <el-dropdown-item>写帖子</el-dropdown-item>-->
                <!--                            <el-dropdown-item>帖子管理</el-dropdown-item>-->
                <!--                            <el-dropdown-item>设置(未开放)</el-dropdown-item>-->
                <!--                            <el-dropdown-item>收藏(未开放)</el-dropdown-item>-->
                <!--                            <el-dropdown-item>历史(未开放)</el-dropdown-item>-->
                <!--                        </el-dropdown-menu>-->
                <!--                    </template>-->
                <!--                </el-dropdown>-->

                <el-submenu index="myself" style="float: right" :hidden="!loginFlag">
                    <template slot="title">
                        <el-col :span="16">
                            <el-image style="height: 40px;width: 40px" :src="user.headPortraitUrl"></el-image>
                        </el-col>
                    </template>
                    <el-menu-item index="information">个人信息</el-menu-item>
                    <el-menu-item index="write">写帖子</el-menu-item>
                    <el-menu-item index="manageWriting">帖子管理</el-menu-item>
                    <el-menu-item index="setting">设置(未开放)</el-menu-item>
                    <el-menu-item index="enshrine">收藏(未开放)</el-menu-item>
                    <el-menu-item index="history">历史(未开放)</el-menu-item>
                </el-submenu>

                <el-dropdown style="float: right;padding: 20px 25px 0 0" :hidden="!loginFlag">
                    <el-col :span="16">
                        <el-badge :value="count" class="item">
                            <i class="el-icon-message" style="font-size: 25px;"></i>
                        </el-badge>
                    </el-col>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>我的消息<el-badge style="padding: 6px 0 0 0" :value="myMessageCount" class="item"></el-badge></el-dropdown-item>
                            <el-dropdown-item>回复我的<el-badge style="padding: 6px 0 0 0" :value="replyCount" class="item"></el-badge></el-dropdown-item>
                            <el-dropdown-item>系统通知<el-badge style="padding: 6px 0 0 0" :value="systemCount" class="item"></el-badge></el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <!--                <el-submenu index="message" style="float: right;" :hidden="!loginFlag">-->
                <!--                    <template slot="title">-->
                <!--                        <el-col :span="16">-->
                <!--                            <i class="el-icon-message">-->
                <!--                                <el-badge :value="9" class="item">-->
                <!--                                    <i class="el-icon-message">-->
                <!--                                    </i>-->
                <!--                                </el-badge>-->
                <!--                            </i>-->
                <!--                        </el-col>-->
                <!--                    </template>-->
                <!--                    <el-menu-item index="myMessage">我的消息</el-menu-item>-->
                <!--                    <el-menu-item index="reply">回复我的</el-menu-item>-->
                <!--                    <el-menu-item index="system">系统通知</el-menu-item>-->
                <!--                </el-submenu>-->

            </el-menu>
        </el-header>
        <el-main class="main">
            <router-view v-loading="loading"></router-view>
            <!--            <div>-->
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

        <el-footer height="150px" style="font-size: 12px;min-width:1431px;">
            <el-divider></el-divider>
            <span><a href="https://github.com/1310744545"><img :src="footLogo"
                                                               style="height: 40px;width: 40px;"></a></span><br>
            <span>Copyright @2021 1310744545</span><br>
            <span><a href="http://beian.miit.gov.cn/" style="text-decoration: none;">黑ICP备20000673号-1</a></span>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            activeIndex: this.$route.path,
            homeLogo: require('@/assets/home.jpg'),
            footLogo: require('@/assets/icon.jpg'),
            loginFlag: false,
            input: '',
            key: '/',
            loading: false,
            user: {
                headPortraitUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            },
            count: 9,
            myMessageCount:3,
            replyCount:5,
            systemCount:1
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            this.loading = true;
            this.key = key;
            // this.activeIndex = this.$route.path;
            this.$router.push(key);
            // console.log(key, keyPath);
            this.loading = false;
        },
        beforeAvatarUpload(file) {
            // console.log(file)
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        logout() {
            this.loginFlag = false;
            window.localStorage.removeItem('token');
        },
        login() {
            this.$router.replace('/user/login')
        }
    },
    created() {
        this.activeIndex = this.$route.path
        if (window.localStorage.getItem('token') !== null) {
            this.loginFlag = true;
            this.postRequest('/user/getUserByJwt').then(res => {
                this.user = res.data;
                if (this.user.headPortraitUrl === null) {
                    this.user.headPortraitUrl = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                }
            })
        }
    },
    watch:{
        '$route' (to, from){
            this.activeIndex = to.path
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;

}

.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
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
    z-index: 10;
    position: fixed;
    width: 100%;
    min-width: 1168px;
    padding: 0;
    height: 300px;
}

.main {
    margin-top: 60px;
    padding: 0;
    min-width: 1431px;
}

::v-deep .el-icon-arrow-down:before {
    content: '';
}

::v-deep .el-submenu__title {
    padding: 0 20px 0 0;
}

::v-deep .logout {
    padding: 0 20px 0 0;
}
</style>
