import Vue  from 'vue'
import Vuex from 'vuex'
import actions   from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export let state = {
    map: null,
    mapCenter: { lat: 52.507629, lng: 13.1459666 },
    locations: [],
    locationFocused: false,
    focusedLocation: null,
    userAddress: null,
    userLocation: null,
    markers: [],
    directionsRenderer: null
}


const getters = {
    map: state => state.map,
    markers: state => state.markers,
    locations: state => state.locations,
    focusedLocation: state => state.focusedLocation,
    userLocation: state => state.userLocation,
    mapCenter: state => state.mapCenter,
    directionsRenderer: state => state.directionsRenderer,
}



export default new Vuex.Store({ state, getters, mutations, actions })
