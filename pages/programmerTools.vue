<template>
    <div class="wrap">
        <el-col :span="6" style="padding-right: 30px">
            <el-menu
                default-active="2"
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
                <el-menu-item index="uuid">
                    <!-- <i class="el-icon-menu"></i>-->
                    <span slot="title">UUID生成</span>
                </el-menu-item>
                <el-menu-item index="jsonFormat">
                    <!-- <i class="el-icon-document"></i>-->
                    <span slot="title">JSON格式化</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <!-- <i class="el-icon-setting"></i>-->
                    <span slot="title">UNIX时间戳转换</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <span slot="title">HASH计算/MD5/SHA</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <span slot="title">ASCII码表</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="18" style="background: #fafafa; padding: 15px 22px;">
            <nuxt-child></nuxt-child>
        </el-col>
    </div>
</template>
<script>
    import NuxtChild from "../.nuxt/components/nuxt-child";
    export default {
        name: '',
        components: {NuxtChild},
        data() {
            return {}
        },
        methods: {
            select(index, path, menuItem) {
                this.$router.push('/programmerTools/' + index)
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>
<style>
</style>
