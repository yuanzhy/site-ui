<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="当前时间:">
            <!--<el-tag @click="copyNow">{{result.now}}</el-tag>-->
            <el-button @click="copyNow">{{result.now}}</el-button>
            <el-button @click="timestamp_now" v-show="!timer">开始</el-button>
            <el-button @click="stopTimer" v-show="timer">停止</el-button>
        </el-form-item>
        <el-form-item label="时间戳:">
            <el-col :span="6">
                <el-input v-model="form.timestamp1"></el-input>
            </el-col>
            <el-col :span="2">
                <el-select v-model="form.type1">
                    <el-option label="秒" value="second"></el-option>
                    <el-option label="毫秒" value="millisecond"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="transform">转换&gt;&gt;</el-button>
            </el-col>
            <el-col :span="6">
                <el-input v-model="form.date1"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="时间:">
            <el-col :span="6">
                <el-date-picker
                    v-model="form.date2"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="transform2">转换&gt;&gt;</el-button>
            </el-col>
            <el-col :span="6">
                <el-input v-model="form.timestamp2"></el-input>
            </el-col>
            <el-col :span="2">
                <el-select v-model="form.type2">
                    <el-option label="秒" value="second"></el-option>
                    <el-option label="毫秒" value="millisecond"></el-option>
                </el-select>
            </el-col>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'timestamp',
        data() {
            return {
                timer: '',
                form: {
                    timestamp1: '',
                    timestamp2: '',
                    date1: '',
                    date2: '',
                    type1: 'second',
                    type2: 'second'
                },
                result: {
                    now: ''
                },
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }]
                }
            }
        },
        methods: {
            transform() {
                let timestamp = this.form.timestamp1 + ''
                timestamp = timestamp.replace(/^\s+|\s+$/, '')
                if (!/^\d+$/.test(timestamp)) {
                    alert('时间戳格式不正确')
                    return
                }
                timestamp *= 1
                if (this.form.type1 == 'second') {
                    timestamp *= 1000
                }
                this.form.date1 = new Date(timestamp).format('yyyy-MM-dd hh:mm:ss')
            },
            transform2() {
                if (this.form.date2 == '') {
                    alert('请选择时间')
                    return
                }
                var time = new Date(this.form.date2)
                if (this.form.type2 == 'millisecond') {
                    this.form.timestamp2 = time.getTime()
                } else {
                    this.form.timestamp2 = time.getTime() / 1000
                }
            },
            timestamp_now() {
                var _this = this
                let now = Math.round(new Date() / 1000)
                this.timer = setInterval(function() {
                    var now = Math.round(new Date() / 1000)
                    _this.result.now = now
                }, 1000)
            },
            copyNow() {
                this.form.timestamp1 = this.result.now
            },
            stopTimer() {
                if (this.timer) clearInterval(this.timer)
                this.timer = ''

            }
        },
        mounted() {
            this.timestamp_now()
        }
    }
</script>

<style scoped>

</style>
