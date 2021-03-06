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
    focusedIndex: null,
    focusedLocation: null,
    userAddress: null, // printed address
    userLocation: null, // location object
    markers: null,
    directionsRenderer: null,
    route: null,
    travelMode: 'TRANSIT'
}


const getters = {
    map: state => state.map,
    markers: state => state.markers,
    locations: state => state.locations,
    focusedIndex: state => state.focusedIndex,
    focusedLocation: state => state.focusedLocation,
    userLocation: state => state.userLocation,
    userAddress: state => state.userAddress,
    mapCenter: state => state.mapCenter,
    directionsRenderer: state => state.directionsRenderer,
    route: state => state.route,
    travelMode: state => state.travelMode,
}



export default new Vuex.Store({ state, getters, mutations, actions })
