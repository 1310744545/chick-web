<template>
    <div class="container">
        <div class="breadcrumb">
            <div class="breadcrumb-item breadcrumbContainer">
                <el-breadcrumb separator-class="el-icon-arrow-left">
                    <transition-group name="breadcrumb">
                        <el-breadcrumb-item v-for="(item, index) in list" :key="index">
                            <router-link :to="item.path">{{item.meta.title}}</router-link>
                        </el-breadcrumb-item>
                    </transition-group>
                </el-breadcrumb>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="toolsContainer">

        </div>
    </div>
</template>

<script>
export default {
    name: "Tools",
    data() {
        return {

        }
    },
    methods: {},
    created() {
    },
    computed: {

        list() {
            return this.$route.matched;
        }
    }
}
</script>

<style scoped>

.container{
    height: auto;
    width: 90%;
    margin: 0 auto;
}
.breadcrumb{
    height: 40px;
}
.breadcrumbContainer{
    padding: 25px 0 0 0;
}
.toolsContainer{
    height: 500px;
}
</style>
