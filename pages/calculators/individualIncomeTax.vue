<template>
    <el-row class="iil">
        <el-col :span="12" style="">
            <el-form ref="form" :model="form" :rules="rules" label-width="125px">
                <el-form-item label="收入类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="1">月薪</el-radio>
                        <el-radio label="2">年终奖</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-show="form.type === '1'">
                    <el-form-item label="税前月薪">
                        <el-input v-model.number="form.yuexin"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                    <el-form-item label="不记五险一金部分">
                        <el-input v-model.number="form.buzhu"><span slot="suffix">元</span></el-input>
                        <div class="tips">如年功薪资，补助等不参与计算五险一金</div>
                    </el-form-item>
                    <el-form-item label="专项附加扣除">
                        <el-input v-model.number="form.kouchu"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                    <el-form-item label="养老保险">
                        <el-input v-model.number="form.yanglao"><span slot="suffix">%</span></el-input>
                    </el-form-item>
                    <el-form-item label="医疗保险">
                        <el-input v-model.number="form.yiliao"><span slot="suffix">%</span></el-input>
                    </el-form-item>
                    <el-form-item label="失业保险">
                        <el-input v-model.number="form.shiye"><span slot="suffix">%</span></el-input>
                    </el-form-item>
                    <el-form-item label="工伤保险">
                        <el-input v-model.number="form.gongshang"><span slot="suffix">%</span></el-input>
                    </el-form-item>
                    <el-form-item label="生育保险">
                        <el-input v-model.number="form.shengyu"><span slot="suffix">%</span></el-input>
                    </el-form-item>
                    <el-form-item label="公积金">
                        <el-input v-model.number="form.gongjijin"><span slot="suffix">%</span></el-input>
                    </el-form-item>
                    <hr>
                    <el-form-item label="五险缴费比例">
                        <el-input v-model.number="form.wuxianbili"><span slot="suffix">%</span></el-input>
                        <div class="tips">按照薪资的百分之几缴纳</div>
                    </el-form-item>
                    <el-form-item label="公积金缴费金额">
                        <el-input v-model.number="form.gongjijinjine"><span slot="suffix">元</span></el-input>
                        <div class="tips">公积金可能不是全额缴纳, 在此指定实际金额</div>
                    </el-form-item>
                </div>
                <el-form-item v-show="form.type === '2'" label="税前奖金">
                    <el-input v-model.number="form.jiangjin"><span slot="suffix">元</span></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="calculate">计算</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12" v-show="result.daoshou">
            <el-form ref="result" :model="result" label-width="115px">
                <el-form-item label="到手所得">
                    <span class="result_daoshou">{{result.daoshou}}<span>元</span></span>
                </el-form-item>
                <el-form-item label="税前收入">
                    <span>{{result.shuiqianshouru}}元</span>
                </el-form-item>
                <el-form-item label="计税金额">
                    <span>{{result.jishui}}元</span>
                </el-form-item>
                <el-form-item label="适用税率">
                    <span>{{result.shuilv}}</span>
                </el-form-item>
                <el-form-item label="个人所得税">
                    <span>{{result.geshui}}元</span>
                </el-form-item>
                <div v-show="form.type === '1'">
                    <el-form-item label="五险一金总计">
                        <span>{{wuxianyijinzongji}}元</span>
                    </el-form-item>
                    <el-form-item label="养老保险">
                        <span>{{result.yanglao}}元</span>
                    </el-form-item>
                    <el-form-item label="医疗保险">
                        <span>{{result.yiliao}}元</span>
                    </el-form-item>
                    <el-form-item label="失业保险">
                        <span>{{result.shiye}}元</span>
                    </el-form-item>
                    <el-form-item label="工伤保险">
                        <span>{{result.gongshang}}元</span>
                    </el-form-item>
                    <el-form-item label="生育保险">
                        <span>{{result.shengyu}}元</span>
                    </el-form-item>
                    <el-form-item label="公积金">
                        <span>{{result.gongjijin}}元</span>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {
                form: {
                    type: '1',
                    // 月薪相关
                    yuexin: null,
                    buzhu: 0,
                    kouchu: 0,
                    yanglao: 8.0,
                    yiliao: 2.0,
                    shiye: 0.5,
                    gongshang: 0,
                    shengyu: 0,
                    wuxianbili: 100,
                    gongjijin: 12.0,
                    gongjijinjine: null,
                    // 奖金
                    jiangjin: null
                },
                result: {
                    daoshou: null,
                    shuiqianshouru: null,
                    jishui: null,
                    shuilv: null,
                    geshui: 0,
                    yanglao: null,
                    yiliao: null,
                    shiye: null,
                    gongshang: null,
                    shengyu: null,
                    gongjijin: null,
                },
                rules: {
                    yuexin: [ // TODO 未生效
                        { required: true, message: '月薪不能为空'},
                        { type: 'number', message: '月薪必须为数字'}
                    ]
                }
            }
        },
        computed: {
            wuxianyijinzongji() {
                const yanglao = this.result.yanglao || 0
                const yiliao = this.result.yiliao || 0
                const shiye = this.result.shiye || 0
                const gongshang = this.result.gongshang || 0
                const shengyu = this.result.shengyu || 0
                const gongjijin = this.result.gongjijin || 0
                return (yanglao + yiliao + shiye + gongshang + shengyu + gongjijin)
            },
        },
        methods: {
            calculate() {
//                this.$refs['form'].validate((valid) => {
//                    if (valid) {
                        if (this.form.type === '1') {
                            this.calc1();
                        } else if (this.form.type === '2') {
                            this.calc2();
                        }
//                    }
//                })

            },
            calc1() {
                if (!this.form.yuexin) {
                    this.$message.warning('月薪不能为空')
                    return
                }
                this.resetResult()
                this.result.shuiqianshouru = this.form.yuexin
                // 五险
                const wuxian = (this.form.yuexin - this.form.buzhu) * this.form.wuxianbili / 100
                this.result.yanglao = (wuxian * this.form.yanglao / 100)
                this.result.yiliao = (wuxian * this.form.yiliao / 100)
                this.result.shiye = (wuxian * this.form.shiye / 100)
                this.result.gongshang = (wuxian * this.form.gongshang / 100)
                this.result.shengyu = (wuxian * this.form.shengyu / 100)
                // 公积金
                this.result.gongjijin = (this.form.gongjijinjine * this.form.gongjijin / 100)
                //  个税
                const jishui = this.form.yuexin - 5000 - this.form.kouchu - this.wuxianyijinzongji
                this.result.jishui = jishui
                if (jishui <= 0) {
                    this.result.jishui = 0
                    this.result.shuilv = '--'
//                    this.$message.info("您的收入达不到税收要求。");
                } else if (0 < jishui && jishui <= 3000) {
                    this.result.geshui = 0.03 * jishui - 0;
                    this.result.shuilv = '3%'
                } else if (3000 < jishui && jishui <= 12000) {
                    this.result.geshui = 0.1 * jishui - 210;
                    this.result.shuilv = '10%'
                } else if (12000 < jishui && jishui <= 25000) {
                    this.result.geshui = 0.2 * jishui - 1410;
                    this.result.shuilv = '20%'
                } else if (25000 < jishui && jishui <= 35000) {
                    this.result.geshui = 0.25 * jishui - 2660;
                    this.result.shuilv = '25%'
                } else if (35000 < jishui && jishui <= 55000) {
                    this.result.geshui = 0.3 * jishui - 4410;
                    this.result.shuilv = '30%'
                } else if (55000 < jishui && jishui <= 80000) {
                    this.result.geshui = 0.35 * jishui - 7160;
                    this.result.shuilv = '35%'
                } else {
                    this.result.geshui = 0.45 * jishui - 15160;
                    this.result.shuilv = '45%'
                }
                this.result.geshui = this.result.geshui.toFixed(2)
                this.result.daoshou = this.form.yuexin - this.result.geshui - this.wuxianyijinzongji
            },
            calc2() {
                if (!this.form.jiangjin) {
                    this.$message.warning('奖金不能为空')
                    return
                }
                this.result.shuiqianshouru = this.form.jiangjin
                const jishui = this.form.jiangjin
                this.result.jishui = jishui
                if (jishui <= 0) {
//                    this.$message.info("您的收入达不到税收要求。");
                } else if (0 < jishui && jishui <= 36000) {
                    this.result.geshui = 0.03 * jishui - 0;
                    this.result.shuilv = '3%'
                } else if (36000 < jishui && jishui <= 144000) {
                    this.result.geshui = 0.1 * jishui - 210;
                    this.result.shuilv = '10%'
                } else if (144000 < jishui && jishui <= 300000) {
                    this.result.geshui = 0.2 * jishui - 1410;
                    this.result.shuilv = '20%'
                } else if (300000 < jishui && jishui <= 420000) {
                    this.result.geshui = 0.25 * jishui - 2660;
                    this.result.shuilv = '25%'
                } else if (420000 < jishui && jishui <= 660000) {
                    this.result.geshui = 0.3 * jishui - 4410;
                    this.result.shuilv = '30%'
                } else if (660000 < jishui && jishui <= 960000) {
                    this.result.geshui = 0.35 * jishui - 7160;
                    this.result.shuilv = '35%'
                } else {
                    this.result.geshui = 0.45 * jishui - 15160;
                    this.result.shuilv = '45%'
                }
                this.result.geshui = Math.round(this.result.geshui, 2)
                this.result.daoshou = Math.round(jishui - this.result.geshui)
            },
            reset() {
                this.$refs.form.resetFields()
                this.resetResult()
            },
            resetResult() {
                this.result = {
                    daoshou: null,
                    jishui: null,
                    geshui: 0,
                    yanglao: null,
                    yiliao: null,
                    shiye: null,
                    gongshang: null,
                    shengyu: null,
                    gongjijin: null,
                }
            },
            validateNumber(rule, value, callback) {
                if (isNaN(value)) {
                    callback(new Error('请填写有效数字'))
                } else {
                    callback()
                }
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            'form.yuexin'(newVal) {
                this.form.gongjijinjine = newVal - this.form.buzhu
            },
            'form.buzhu'(newVal) {
                this.form.gongjijinjine = this.form.yuexin - newVal
            },
            'form.type'(newVal) {
                this.reset()
            }
        }
    }
</script>
<style>
    .iil .el-input {
        width: 160px;
    }
    .iil .tips {
        font-size: 12px;
        position: absolute;
        top: 26px;
        color: orange;
    }
    .result_daoshou {
        font-size: 40px;
        color: #ff4500;
    }

    .result_daoshou span {
        font-size: 16px;
        margin-left: 5px;
    }

    .iil hr {
        margin-bottom: 10px;
        width: 380px;
    }
</style>
