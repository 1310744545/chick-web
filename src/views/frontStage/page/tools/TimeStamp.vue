<template>
    <div class="UUIDContent">
        <div class="tip" style="text-align: left">
            时间戳转换
        </div>
        <div>
            <span style="font-size: 27px;margin: 0 60px 0 0">
                当前时间戳:<span v-text="nowTimeStamp" style="color: #42b983"></span>
            </span>
            <span style="font-size: 27px;margin: 0 0 0 60px">
                实时转换:<span v-text="nowTime" style="color: #42b983"></span>
            </span>
        </div>
        <br>
        <el-divider></el-divider>
        <br>
        <div>
            <div style="width: 150px;display: inline-block">
                <span style="font-size: 27px;vertical-align:middle;">时间戳:</span>
            </div>
            <el-input v-model="nowTimeStampChangeFrom"
                      style="color: #42b983;width: 300px;vertical-align:middle;"></el-input>
            <el-button @click="hexToBei" type="primary" round style="margin: 0 20px"><i class="el-icon-refresh" style="vertical-align:middle;"></i>转换
            </el-button>
            <div style="width: 150px;display: inline-block">
                <span style="font-size: 27px;vertical-align:middle;">北京时间:</span>
            </div>
            <el-input v-model="nowTimeChangeTo" style="color: #42b983;width: 300px;vertical-align:middle;" readonly></el-input>
        </div>
        <br>
        <el-divider></el-divider>
        <br>
        <div>
            <div style="width: 150px;display: inline-block">
                <span style="font-size: 27px;vertical-align:middle;">北京时间:</span>
            </div>
            <el-input v-model="nowTimeBeiChangeFrom"
                      style="color: #42b983;width: 300px;vertical-align:middle;"></el-input>
            <el-button @click="beiTOHex" type="primary" round style="margin: 0 20px"><i class="el-icon-refresh" style="vertical-align:middle;"></i>转换
            </el-button>
            <div style="width: 150px;display: inline-block">
                <span style="font-size: 27px;vertical-align:middle;">时间戳:</span>
            </div>
            <el-input v-model="nowTimeBeiChangeTo"  style="color: #42b983;width: 300px;vertical-align:middle;" readonly></el-input>
        </div>
    </div>

</template>

<script>
export default {
    name: "TimeStamp",
    data() {
        return {
            nowTimeStamp: Math.round(new Date().getTime() / 1000),
            nowTime: this.renderTime(this.nowTimeStamp * 1000),
            nowTimeStampChangeFrom: Math.round(new Date().getTime() / 1000),
            nowTimeChangeTo: '',
            nowTimeBeiChangeFrom: this.renderTime(this.nowTimeStamp * 1000),
            nowTimeBeiChangeTo: '',
        }
    },
    methods: {
        renderTime(date, fmt) {
            var da;
            date = date.toString();

            if (date.indexOf("/Date(") >= 0) {
                da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
            } else if (!isNaN(date)) {
                da = new Date(parseInt(date));
            } else {
                da = date;
            }
            return this.dateFormat(da, fmt);
        },
        dateFormat(dateObj, fmt) {
            var minfmt = "";
            try {
                if (fmt == null) {
                    fmt = "yyyy-MM-dd hh:mm:ss";
                }
                var date;
                if (isNaN(dateObj)) {
                    if (dateObj.indexOf(".") > 0) {
                        dateObj = dateObj.substring(0, dateObj.indexOf("."));
                    }
                    date = new Date(dateObj.replace(/-/g, "/").replace("T", " ").replace("Z", ""));
                } else {
                    date = new Date(dateObj);
                }
                var o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "h+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            } catch (e) {
                return "";
            }
        },
        hexToBei() {
            this.nowTimeChangeTo = this.renderTime(this.nowTimeStampChangeFrom * 1000)
        },
        getValue() {
            this.nowTimeStamp = Math.round(new Date().getTime() / 1000);
            this.nowTime = this.renderTime(this.nowTimeStamp * 1000);
        },
        beiTOHex() {
            var curtime = new Date(this.nowTimeBeiChangeFrom.replace(/-/g, "/")).getTime();
            this.nowTimeBeiChangeTo = Math.round(curtime / 1000)
        }
    },
    mounted() {
        this.timer = setInterval(this.getValue, 1000);
        this.nowTimeBeiChangeFrom = this.renderTime(this.nowTimeStamp * 1000);
        this.nowTime = this.renderTime(this.nowTimeStamp * 1000);
    },
}
</script>

<style scoped>
.UUIDContent {
    min-height: 500px;
    height: auto;
    width: 100%;
    background-color: white;
}

.tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 0 0 20px 0;
    font-size: 40px;
}

</style>
