<template>
    <div style="width: 70%;margin: 0 auto">
        <div style="width: auto;margin: 0 auto">
            <el-input class="handle-input mr10" v-model="write.title" style="width: 70%;margin: 20px 30px 0 0"
                      placeholder="请输入文章标题"></el-input>
            <span style="color: red">类别:</span>
            <el-select v-model="write.type" >
                <el-option :value="item.id" :label="item.name" v-for="(item, index) in type">{{item.name}}</el-option>
            </el-select>
        </div>
        <div style="height: 30px;width: 100%;margin: 10px 0 0 0">
            <span style="color: red;text-align: center;display:block;">文章内容:</span>
        </div>
        <div class="container" style="min-height: 380px;margin: 0 0 20px 0;padding: 0">
            <quill-editor class="ql-editor" v-model="write.content" ref="md" @imgAdd="$imgAdd" @change="change" />
        </div>
        <el-button type="primary" round @click="save">发布文章</el-button>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import {quillEditor} from 'vue-quill-editor';
import {Message} from 'element-ui'
export default {
    name: "write",
    data() {
        return {
            write: {
                title: '',
                type: '',
                content: ''
            },
            type:[]
        }
    },
    components: {
        // mavonEditor
        quillEditor
    },
    created() {
        this.getType();
    },
    methods: {
        $imgAdd(pos, $file) {
            var formdata = new FormData();
            formdata.append('file', $file);
            // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
            this.$axios({
                url: '/common/upload',
                method: 'post',
                data: formdata,
                headers: {'Content-Type': 'multipart/form-data'},
            }).then((url) => {
                this.$refs.md.$img2Url(pos, url);
            })
        },
        change(value, render) {
            // render 为 markdown 解析后的结果
            this.html = render;
        },
        save(){
            if (this.write.title == ''){
                Message.error('请填写标题')
                return
            }
            if (this.write.type == ''){
                Message.error('请选择类型')
                return
            }
            if (this.write.content == ''){
                Message.error('请填写内容')
                return
            }
            this.postRequest('/chick/writing/saveWrite', this.write).then(res =>{
                this.write.content=''
                this.write.type=''
                this.write.title=''
                // console.log(res);
            })
        },
        getType(){
            this.getRequest('/chick/sysZd/getZdx', {zdName:'文章类型'}).then(res =>{
                this.type = res.data;
            })
        }
    }
}
</script>

<style scoped>
::v-deep  .ql-editor{
    min-height: 300px;
    margin: 0;padding: 0
}
</style>
