<template>
    <div class="myContent">
        <div class="tip" style="text-align: left">
            CSS压缩
        </div>
        <div style="width: 60%;margin: 0 auto;">
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6,maxRows:10}"
                placeholder="请输入内容"
                v-model="cssOne">
            </el-input>
            <div style="margin: 20px 0;">
                <el-button @click="packNor()" type="primary" class="el-icon-bottom">普通压缩</el-button>
                <el-button @click="pack()" type="primary" class="el-icon-bottom">高级压缩</el-button>
                <el-button @click="format()" type="primary" class="el-icon-bottom">格式化</el-button>
                <el-button @click="clearDate" type="primary" >清空数据</el-button>
                <el-button type="primary" v-clipboard:copy="cssTwo" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制后者</el-button>
            </div>
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6,maxRows:10}"
                placeholder="请输入内容"
                v-model="cssTwo">
            </el-input>
        </div>
    </div>
</template>

<script>
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
Vue.use(VueClipboard)
import {Message} from 'element-ui'
export default {
    name: "ImageBase64",
    data() {
        return {
            cssOne:'/*   以下是演示代码\t\t\t\t*/\n' +
                '\n' +
                'body, div, dl, dt, dd, ul, ol, li,\n' +
                'h1, h2, h3, h4, h5, h6, pre, code,\n' +
                'form, fieldset, legend, input, button,\n' +
                'textarea, p, blockquote, th, td {\n' +
                '    margin: 0;\n' +
                '    padding: 0;\n' +
                '}\n' +
                'fieldset, img {\n' +
                '    border: 0;\n' +
                '}\n' +
                '/* remember to define focus styles! */\n' +
                ':focus {\n' +
                '    outline: 0;\n' +
                '}\n' +
                'address, ctoolion, cite, code, dfn,\n' +
                'em, strong, th, var, optgroup {\n' +
                '    font-style: normal;\n' +
                '    font-weight: normal;\n' +
                '}\n' +
                ' \n' +
                'h1, h2, h3, h4, h5, h6 {\n' +
                '    font-size: 100%;\n' +
                '    font-weight: normal;\n' +
                '}\n' +
                'abbr, acronym {\n' +
                '    border: 0;\n' +
                '    font-variant: normal;\n' +
                '}\n' +
                ' \n' +
                'input, button, textarea,\n' +
                'select, optgroup, option {\n' +
                '    font-family: inherit;\n' +
                '    font-size: inherit;\n' +
                '    font-style: inherit;\n' +
                '    font-weight: inherit;\n' +
                '}\n' +
                'code, kbd, samp, tt {\n' +
                '    font-size: 100%;\n' +
                '}\n' +
                '/*@purpose To enable resizing for IE */\n' +
                '/*@branch For IE6-Win, IE7-Win */\n' +
                'input, button, textarea, select {\n' +
                '    *font-size: 100%;\n' +
                '}\n' +
                'body {\n' +
                '    line-height: 1.5;\n' +
                '}\n' +
                'ol, ul {\n' +
                '    list-style: none;\n' +
                '}\n' +
                '/* tables still need \'cellspacing="0"\' in the markup */\n' +
                'table {\n' +
                '    border-collapse: collapse;\n' +
                '    border-spacing: 0;\n' +
                '}\n' +
                'ctoolion, th {\n' +
                '    text-align: left;\n' +
                '}\n' +
                'sup, sub {\n' +
                '    font-size: 100%;\n' +
                '    vertical-align: baseline;\n' +
                '}\n' +
                '/* remember to highlight anchors and inserts somehow! */\n' +
                ':link, :visited , ins {\n' +
                '    text-decoration: none;\n' +
                '}\n' +
                'blockquote, q {\n' +
                '    quotes: none;\n' +
                '}\n' +
                'blockquote:before, blockquote:after,\n' +
                'q:before, q:after {\n' +
                '    content: \'\';\n' +
                '    content: none;\n' +
                '}',
            cssTwo:''
        }
    },
    methods: {
        format(){
            var s = this.cssOne
            s=s.replace(/\s*([\\{\\}\\:\\;\\,])\s*/g,"$1");
            s=s.replace(/;\s*;/g,";");
            s=s.replace(/\\,[\s\\.\\#\d]*{/g,"{");
            s=s.replace(/([^\s])\{([^\s])/g,"$1 {\n\t$2");
            s=s.replace(/([^\s])\\}([^\n]*)/g,"$1\n}\n$2");
            s=s.replace(/([^\s]);([^\s\\}])/g,"$1;\n\t$2");
            this.cssTwo= s
        },
        pack(){
            var s = this.cssOne
            s=s.replace(/\/\*(.|\n)*?\*\//g,"");
            s=s.replace(/\s*([\\{\\}\\:\\;\\,])\s*/g,"$1");
            s=s.replace(/\\,[\s\\.\\#\d]*\{/g,"{");
            s=s.replace(/;\s*;/g,";");
            s=s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
            this.cssTwo=(s==null)?"":s[1]
        },
        packNor(){
            var s = this.cssOne;
            s=s.replace(/\/\*(.|\n)*?\*\//g,"");
            s=s.replace(/\s*([\\{\\}\\:\\;\\,])\s*/g,"$1");
            s=s.replace(/\\,[\s\\.\\#\d]*\{/g,"{");
            s=s.replace(/;\s*;/g,";");
            s=s.replace(/;\s*}/g,"}");
            s=s.replace(/([^\s])\{([^\s])/g,"$1{$2");
            s=s.replace(/([^\s])\\}([^\n]s*)/g,"$1}\n$2");
            this.cssTwo= s
        },
        clearDate(){
            this.cssOne='';
            this.cssTwo='';
        },
        onCopy(){
            Message.success('复制成功');
        },
        onError(){
            Message.error('复制失败');
        }
    },
    watch:{
        base64(newVal, oldVal){
            if (newVal===''){
                this.flag=false;
            }else {
                this.flag=true;
            }
        }
    }
}
</script>

<style scoped>
.myContent {
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
