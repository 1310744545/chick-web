<template>
    <div class="myContent">
        <div class="tip" style="text-align: left">
            JS压缩
        </div>
        <div style="width: 60%;margin: 0 auto;">
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6,maxRows:10}"
                placeholder="请输入内容"
                v-model="JSOne">
            </el-input>
            <div style="margin: 20px 0;">
                <el-button @click="packNor()" type="primary" class="el-icon-bottom">普通压缩</el-button>
                <el-button @click="pack()" type="primary" class="el-icon-bottom">高级压缩</el-button>
                <el-button @click="format()" type="primary" class="el-icon-bottom">格式化</el-button>
                <el-button @click="clearDate" type="primary" >清空数据</el-button>
                <el-button type="primary" v-clipboard:copy="JSTwo" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制后者</el-button>
            </div>
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6,maxRows:10}"
                placeholder="请输入内容"
                v-model="JSTwo">
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
            JSOne:'// 演示代码\n' +
                '\n' +
                '// (c) 2001 Douglas Crockford\n' +
                '// 2001 June 3\n' +
                '\n' +
                '// The -is- object is used to identify the browser.  Every browser edition\n' +
                '// identifies itself, but there is no standard way of doing it, and some of\n' +
                '// the identification is deceptive. This is because the authors of web\n' +
                '// browsers are liars. For example, Microsoft\'s IE browsers claim to be\n' +
                '// Mozilla 4. Netscape 6 claims to be version 5.\n' +
                '\n' +
                'var is = {\n' +
                '    ie:      navigator.appName == \'Microsoft Internet Explorer\',\n' +
                '    java:    navigator.javaEnabled(),\n' +
                '    ns:      navigator.appName == \'Netscape\',\n' +
                '    ua:      navigator.userAgent.toLowerCase(),\n' +
                '    version: parseFloat(navigator.appVersion.substr(21)) ||\n' +
                '             parseFloat(navigator.appVersion),\n' +
                '    win:     navigator.platform == \'Win32\'\n' +
                '}\n' +
                'is.mac = is.ua.indexOf(\'mac\') >= 0;\n' +
                'if (is.ua.indexOf(\'opera\') >= 0) {\n' +
                '    is.ie = is.ns = false;\n' +
                '    is.opera = true;\n' +
                '}\n' +
                'if (is.ua.indexOf(\'gecko\') >= 0) {\n' +
                '    is.ie = is.ns = false;\n' +
                '    is.gecko = true;\n' +
                '}',
            JSTwo:''
        }
    },
    methods: {
        format(){
            //格式化代码
            var s = this.JSOne
            s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
            s = s.replace(/(\t)*/g, "");//删除制表符
            s = s.replace(/;\s*;/g, ";"); //清除连续分号
            s = s.replace(/(\s){2,}/ig,'$1');
            s = s.replace(/(\S)\s*\{/ig,'$1 {');
            s = s.replace(/\*\/(.[^\\}\\{]*)}/ig,'\*\/\n$1}');
            s = s.replace(/\/\*/ig,'\n\/\*');
            s = s.replace(/;\s*(\S)/ig,';\n\t$1');
            s = s.replace(/\\}\s*(\S)/ig,'\}\n$1');
            s = s.replace(/\n\s*\\}/ig,'\n\}');
            s = s.replace(/\{\s*(\S)/ig,'\{\n\t$1');
            s = s.replace(/(\S)\s*\*\//ig,'$1\*\/');
            s = s.replace(/\*\/\s*([^\\}\\{]\S)/ig,'\*\/\n\t$1');
            s = s.replace(/(\S)\\}/ig,'$1\n\}');
            s = s.replace(/(\n){2,}/ig,'\n');
            s = s.replace(/:/ig,':');
            s = s.replace(/  /ig,' ');
            this.JSTwo= s;
        },
        pack(){
            //高级
            var s = this.JSOne
            s = s.replace( /("([^\\\\"]*(\\.)?)*")|('([^\\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g, ""); //删除注释
            s = s.replace(/(\n)*/g, "");//删除换行
            s = s.replace(/(\t)*/g, "");//删除制表符
            s = s.replace(/\s*([\\{\\}\\:\\;\\,])\s*/g, "$1");
            s = s.replace(/\\,[\s\\.\\#\d]*\{/g, "{"); //容错处理
            s = s.replace(/;\s*;/g, ";"); //清除连续分号
            s = s.replace(/;\s*}/g, "}"); //清除末尾分号和大括号
            s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
            this.JSTwo= (s == null) ? "" : s[1];
        },
        packNor(){
            //普通
            var s = this.JSOne
            s = s.replace( /("([^\\\\"]*(\\.)?)*")|('([^\\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g, ""); //删除注释
            s = s.replace(/(\*\/)(\n)*/g, "$1");//删除注释末尾换行
            s = s.replace(/(\t)*/g, "");//删除制表符
            s = s.replace(/\s*([\\{\\}\\:\\;\\,])\s*/g, "$1");
            s = s.replace(/\\,[\s\\.\\#\d]*\{/g, "{"); //容错处理
            s = s.replace(/;\s*;/g, ";"); //清除连续分号
            s = s.replace(/;\s*}/g, "}"); //清除末尾分号和大括号
            s = s.replace(/([^\s])\{([^\s])/g, "$1{$2");
            s = s.replace(/([^\s])\\}([^\n]s*)/g, "$1}\n$2");
            this.JSTwo = s;
        },
        clearDate(){
            this.JSOne='';
            this.JSTwo='';
        },
        onCopy(){
            Message.success('复制成功');
        },
        onError(){
            Message.error('复制失败');
        }
    },
    watch:{
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
