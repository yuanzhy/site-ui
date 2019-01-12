<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="生成数量">
                <el-input-number v-model="number"></el-input-number>
            </el-form-item>
            <el-form-item label="大写">
                <el-switch v-model="upper"></el-switch>
            </el-form-item>
            <el-form-item label="包含横线">
                <el-switch v-model="line"></el-switch>
            </el-form-item>
            <el-form-item label="有序">
                <el-switch v-model="order"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="success" round @click="generate">生 成</el-button>
                <!--<el-button type="info" round @click="copy">复 制</el-button>-->
            </el-form-item>
        </el-form>
        <button id="copy" data-clipboard-target="#result" style="display: none"></button>
        <div id="result" v-for="item in result">
            {{item}}

        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {
                number: 5,
                upper: true,
                line: false,
                order: true,
                result: []
            }
        },
        methods: {
            generateUUID() {
                var d = new Date().getTime();
                if (window.performance && typeof window.performance.now === "function") {
                    d += performance.now(); //use high-precision timer if available
                }
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            },
            generate() {
                this.result = []
                let tmpResult = []
                for (let i = 0; i <= this.number; i++) {
                    let uuid = this.generateUUID()
                    if (!this.line) {
                        uuid = uuid.replace(/\-/g, '')
                    }
                    if (this.upper) {
                        uuid = uuid.toUpperCase()
                    }
                    tmpResult.push(uuid)
                }
                if (this.order) {
                    tmpResult.sort()
                }
                this.result = tmpResult
            },
            copy() {
                this.$el.querySelector('#copy').click()
            }
        },
        created() {

        },
        mounted() {

//            let cc = this.$el.querySelector('#copy')
//            setTimeout(()=>{
//                this.clipboard = new Clipboard(cc);//实例化
//                //复制成功执行的回调，可选
//                this.clipboard.on('success', function (e) {
//                    this.$message({
//                        message: '复制成功',
//                        type: 'success'
//                    });
//                });
//                //复制失败执行的回调，可选
//                this.clipboard.on('error', function (e) {
//                    console.log(e);
//                    this.$message.error('复制失败， 请手动复制');
//                });
//            }, 2000)
        }
    }
</script>
<style>
</style>
