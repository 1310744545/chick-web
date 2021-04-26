<template>
    <div style="height: auto">
        <div style="width: 85%;margin: 20px auto">
            <el-radio style="width: 5%" v-model="radio" label=""> 所有</el-radio>
            <el-radio style="width: 5%" v-model="radio" v-for="(item,index) in typeList" :label="item.id"> {{item.name}}</el-radio>
        </div>
        <FileList :type="radio"></FileList>
    </div>
</template>

<script>
import FileList from './FileList'
export default {
    name: "FilmIndex",
    components: {
        FileList
    },
    data() {
        return {
            radio: '',
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
