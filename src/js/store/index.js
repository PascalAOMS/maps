import Vue  from 'vue'
import Vuex from 'vuex'
import actions   from './actions'
import mutations from './mutations'

Vue.use(Vuex)

let state = {
    locations: 'test'
}


const getters = {
    locations: state => state.locations
}



export default new Vuex.Store({ state, getters, mutations, actions })
