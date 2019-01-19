<template>
    <div class="unicode">
        <el-input type="textarea" v-model.trim="input" :rows="5" placeholder="请输入..."></el-input>
        <div class="button-group">
            <el-button type="primary" @click="unicode2cn">Unicode转中文</el-button>
            <el-button type="primary" @click="cn2unicode">中文转Unicode</el-button>
            <br v-if="$store.state.mobile">
            <br v-if="$store.state.mobile">
            <label>处理英文</label>
            <el-select v-model="en" placeholder="请选择">
                <el-option :value="true" label="是"></el-option>
                <el-option :value="false" label="否"></el-option>
            </el-select>
        </div>
        <el-input type="textarea" v-model="output" :rows="5" placeholder="结果是..."></el-input>
    </div>
</template>
<script>
    export default {
        name: 'unicode',
        components: {},
        data() {
            return {
                input: '',
                output: '',
                en: false
            }
        },
        methods: {
            unicode2cn(){
                if (!this.input) {
                    this.$message.warning('请输入十六进制unicode')
                    return;
                }
                let arr = this.input.split("\\u");
                debugger
                let result = '';
                for (let i = 0; i < arr.length; i++) {
                    let r = String.fromCharCode(parseInt(arr[i], 16).toString(10)).trim();
                    if (r) {
                        result += r
                    } else {
                        result += arr[i]
                    }
                }
                this.output = result
            },
            cn2unicode(){
                if (!this.input) {
                    this.$message.warning('请输入中文')
                    return
                }
                let result = '';
                const reg = /[\u4E00-\u9FA5]/
                const isEn = this.en
                for (let i = 0; i < this.input.length; i++) {
                    let char = this.input.charAt(i)
                    if (isEn || reg.test(char)) {
                        result += "\\u" + this.input.charCodeAt(i).toString(16);
                    } else {
                        result += char
                    }
                }
                this.output = result
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>
<style>
    .unicode .el-select {
        width: 90px;
    }
    .unicode .button-group {
        margin: 10px 0;
    }
</style>
