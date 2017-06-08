
export default {
    SET_LOCATIONS(state, locations) {
        state.locations = locations
    },
    SET_USER_LOCATION(state, userLocation) {
        state.userLocation = userLocation
    },
    SET_FOCUSED_LOCATION(state, location) {
        state.focusedLocation = location
    },
    CREATE_MAP(state, map) {
        state.map = map
    },
    PUSH_MARKER_TO_LIST(state, marker) {
        state.markers.push(marker)
    },
    SET_DIRECTIONS_RENDERER(state, renderer) {
        state.directionsRenderer = renderer
    }
}
