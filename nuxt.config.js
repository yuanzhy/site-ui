const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: 'tools',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: '小工具集合,提供json在线格式化,uuid生成,base64编解码,unicode转换,MD5,SHA计算,个税计算器,房贷计算器,诉费计算器'},
            {hid: 'keywords', name: 'keywords', content: '小工具集合,json格式化,uuid,base64,unicode,md5,个税计算器,房贷计算器,诉费计算器'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            /*{rel: 'stylesheet', href: 'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css'},
            {rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/muse-ui@3.0.1/dist/muse-ui.css'}*/
            // {rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css'}
            {rel: 'stylesheet', href: 'https://cdn.bootcss.com/element-ui/2.4.11/theme-chalk/index.css'}
        ],
        script: [
            /*{src: 'https://unpkg.com/muse-ui@3.0.1/dist/muse-ui.js'}*/
            // {src: 'https://unpkg.com/element-ui@2.4.11/lib/index.js'},
            // {src: 'https://cdn.bootcss.com/element-ui/2.4.11/index.js'},
            /*{src: 'https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js'},*/
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {color: '#fff'},

    /*
     ** Global CSS
     */
    css: [
        'assets/css/common.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/element-ui',
        // '~/plugins/codeMirror',
        '~/plugins/extension'
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios'
    ],
    /*
     ** Axios module configuration
     */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    /*
     ** Build configuration
     */
    build: {
        plugins: [
            new webpack.ProvidePlugin({
                // 'muse-ui': 'MuseUI'
                'element-ui': 'ELEMENT'
            })
        ],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {

        },
        // vendor:['element-ui']
    }
}
