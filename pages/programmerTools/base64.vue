<template>
    <div class="base64">
        <el-input type="textarea" v-model.trim="input" :rows="6" placeholder="请输入..."></el-input>
        <div class="button-group">
            <el-button type="primary" @click="encodeBase64">Base64编码</el-button>
            <el-button type="primary" @click="decodeBase64">Base64解码</el-button>
        </div>
        <el-input type="textarea" v-model="output" :rows="6" placeholder="结果是..."></el-input>
    </div>
</template>
<script>
    import {Base64} from 'js-base64'
    export default {
        name: 'base64',
        components: {},
        data() {
            return {
                input: '',
                output: '',
            }
        },
        methods: {
            encodeBase64(){
                this.output = Base64.encode(this.input)
            },
            decodeBase64(){
                this.output = Base64.decode(this.input)
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>
<style>
    .base64 .button-group {
        margin: 10px 0;
    }
    /*.base64 .button-group .el-button {
        width: 80px;
    }*/
</style>
