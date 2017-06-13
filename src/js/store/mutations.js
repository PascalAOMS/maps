
export default {
    SET_LOCATIONS(state, locations) {
        state.locations = locations
    },
    SET_USER_LOCATION(state, location) {
        state.userLocation = location
    },
    SET_USER_ADDRESS(state, address) {
        state.userAddress = address
    },
    SET_FOCUSED_LOCATION(state, location) {
        state.focusedIndex    = location.index
        state.focusedLocation = location.marker
    },
    CREATE_MAP(state, map) {
        state.map = map
    },
    PUSH_MARKER_TO_LIST(state, marker) {
        state.markers.push(marker)
    },
    SET_DIRECTIONS_RENDERER(state, renderer) {
        state.directionsRenderer = renderer
    },
    SET_ROUTE_META(state, meta) {
        state.route = meta
    },
    SET_TRAVELMODE(state, mode) {
        state.travelMode = mode
    },
}
