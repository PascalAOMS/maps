import store, { state } from '../store'
import { fitInBounds }  from '@/lib/utils'

export default function(position, address) {

    let marker = new google.maps.Marker({
        position,
        map: state.map,
        title: 'Ich bin hier!',
        icon: '../assets/img/pin-user.png'
    })

    let infoWindow = new google.maps.InfoWindow({
        content: 'Ich bin hier!',
        maxWidth: 200
    })

    marker.addListener('click', () => {
        //infoWindow.close()
        infoWindow.open(state.map, marker)
    })


    if( state.userLocation ) {
        state.markers[state.markers.length - 1].setMap(null) // hide last marker which is user's
        state.markers.pop() // delete old user location
    }

    console.log(address);

    store.commit('SET_USER_ADDRESS', address)
    store.commit('SET_USER_LOCATION', marker)
    store.commit('PUSH_MARKER_TO_LIST', marker)

    state.markers[state.markers.length - 1].setMap(state.map) // render all markers again

    infoWindow.open(state.map, marker)
    setTimeout(() => infoWindow.close(state.map), 2000)


    fitInBounds(state.focusedLocation
                     ? [state.focusedLocation, marker]
                     : state.markers
                )

}
