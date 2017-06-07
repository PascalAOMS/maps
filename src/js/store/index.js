import Vue  from 'vue'
import Vuex from 'vuex'
import actions   from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export let state = {
    map: null,
    mapCenter: { lat: 52.507629, lng: 13.1459666 },
    locations: 'test',
    userAddress: null,
    userLocation: null,
    markers: [],
}


const getters = {
    map: state => state.map,
    locations: state => state.locations,
    mapCenter: state => state.mapCenter,
}



export default new Vuex.Store({ state, getters, mutations, actions })
