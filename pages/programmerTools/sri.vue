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
            async calcSRI() {
                this.$axios.$get(this.input).then(result => {
                    const encoder = new TextEncoder();
                    const data = encoder.encode(result);
                    crypto.subtle.digest("SHA-384", data).then(digest => {
                        const base64string = btoa(
                            String.fromCharCode(...new Uint8Array(digest))
                        );
                        this.result = `<script src="${this.input}" integrity="sha384-${base64string}" crossorigin="anonymous"><\/script>`;
                    });
                });
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
