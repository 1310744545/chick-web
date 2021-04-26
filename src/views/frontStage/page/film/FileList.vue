<template>
    <div style="width: 80%;margin: 0 auto" v-loading="loading">
        <div v-for="(item, index) in filmList" style="width: 15%;display: inline-block;height: 270px">
            <router-link :to="{path:'/film/detail', query:{filmId:item.id}}" style="text-decoration:none;">
                <img :src="item.coverUrl" style="width: 95%;height: 90%">
                <span style="font-size: 14px;overflow:hidden;">{{ item.name | ellipsis}}</span>
            </router-link>
        </div>

        <div class="pagination" style="margin: 30px 0 0 0">
            <el-pagination
                background
                layout="prev, pager, next, jumper"
                :current-page="query.current"
                :page-size="query.size"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "FileList",
    props: {
        type: String,
    },
    data() {
        return {
            filmList: [],
            query: {
                current: 1,
                size: 18,
                keyword: '',
                delFlag: 0
            },
            pageTotal: 0,
            loading: false

        }
    },
    created() {
        if (sessionStorage.getItem('filmIndex') != null) {
            this.query.current = parseInt(sessionStorage.getItem('filmIndex'));
        }
        this.getFilm()
    },
    methods: {
        getFilm() {
            this.loading = true
            const data = {
                keyword: this.query.keyword,
                current: this.query.current,
                size: this.query.size,
                delFlag: this.query.delFlag,
                type:this.type
            }
            this.getRequest('/chick/film/list', data).then(res => {
                this.filmList = res.data.records
                this.pageTotal = res.data.total;
                sessionStorage.setItem('filmIndex', this.query.current);
                this.loading = false
                // console.log(res);
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            this.getFilm();
        },

    },
    filters: {
        ellipsis(value) {
            if (!value) return ''
            if (value.length > 12) {
                return value.slice(0, 12) + '...'
            }
            return value
        }

    },
    watch:{
        type:function (newVal, oldVal){
            sessionStorage.setItem('filmIndex', 1);
            this.getFilm()
        }
    }
}
</script>

<style scoped>
a {
    text-decoration:none ;
    color: #2d8cf0;
}
.router-link-active {
    text-decoraction: none ;
    color: #2d8cf0;
}
</style>
