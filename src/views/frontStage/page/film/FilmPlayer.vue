<template>

    <div id="dplayer"></div>
</template>

<script>
import Hls from 'hls.js';
import DPlayer from 'dplayer';
export default {
    name: "Film",
    data() {
        return {}
    },
    methods: {

    },
    mounted() {
        const dp = new DPlayer({
            container:document.getElementById("dplayer"),
            video: {
                url: 'https://vod4.buycar5.cn/20210405/cY09Ow9Z/index.m3u8',
                type: 'hls',
            },
            pluginOptions: {
                hls: {
                    // hls config
                }
            }
        })
    }
}
</script>

<style scoped>

</style>
