import Vue from 'vue'
import Maps from '../components/maps.vue'
import store from './store'


export const EventBus = new Vue()


new Vue({
    el: '#app',
    store,
    components: { Maps },
    data: {

    },

    created() {


    },

    methods: {

    }

})
