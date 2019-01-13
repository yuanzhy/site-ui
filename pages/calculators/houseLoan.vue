<template>
    <el-row class="house_loan">
        <el-col :span="12" style="">
            <el-form ref="form" :model="form" label-width="140px">
                <!--<el-form-item label="收入类型">-->
                <el-radio-group v-model="form.dklx" style="margin: 15px 12px">
                    <el-radio label="1">商业贷款</el-radio>
                    <el-radio label="2">公积金贷款</el-radio>
                    <el-radio label="3">组合贷款</el-radio>
                </el-radio-group>
                <!--</el-form-item>-->
                <el-form-item label="商业贷款总额(万)" class="money" v-show="form.dklx !== '2'">
                    <el-input v-model.number="form.sydkze"><span slot="suffix">万元</span></el-input>
                </el-form-item>
                <el-form-item label="公积金贷款总额(万)" class="money" v-show="form.dklx !== '1'">
                    <el-input v-model.number="form.gjjdkze"><span slot="suffix">万元</span></el-input>
                </el-form-item>
                <el-form-item label="还款方式">
                    <el-radio-group v-model="form.hkfs">
                        <el-radio label="1">等额本息</el-radio>
                        <el-radio label="2">等额本金</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="还款年数">
                    <el-input v-model.number="form.hkns"><span slot="suffix">年</span></el-input>
                </el-form-item>
                <el-form-item label="商业贷款利率" v-show="form.dklx !== '2'">
                    <el-input v-model.number="form.sydkll"><span slot="suffix">%</span></el-input>
                </el-form-item>
                <el-form-item label="商业贷款折扣" v-show="form.dklx !== '2'">
                    <el-select v-model="form.sydkzk" placeholder="请选择">
                        <el-option
                            v-for="item in zk"
                            :key="item.value"
                            :label="item.label + '(' + (form.sydkll*item.value).roundToString(3) + '%)'"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公积金贷款利率" v-show="form.dklx !== '1'">
                    <el-input v-model.number="form.gjjdkll"><span slot="suffix">%</span></el-input>
                </el-form-item>
                <el-form-item label="公积金贷款折扣" v-show="form.dklx !== '1'">
                    <el-select v-model="form.gjjdkzk" placeholder="请选择">
                        <el-option
                            v-for="item in zk"
                            :key="item.value"
                            :label="item.label + '(' + (form.gjjdkll*item.value).roundToString(3) + '%)'"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首次还款日期" v-show="form.hkfs === '2'">
                    <el-date-picker
                        v-model="form.schkrq"
                        type="date"
                        placeholder="首次还款日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="calculate">计算</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12" v-show="result.myhk">
            <el-form ref="result" :model="result" label-width="115px">
                <el-form-item label="还款总额">
                    <span class="result_hk">{{result.hkze}}<span>万</span></span>
                </el-form-item>
                <el-form-item label="支付利息">
                    <span class="result_hk">{{result.zflx}}<span>万</span></span>
                </el-form-item>
                <el-form-item label="每月还款" v-if="typeof result.myhk === 'string'">
                    <div class="result_hk">{{result.myhk}}<span>元</span></div>
                </el-form-item>
                <div v-else>
                    <div style="text-align: center">每月还款</div>
                    <hr>
                    <el-form-item>
                            <div v-for="item in result.myhk">{{item}}元</div>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name: 'houseLoan',
        components: {},
        data() {
            return {
                form: {
                    dklx: '1',
                    sydkze: null,
                    gjjdkze: null,
                    hkfs: '1',
                    hkns: 30,
                    schkrq: new Date(),
                    sydkll: 4.9,
                    sydkzk: 1,
                    gjjdkll: 3.25,
                    gjjdkzk: 1,
                },
                result: {
                    myhk: null, // 每月还款
                    hkze: null, // 还款总额
                    zflx: null, // 支付利息
                },
                zk: [
                    {value: 0.7, label: '0.7折'},
                    {value: 0.8, label: '0.8折'},
                    {value: 0.83, label: '8.3折'},
                    {value: 0.85, label: '8.5折'},
                    {value: 0.88, label: '8.8折'},
                    {value: 0.9, label: '9折'},
                    {value: 0.95, label: '9.5折'},
                    {value: 1, label: '基准利率'},
                    {value: 1.05, label: '1.05倍'},
                    {value: 1.1, label: '1.1倍'},
                    {value: 1.15, label: '1.15倍'},
                    {value: 1.2, label: '1.2倍'},
                    {value: 1.25, label: '1.25倍'},
                    {value: 1.3, label: '1.3倍'},
                    {value: 1.35, label: '1.35倍'},
                    {value: 1.4, label: '1.4倍'},
                ]
            }
        },
        computed: {},
        methods: {
            calculate() {
                let s = 100
                if (this.form.hkns < 1 || this.form.hkns > 30) {
                    this.$message.warning('还款年数只能是1~30')
                    return
                }
                this.reset()
                if (this.form.hkfs === '1') {
                    this.calcDebx()
                } else if (this.form.hkfs === '2') {
                    this.calcDebj()
                }

            },
            calcDebx() { //
                // 等额本息: 每月还款额=贷款本金×[月利率×(1+月利率) ^ 还款月数]÷{[(1+月利率) ^ 还款月数]-1}
                // 每月应还利息=贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
                // 每月应还本金=贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
                // 总利息=还款月数×每月月供额-贷款本金
                const hkys = this.form.hkns * 12 // 还款月数
                // 商业贷款
                let bj = (this.form.sydkze || 0) * 10000 * (this.form.dklx !== '2')
                let yll = this.form.sydkll * this.form.sydkzk / 100 / 12 // 月利率
                let pow = Math.pow(yll + 1, hkys)
                let result = bj * yll * pow / (pow - 1)
                // 公积金贷款
                let bj2 = (this.form.gjjdkze || 0) * 10000 * (this.form.dklx !== '1')
                let yll2 = this.form.gjjdkll * this.form.gjjdkzk / 100 / 12 // 月利率
                let pow2 = Math.pow(yll2 + 1, hkys)
                let result2 = bj2 * yll2 * pow2 / (pow2 - 1)

                this.result.myhk = (result + result2).roundToString(2)
                this.result.hkze = ((result * hkys + result2 * hkys) / 10000).roundToString(2)
                this.result.zflx = (((result * hkys - bj) + (result2 * hkys - bj2) ) / 10000).roundToString(2)
            },
            calcDebj() {
                // 每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
                // 每月应还本金=贷款本金÷还款月数
                // 每月应还利息=剩余本金×月利率=(贷款本金-已归还本金累计额)×月利率
                // 每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
                // 总额=还款月数×(总贷款额×月利率-月利率×(总贷款额÷还款月数)*(还款月数-1)÷2+总贷款额÷还款月数)
                // 月利率=年利率÷12
                const hkys = this.form.hkns * 12 // 还款月数
                // 商业贷款
                const bj = this.form.sydkze * 10000 * (this.form.dklx !== '2')
                const yll = this.form.sydkll * this.form.sydkzk / 100 / 12 // 月利率
                const myyhbj = bj / hkys // 每月应还本金
                const dje = myyhbj * yll // 递减额
                const syhk = bj * yll + myyhbj // 首月还款
                let ze = hkys * (bj * yll - yll * bj / hkys * (hkys - 1) / 2 + bj / hkys)
                let yg = [] // 月供
                for (let i = 0; i < hkys; i++) {
                    yg.push(syhk - dje * i)
                }
//                // 公积金贷款
                const bj2 = this.form.gjjdkze * 10000 * (this.form.dklx !== '1')
                const yll2 = this.form.gjjdkll * this.form.gjjdkzk / 100 / 12 // 月利率
                const myyhbj2 = bj2 / hkys // 每月应还本金
                const dje2 = myyhbj2 * yll2 // 递减额
                const syhk2 = bj2 * yll2 + myyhbj2 // 首月还款
                let ze2 = hkys * (bj2 * yll2 - yll2 * bj2 / hkys * (hkys - 1) / 2 + bj2 / hkys)
                let date = new Date(this.form.schkrq)
                date.setMonth(date.getMonth() - 1)
                for (let i = 0; i < hkys; i++) {
                    yg[i] = new Date(date.setMonth(date.getMonth() + 1)).format('yyyy年MM月dd日') + ': ' +
                    (yg[i] + syhk2 - dje2 * i).roundToString(2)
                }
                // result
                this.result.myhk = yg
                this.result.hkze = ((ze + ze2) / 10000).roundToString(2)
                this.result.zflx = ((ze - bj + ze2 - bj2) / 10000).roundToString(2)
            },
            reset() {
                this.result = {
                    myhk: null, // 每月还款
                    hkze: null, // 还款总额
                    zflx: null, // 支付利息
                }
            },
        },
        created() {
        },
        mounted() {
        },
    }
</script>
<style>
    .house_loan {

    }

    .house_loan .el-input {
        width: 190px;
    }

    .house_loan .money label {
        color: orange;
    }

    .house_loan .result_hk {
        color: orangered;
        font-size: 24px;
    }
    .house_loan .result_hk span {
        font-size: 14px;
    }
</style>
