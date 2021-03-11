<template>
    <div class="UUIDContent">
        <div class="tip" style="text-align: left">
            常用/任意进制转换
        </div>
        <div class="tip2">
            常用进制转换
        </div>
        <span style="margin: 0 30px 0 0">选择进制</span>

        <el-radio-group v-model="hex">
            <el-radio :label=2>二进制</el-radio>
            <el-radio :label=8>八进制</el-radio>
            <el-radio :label=10>十进制</el-radio>
            <el-radio :label=16>十六进制</el-radio>
            <el-radio :label=32>三十二进制</el-radio>
            <el-radio :label=64>六十四进制</el-radio>
        </el-radio-group>
        <div class="demo-input-suffix" style="text-align: left;margin: 20px 0 20px 25%">
            <span>要转换的内容：</span>
            <el-input style="width: 45%;margin: 0 30px 0 0" v-model="inputContent" placeholder="请输入要转换的内容"></el-input>
            <el-button @click="generate" type="primary">转换</el-button>
        </div>
        <div style="width: 50%;margin: 0 auto">
            <el-table :data="tableData" stripe>
                <el-table-column prop="hex" label="进制" width="100"></el-table-column>
                <el-table-column prop="result" label="结果"></el-table-column>
            </el-table>
        </div>
        <div>
            <div class="tip2" style="margin: 50px 0 50px 0">
                任意进制转换
            </div>
            <div>
                <el-select v-model="hexFrom" style="vertical-align:middle;">
                    <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item+'进制'"
                        :value="item">
                    </el-option>
                </el-select>
                <el-input v-model="valueFrom" placeholder="请输入内容" style="width: 250px;vertical-align:middle;margin: 0 0 0 30px;"></el-input>
            </div>
           <i class="el-icon-bottom" style="font-size: 50px;margin: 0 100px"></i>
           <i class="el-icon-bottom" style="font-size: 50px;margin: 0 100px"></i>
            <div style="margin: 10px 0 0 0">
                <el-select v-model="hexTo" style="vertical-align:middle;">
                <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item+'进制'"
                    :value="item">
                </el-option>
                </el-select>
                <el-input v-model="valueTo" placeholder="这里显示转换后的内容" style="width: 250px;vertical-align:middle;margin: 0 0 0 30px;" readonly="true"></el-input>
            </div>

            <br>
            <el-button @click="fromHexTo" type="primary" round style="width: 100px">转换</el-button>
        </div>

    </div>


</template>

<script>
import {Message} from "element-ui";

export default {
    name: "HexConvert",
    data() {
        return {
            hex: 2,
            inputContent: '',
            ss: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_/',
            tableData: [{
                hex: '2',
                result: ''
            }, {
                hex: '8',
                result: ''
            }, {
                hex: '10',
                result: ''
            }, {
                hex: '16',
                result: ''
            }, {
                hex: '32',
                result: ''
            }, {
                hex: '64',
                result: ''
            },],
            messageFlag: true,
            options:[
                2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
                        33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],
            hexFrom:2,
            hexTo:2,
            valueFrom:'',
            valueTo:''
        }
    },
    methods: {
        generate() {
            var mn = this.hex;
            var m = this.inputContent;
            this.tableData[0].result = this.convert(2, m, mn)
            this.tableData[1].result = this.convert(8, m, mn)
            this.tableData[2].result = this.convert(10, m, mn)
            this.tableData[3].result = this.convert(16, m, mn)
            this.tableData[4].result = this.convert(32, m, mn)
            this.tableData[5].result = this.convert(64, m, mn)
            // $("#base_2").val();
            // $("#base_8").val(convert(8, m, mn));
            // $("#base_10").val(convert(10, m, mn));
            // $("#base_16").val(convert(16, m, mn));
            // $("#base_32").val(convert(32, m, mn));
            // $("#base_64").val(convert(64, m, mn));
            // this.getRequest('/chick/tools/commonHexConvert', {hex: this.hex,inputContent:this.inputContent}).then(res => {
            //     // this.UUIDList = res.data;
            // })
            this.messageFlag = true;
        },
        v10toX(n, m) {
            m = String(m).replace(/ /gi, "");
            if (m == "") {
                return ""
            }
            var a = this.ss.substr(0, 10);
            var b = a + ".";
            if (eval("m.replace(/[" + b + "]/gi,'')") != "") {
                this.M("请输入有效的" + n + "进制数值");
                this.messageFlag = false;
                return ""
            }
            m = m.split(".");
            if (m.length > 2) {
                this.M("请输入有效的" + n + "进制数值");
                this.messageFlag = false;
                return ""
            }
            var a = this.ss.substr(0, n);
            if (m.length == 1) {
                m = m[0];
                var t = "";
                while (m != 0) {
                    var b = m % n;
                    t = a.charAt(b) + t;
                    m = (m - b) / n
                }
                return t
            } else {
                var m0 = m[0];
                var t = "";
                while (m0 != 0) {
                    var b = m0 % n;
                    t = a.charAt(b) + t;
                    m0 = (m0 - b) / n
                }
                var cnt = 18;
                var m1 = m[1];
                m1 = parseFloat("0." + m1);
                var d = "",
                    b = 0;
                while (m1 != 0 && cnt > 0) {
                    m1 = m1 * n;
                    b = parseInt(m1);
                    d = d + a.charAt(b);
                    m1 = m1 - b;
                    cnt--
                }
                return t + "." + d
            }
        },
        vXto10(n, m) {
            m = String(m).replace(/ /gi, "");
            if (m == "") {
                return ""
            }
            var a = this.ss.substr(0, n);
            var b = a + ".";
            if (eval("m.replace(/[" + b + "]/gi,'')") != "") {
                this.M("请输入有效的" + n + "进制数值");
                this.messageFlag = false;
                return ""
            }
            m = m.split(".");
            if (m.length > 2) {
                this.M("请输入有效的" + n + "进制数值");
                this.messageFlag = false;
                return ""
            }
            if (m.length == 1) {
                m = m[0];
                var t = 0,
                    c = 1;
                for (var x = m.length - 1; x > -1; x--) {
                    t += c * (a.indexOf(m.charAt(x)));
                    c *= n
                }
                return t
            } else {
                var m0 = m[0];
                var t = 0,
                    c = 1;
                for (var x = m0.length - 1; x > -1; x--) {
                    t += c * (a.indexOf(m0.charAt(x)));
                    c *= n
                }
                var m1 = m[1];
                var d = 0,
                    c = 1 / n;
                for (var x = 0; x < m1.length; x++) {
                    d += c * (a.indexOf(m1.charAt(x)));
                    c /= n
                }
                return t + d
            }
        },
        vXtoY(d, b, c) {
            var a = this.vXto10(d * 1, b);
            if (a == "") {
                return ""
            }
            a = this.v10toX(c, a);
            return a
        },
        M(b) {
            if (this.messageFlag) {
                Message.error(b);
            }
        },
        convert(n, m, mn) {
            return this.vXtoY(mn, m, n)
        },
        fromHexTo() {
            this.valueTo=this.convert(this.hexTo, this.valueFrom, this.hexFrom);
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

.tip2 {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 0 0 20px 0;
    font-size: 30px;
}

</style>
