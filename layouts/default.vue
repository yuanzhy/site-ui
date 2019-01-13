<template>
    <div :class="{mobile: $store.state.mobile}">
        <div id="nav-header" class="navbar" data-type="article" data-infoid="14 ">
            <a class="mobile-nav" v-if="$store.state.mobile" @click="toggleNav"></a>
            <ul class="nav">
                <!--<li id="nvabar-item-index"><a href="https://www.xmfhost.com/">首页</a></li>
                <li id="navbar-page-2"><a href="https://www.xmfhost.com/?id=2">留言本（友链申请）</a></li>
                <li id="navbar-category-2"><a href="https://www.xmfhost.com/?cate=2">免费云主机</a></li>
                <li id="navbar-category-4"><a href="https://www.xmfhost.com/?cate=4">电脑知识</a></li>-->
                <li id="navbar-category-8">
                    <nuxt-link to="/programmerTools">程序员小工具</nuxt-link>
                </li>
                <li id="navbar-category-12">
                    <nuxt-link to="/calculators">计算工具</nuxt-link>
                </li>
            </ul>
        </div>
        <nuxt/>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        components: {},
        methods: {
            isMobile() {
                var sUserAgent = navigator.userAgent.toLowerCase();
                var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                var bIsAndroid = sUserAgent.match(/android/i) == "android";
                var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
            },
            toggleNav() {
                if (this.$store.state.nav) {
                    this.$store.commit('hideNav')
                } else {
                    this.$store.commit('showNav')
                }
            }
        },
        created() {
            const isMobile = this.isMobile()
            if (isMobile) {
                this.$store.commit('showMobile')
            } else {
                this.$store.commit('showNav')
            }
        }
    }
</script>
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
    .mobile .el-col-12{
        width: 100%;
    }
</style>
