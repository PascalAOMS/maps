
export default {
    SET_LOCATIONS(state, locations) {
        state.locations = locations
    },
    CREATE_MAP(state, map) {
        state.map = map
    },
    PUSH_MARKER_TO_LIST(state, marker) {
        state.markers.push(marker)
    }
}
