import calcDistance from './calcDistance'
import store, { state } from '../store'

export default function(originData, destinationData) {

    store.commit('SET_ROUTE_META', null) // reset meta when switching locations/tavel mode

    if( state.directionsRenderer ) { // remove old direction lines
        state.directionsRenderer.setMap(null)
        state.directionsRenderer.setPanel(null)
        store.commit('SET_DIRECTIONS_RENDERER', null)
    }

    const directionsService  = new google.maps.DirectionsService()
    const directionsRenderer = new google.maps.DirectionsRenderer()

    let origin      = originData.getPosition(),
        destination = destinationData.getPosition(),
        request     = { origin, destination, travelMode: state.travelMode }

    const directionsContainer  = document.getElementById('route-directions')

    store.commit('SET_DIRECTIONS_RENDERER', directionsRenderer)

    directionsRenderer.setMap(state.map)
    directionsRenderer.setPanel(directionsContainer)
    directionsRenderer.setOptions({
        suppressMarkers: true
    })


    directionsService.route(request, (result, status) => {
        if( status == 'OK' ) {
            directionsRenderer.setDirections(result)
            calcDistance(origin, destination)
        }
    })




}
