<template>
    <div>
        这是详细内容
    </div>
</template>

<script>
export default {
    name: "FilmDetail",
    data() {
        return {
            filmId: this.$route.query.filmId,
            filmDetail:'',
            filmContent:{},
            loadingDetail:false,
            loadingContent:false
        }
    },
    created() {
        this.getFilmContent();
        this.getFilmDetail()
    },
    methods: {
        getFilmDetail() {
            this.loadingContent = true
            this.getRequest('/chick/filmContent/detail', {filmId: this.filmId}).then(res => {
                this.filmDetail = res.data
                this.loadingDetail = false
                console.log(res);
            })
        },
        getFilmContent() {
            this.loadingContent = true
            this.getRequest('/chick/filmContent/getContentListByFilmId', {filmId: this.filmId}).then(res => {
                this.filmContent = res.data
                this.loadingContent = false
                console.log(res);
            })
        }
    }
}
</script>

<style scoped>

</style>
