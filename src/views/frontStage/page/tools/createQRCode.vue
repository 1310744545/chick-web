<template>
    <div class="UUIDContent">
        <div class="tip" style="text-align: left">
            二维码生成
        </div>
        <div>
            <span style="font-size: 27px;margin: 0 20px 0 0;vertical-align:top">二维码内容:</span>
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入生成内容"
                v-model="textarea"
                style="width: 60%;padding-bottom: 20px"
            >
            </el-input>
        </div>
        <!--        <div>-->
        <!--            <span style="font-size: 27px;margin: 0 20px 0 0">logo:</span>-->
        <!--            <el-upload-->
        <!--                class="upload-demo"-->
        <!--                drag-->
        <!--                action=""-->
        <!--                :limit= 1-->
        <!--                accept=".jpg,.png,.JPEG"-->
        <!--                :file-list="fileList"-->
        <!--                :before-upload="onBeforeUpload"-->
        <!--                :http-request="Upload">-->
        <!--                <i class="el-icon-upload"></i>-->
        <!--                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
        <!--                <template #tip>-->
        <!--                    <div class="el-upload__tip">-->
        <!--                        仅支持.jpg,.png,.JPEG格式的图片-->
        <!--                    </div>-->
        <!--                </template>-->
        <!--            </el-upload>-->
        <!--        </div>-->
        <el-button @click="generate" type="primary">生成二维码</el-button>
        <el-button @click="getDownload" type="primary">下载二维码</el-button>
        <div  v-if="url !== ''">
            <img :src="url">
        </div>
    </div>
</template>

<script>
export default {
    name: "UUID",
    data() {
        return {
            textarea: '',
            // fileList:[],
            // param:'',
            url: ''
        }
    },
    methods: {
        generate() {
            this.url='/chick/tools/createQRCode?textarea='+this.textarea
        },
        // onBeforeUpload(file){
        //     if (file.size > 10485760){
        //         Message.error('上传文件请小于10mb')
        //         this.fileList=[]
        //     }
        //     // console.log(file)
        // },
        // Upload(param){
        //     if (param.file.size > 10485760){
        //         Message.error('上传文件请小于10mb')
        //         this.fileList=[]
        //     }
        //     this.param=param
        //     // console.log(param)
        // },
        // // 保存编辑
        // saveAdd() {
        //     if (this.upLoadData.addType===''){
        //         Message.error('请选择文件类型')
        //         return
        //     }
        //     console.log(this.param)
        //     const formData = new FormData()
        //     formData.append('file',this.param.file);
        //     formData.append('type',this.param.data.addType);
        //     axios.post("/chick/File/managerUploadFile", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
        //         if (res.code === 0){
        //             this.editVisible=false;
        //             this.getData();
        //         }
        //     })
        getDownload(){
            var params = new URLSearchParams();
            params.append('textarea',this.textarea);
            this.$axios
                .post('/chick/tools/downloadQRCode', params, {
                    responseType: "blob"
                })
                .then((file) => {
                    let url = window.URL.createObjectURL(new Blob([file]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', '二维码.jpg')

                    document.body.appendChild(link)
                    link.click()
                })
            // this.$axios({
            //     url:'/chick/tools/createQRCode?textarea='+this.textarea,
            //     methods:'get',
            //     // responseType: 'blob',
            // }).then(res=>{
            //     this.download(res.data,'二维码.jpg')
            // })
        }
    }
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
