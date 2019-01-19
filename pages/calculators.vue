<template>
    <div class="wrap">
        <el-col :span="6" class="left-nav" v-show="$store.state.nav">
            <el-menu
                default-active="individualIncomeTax"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="select">
                <!--<el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>-->
                <el-menu-item index="individualIncomeTax">
                    <!-- <i class="el-icon-menu"></i>-->
                    <span slot="title">个税计算2019</span>
                </el-menu-item>
                <el-menu-item index="houseLoan">
                    <!-- <i class="el-icon-document"></i>-->
                    <span slot="title">房贷计算</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <!-- <i class="el-icon-setting"></i>-->
                    <span slot="title">理财收益计算</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <span slot="title">敬请期待</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <span slot="title">敬请期待</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="18" class="main">
            <nuxt-child></nuxt-child>
        </el-col>
    </div>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {}
        },
        methods: {
            select(index, path, menuItem) {
                this.$store.commit('hideNav')
                this.$router.push('/calculators/' + index)
            }
        },
        created() {
        },
        mounted() {
            this.$router.push('/calculators/individualIncomeTax')
        },
    }
</script>
<style>
</style>
