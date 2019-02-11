<template>
    <div class="sri">
        <div class="input">
            <el-input v-model="input" @keyup.enter.native="calcSRI" placeholder="Resources URL"></el-input>
            <el-button type="primary" @click="calcSRI">计 算</el-button>
        </div>
        <div>{{result}}</div>
    </div>
</template>
<script>
    /**
     * @author: yuanzhy
     * @date: 19-1-25
     */
    import { sha256 } from 'js-sha256'

    export default {
        name: 'sri',
        data() {
            return {
                input: '',
                sha256result: '',
                result: ''
            }
        },
        methods: {
            calcSRI() {
                this.$axios.$get(this.input).then(result => {
                    let sha256result = sha256(this.input)
                    this.result = `<script src="${this.input}" integrity="sha256-${sha256result}" crossorigin="anonymous"><\/script>`;

                })

            }
        },
        created() {
        }
    }
</script>

<style>
    .sri .input {
        margin-bottom: 12px;
        padding-right: 105px;
        position: relative;
    }

    .sri .input .el-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 90px;
    }
</style>
