<template>
    <div class="container">
        <h1 v-if="error && error.statusCode === 404">页面不存在</h1>
        <h1 v-else>应用异常</h1>
        <br>
        <nuxt-link to="/">首 页</nuxt-link>
    </div>
</template>

<script>
    export default {
        props: ['error'],
//        layout: 'blog' // 你可以为错误页面指定自定义的布局
    }
</script>
<style>
    .container{
        text-align: center;
    }
</style>
