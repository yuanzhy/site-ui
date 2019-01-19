<template>
    <div class="hash">
        <div class="input">
            <el-input v-model="input" @keyup.enter.native="calcHash"></el-input>
            <el-button type="primary" @click="calcHash">计 算</el-button>
        </div>
        <el-table
            :data="resultData"
            stripe
            border
            fit
            highlight-current-row
            emptyText=" ">
            <!--<el-table-column v-if="!$store.state.mobile"
                width="50"
                type="index">
            </el-table-column>-->
            <el-table-column
                width="70"
                prop="algorithm"
                label="算法">
            </el-table-column>
            <el-table-column
                prop="result"
                label="结果">
            </el-table-column>
            <el-table-column v-if="!$store.state.mobile"
                prop="resultUpper"
                label="结果(大写)">
            </el-table-column>
            <el-table-column v-if="!$store.state.mobile"
                width="60"
                prop="length"
                label="长度">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import sha1 from 'js-sha1';
    import {sha256} from 'js-sha256';
    import {sha512} from 'js-sha512';
    export default {
        name: 'hash',
        components: {

        },
        data() {
            return {
                input: '',
                resultData: []
            }
        },
        methods: {
            calcHash(){
                this.resultData = []

                const md5Result = md5(this.input)
                this.resultData.push({
                    algorithm: 'md5',
                    result: md5Result,
                    resultUpper: md5Result.toUpperCase(),
                    length: md5Result.length
                })

                const sha1Result = sha1(this.input)
                this.resultData.push({
                    algorithm: 'sha1',
                    result: sha1Result,
                    resultUpper: sha1Result.toUpperCase(),
                    length: sha1Result.length
                })

                const sha256Result = sha256(this.input)
                this.resultData.push({
                    algorithm: 'sha256',
                    result: sha256Result,
                    resultUpper: sha256Result.toUpperCase(),
                    length: sha256Result.length
                })

                const sha512Result = sha512(this.input)
                this.resultData.push({
                    algorithm: 'sha512',
                    result: sha512Result,
                    resultUpper: sha512Result.toUpperCase(),
                    length: sha512Result.length
                })
            },
        },
        created() {
        },
        mounted() {
        }
    }
</script>
<style>
    .hash .input {
        margin-bottom: 12px;
        padding-right: 105px;
        position: relative;
    }
    .hash .input .el-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 90px;
    }
</style>
