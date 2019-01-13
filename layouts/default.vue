<template>
    <div>
        <div id="nav-header" class="navbar" data-type="article" data-infoid="14 ">
            <ul class="nav">
                <!--<li id="nvabar-item-index"><a href="https://www.xmfhost.com/">首页</a></li>
                <li id="navbar-page-2"><a href="https://www.xmfhost.com/?id=2">留言本（友链申请）</a></li>
                <li id="navbar-category-2"><a href="https://www.xmfhost.com/?cate=2">免费云主机</a></li>
                <li id="navbar-category-4"><a href="https://www.xmfhost.com/?cate=4">电脑知识</a></li>-->
                <li id="navbar-category-8"><nuxt-link to="/programmerTools">程序员小工具</nuxt-link></li>
                <li id="navbar-category-12"><nuxt-link to="/calculators">计算工具</nuxt-link></li>
            </ul>
        </div>
        <nuxt/>
    </div>
</template>

<style>
    html {
        font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
        margin: 0;
    }
    .nuxt-link-active {
        background-color: #777;
    }

</style>
