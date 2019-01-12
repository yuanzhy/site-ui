<template>
    <div class="iil">
        <el-form ref="form" :model="form" label-width="110px">
            <el-form-item label="收入类型">
                <el-radio-group v-model="form.type">
                    <el-radio label="1">月薪</el-radio>
                    <el-radio label="2">年终奖</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="税前月薪">
                <el-input v-model="form.yuexin"><span slot="suffix">元</span></el-input>
            </el-form-item>
            <el-form-item label="专项附加扣除">
                <el-input v-model="form.kouchu"><span slot="suffix">元</span></el-input>
            </el-form-item>
            <el-form-item label="养老保险">
                <el-input v-model="form.yanglao"><span slot="suffix">%</span></el-input>
                <!--<el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>-->
            </el-form-item>
            <el-form-item label="医疗保险">
                <el-input v-model="form.yiliao"><span slot="suffix">%</span></el-input>
            </el-form-item>
            <el-form-item label="失业保险">
                <el-input v-model="form.shiye"><span slot="suffix">%</span></el-input>
            </el-form-item>
            <el-form-item label="工伤保险">
                <el-input v-model="form.gongshang"><span slot="suffix">%</span></el-input>
            </el-form-item>
            <el-form-item label="生育保险">
                <el-input v-model="form.shengyu"><span slot="suffix">%</span></el-input>
            </el-form-item>
            <el-form-item label="公积金">
                <el-input v-model="form.gongjijin"><span slot="suffix">%</span></el-input>
            </el-form-item>
            <el-form-item label="五险缴费比例">
                <el-input v-model="form.wuxianbili"><span slot="suffix">%</span></el-input>
            </el-form-item>
            <el-form-item label="公积金缴费金额">
                <el-input v-model="form.gongjijinjine"><span slot="suffix">元</span></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="calculate">开始计算</el-button>
                <el-button type="info">重 置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {
                form: {
                    type: 1,
                    yuexin: null,
                    kouchu: 0,
                    yanglao: 8.0,
                    yiliao: 2.0,
                    shiye: 0.5,
                    gongshang: 0,
                    shengyu: 0,
                    wuxianbili: 100,
                    gongjijin: 12.0,
                    gongjijinjine: null,
                }
            }
        },
        methods: {
            calculate() {
                if (this.form.type === 1) {
                    this.calc1();
                }
            },
            calc1() {
                const wuxian = (this.form.yuexin * this.form.wuxianbili)
//                let wuxian += wuxian
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            yuexin(newVal) {
                this.gongjijinjine = newVal
            }
        }
    }
</script>
<style>
    .iil .el-input {
        width: 100px;
    }
</style>
