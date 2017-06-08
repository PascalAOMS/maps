import store, { state } from '../store'

export default function(originData, destinationData, travelMode) {

    if( state.directionsRenderer ) {
        state.directionsRenderer.setMap(null)
        state.directionsRenderer.setPanel(null)
        store.commit('SET_DIRECTIONS_RENDERER', null)
    }


    let origin      = originData.getPosition(),
        destination = destinationData.getPosition()

    let directionsService = new google.maps.DirectionsService(),
        directionsRenderer = new google.maps.DirectionsRenderer()

    let request    = { origin, destination, travelMode },
        routePanel = document.getElementById('route-panel')

    directionsRenderer.setMap(state.map)
    directionsRenderer.setPanel(routePanel)
    directionsRenderer.setOptions({
        suppressMarkers: true
    })


    directionsService.route(request, (result, status) => {
        if( status == 'OK' ) {
            directionsRenderer.setDirections(result);
        }
    })

    store.commit('SET_DIRECTIONS_RENDERER', directionsRenderer)



}
