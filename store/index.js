/**
 * Created by yuanzhy on 2019/1/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

    state: {
        mobile: false,
        nav: false
    },
    mutations: {
        showMobile (state) {
            state.mobile = true
        },
        showNav (state) {
            state.nav = true
        },
        hideNav (state) {
            if (state.mobile) {
                state.nav = false
            }
        },
    }
})

export default store
