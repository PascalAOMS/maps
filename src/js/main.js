import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Maps from '../components/maps.vue'
import LocationCards from '../components/LocationCards.vue'
import LocationDetail from '../components/LocationDetail.vue'

Vue.use(VueRouter)


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
    data: {

    },

    created() {


    },

    methods: {

    }

})
