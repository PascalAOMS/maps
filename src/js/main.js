import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import store from './store'
import Maps from '../components/Maps.vue'
import LocationCards from '../components/LocationCards.vue'
import LocationDetail from '../components/LocationDetail.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)

window.history.pushState('', '', '/')

Vue.config.productionTip = false

const routes = [
    { path: '/', component: LocationCards },
    { path: '/ort/:location', component: LocationDetail }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    el: '#app',
    store,
    router,
    components: { Maps },
    template: '<Maps/>',
    data: {

    },

    created() {


    },

    methods: {

    }

})
