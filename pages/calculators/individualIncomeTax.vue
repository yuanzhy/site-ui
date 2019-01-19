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
                    <el-form-item label="缴纳月份">
                        <el-select v-model="form.yuefen" placeholder="请选择">
                            <el-option value="1"></el-option>
                            <el-option value="2"></el-option>
                            <el-option value="3"></el-option>
                            <el-option value="4"></el-option>
                            <el-option value="5"></el-option>
                            <el-option value="6"></el-option>
                            <el-option value="7"></el-option>
                            <el-option value="8"></el-option>
                            <el-option value="9"></el-option>
                            <el-option value="10"></el-option>
                            <el-option value="11"></el-option>
                            <el-option value="12"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="税前月薪">
                        <el-input v-model.number="form.yuexin"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                    <el-form-item label="累计月薪">
                        <el-input v-model.number="form.leijiyuexin"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                    <el-form-item label="不记五险一金部分">
                        <el-input v-model.number="form.buzhu"><span slot="suffix">元</span></el-input>
                        <div class="tips">如年功薪资，补助等不参与计算五险一金</div>
                    </el-form-item>
                    <el-form-item label="专项附加扣除">
                        <el-input v-model.number="form.kouchu"><span slot="suffix">元</span></el-input>
                    </el-form-item>
                    <el-form-item label="累计扣除">
                        <el-input v-model.number="form.leijikouchu"><span slot="suffix">元</span></el-input>
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
                    <hr v-show="!$store.state.mobile">
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
                    <el-button type="info" @click="reset" v-if="!$store.state.mobile">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <hr v-show="result.daoshou && $store.state.mobile">
        <el-col :span="12" v-show="result.daoshou">
            <el-form ref="result" :model="result" label-width="125px">
                <el-form-item label="到手所得">
                    <span class="result_daoshou">{{result.daoshou}}<span>元</span></span>
                </el-form-item>
                <el-form-item label="计税金额">
                    <span>{{result.jishui}}元</span>
                </el-form-item>
                <el-form-item label="适用税率">
                    <span>{{shuilvbaifenbi}}</span>
                </el-form-item>
                <el-form-item label="速算扣除数">
                    <span>{{result.susuankouchushu}}</span>
                </el-form-item>
                <el-form-item label="个人所得税" v-show="form.type === '2'">
                    <span>{{result.geshui}}元</span>
                </el-form-item>
                <!-- 月薪计算结果显示以下内容 -->
                <div v-show="form.type === '1'">
                    <el-form-item label="累计应缴税款">
                        <span>{{result.leijigeshui}}元</span>
                    </el-form-item>
                    <el-form-item label="已缴税款">
                        <span>{{result.yijiaogeshui}}元</span>
                    </el-form-item>
                    <el-form-item label="本月应交税款">
                        <span>{{result.geshui}}元</span>
                    </el-form-item>
                    <hr>
                    <el-form-item label="本月五险一金总计">
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
//    import ElOption from "../../node_modules/element-ui/packages/select/src/option";
    export default {
        name: '',
        components: {},
        data() {
            return {
                form: {
                    type: '1',
                    // 月薪相关
                    yuefen: '1', // 月份
                    yuexin: null,
                    leijiyuexin: null,
                    buzhu: 0,
                    kouchu: 0,
                    leijikouchu: 0,
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
//                    shuiqianshouru: null,
                    jishui: 0,
                    shuilv: 0,
                    susuankouchushu: 0,
                    leijigeshui: 0, // 累计应缴税款
                    yijiaogeshui: 0, // 已缴税款
                    geshui: 0, // 年终奖的个税 or 本月应补（退）税款
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
            shuilvbaifenbi() {
                if (this.result.shuilv === 0) {
                    return '--'
                } else {
                    return this.result.shuilv + '%'
                }

            }
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
//                this.result.shuiqianshouru = this.form.yuexin
                // 五险
                const wuxian = (this.form.yuexin - this.form.buzhu) * this.form.wuxianbili / 100
                this.result.yanglao = (wuxian * this.form.yanglao / 100)
                this.result.yiliao = (wuxian * this.form.yiliao / 100)
                this.result.shiye = (wuxian * this.form.shiye / 100)
                this.result.gongshang = (wuxian * this.form.gongshang / 100)
                this.result.shengyu = (wuxian * this.form.shengyu / 100)
                // 公积金
                this.result.gongjijin = (this.form.gongjijinjine * this.form.gongjijin / 100)
                //  个税 算法改为2019
//                const jishui = this.form.yuexin - 5000 - this.form.kouchu - this.wuxianyijinzongji
                // 额外计算累计应缴税款，已缴税款 2019
                const prevJishui = this.form.leijiyuexin - this.form.yuexin - 5000 * (~~this.form.yuefen-1) - (this.form.leijikouchu-this.form.kouchu) - this.wuxianyijinzongji * (~~this.form.yuefen-1)
                this.calcTaxRate(prevJishui)
                this.result.yijiaogeshui = this.result.geshui // 已缴税款
                const jishui = this.form.leijiyuexin - 5000 * ~~this.form.yuefen - this.form.leijikouchu - this.wuxianyijinzongji * ~~this.form.yuefen
                this.result.jishui = jishui
                this.calcTaxRate(jishui)
                this.result.leijigeshui = this.result.geshui // 累计应缴税款
                this.result.geshui = (this.result.leijigeshui - this.result.yijiaogeshui).toFixed(2)
//                this.result.geshui = this.result.geshui.toFixed(2)
                this.result.daoshou = this.form.yuexin - this.result.geshui - this.wuxianyijinzongji
            },
            calc2() {
                if (!this.form.jiangjin) {
                    this.$message.warning('奖金不能为空')
                    return
                }
//                this.result.shuiqianshouru = this.form.jiangjin
                const jishui = this.form.jiangjin
                this.result.jishui = jishui
                this.calcTaxRate(jishui)
                this.result.geshui = Math.round(this.result.geshui, 2)
                this.result.daoshou = Math.round(jishui - this.result.geshui)
            },
            calcTaxRate(jishui) { // 计算个税， 税率和速算扣除数
                if (jishui <= 0) {
                    this.result.geshui = 0
                    this.result.shuilv = 0
                    this.result.susuankouchushu = '--'
//                    this.$message.info("您的收入达不到税收要求。");
                } else if (0 < jishui && jishui <= 36000) {
                    this.result.geshui = 0.03 * jishui - 0;
                    this.result.shuilv = 3
                    this.result.susuankouchushu = 0
                } else if (36000 < jishui && jishui <= 144000) {
                    this.result.geshui = 0.1 * jishui - 2520;
                    this.result.shuilv = 10
                    this.result.susuankouchushu = 2520
                } else if (144000 < jishui && jishui <= 300000) {
                    this.result.geshui = 0.2 * jishui - 16920;
                    this.result.shuilv = 20
                    this.result.susuankouchushu = 16920
                } else if (300000 < jishui && jishui <= 420000) {
                    this.result.geshui = 0.25 * jishui - 31920;
                    this.result.shuilv = 25
                    this.result.susuankouchushu = 31920
                } else if (420000 < jishui && jishui <= 660000) {
                    this.result.geshui = 0.3 * jishui - 52920;
                    this.result.shuilv = 30
                    this.result.susuankouchushu = 52920
                } else if (660000 < jishui && jishui <= 960000) {
                    this.result.geshui = 0.35 * jishui - 85920;
                    this.result.shuilv = 35
                    this.result.susuankouchushu = 85920
                } else {
                    this.result.geshui = 0.45 * jishui - 181920;
                    this.result.shuilv = 45
                    this.result.susuankouchushu = 181920
                }
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
                this.form.leijiyuexin = newVal * ~~this.form.yuefen
            },
            'form.yuefen'(newVal) {
                this.form.leijiyuexin = ~~newVal * ~~this.form.yuexin
                this.form.leijikouchu = ~~newVal * this.form.kouchu
            },
            'form.kouchu'(newVal) {
                this.form.leijikouchu = newVal * ~~this.form.yuefen
            },
            'form.buzhu'(newVal) {
                this.form.gongjijinjine = this.form.yuexin - newVal
            },
            'form.type'(newVal) {
                this.reset()
            },

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
        min-width: 400px;
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
