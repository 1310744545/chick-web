<template>
    <div style="height: auto">
        <div style="width: 85%;margin: 20px auto">
            <el-radio style="width: 5%" v-model="radio" label="all"> 所有</el-radio>
            <el-radio style="width: 5%" v-model="radio" v-for="(item,index) in typeList" :label="item.id"> {{item.name}}</el-radio>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "FilmIndex",
    data() {
        return {
            radio: 'all',
            typeList:{}
            // type:this.radio
        }
    },
    created() {
        this.getFilmType()
    },
    methods: {
        getFilmType(){
            this.getRequest('/chick/sysZdx/getFilmType', {softwareId: this.softwareId}).then(res => {
                this.typeList = res.data
            })
        }
    }
}
</script>

<style scoped>

</style>
