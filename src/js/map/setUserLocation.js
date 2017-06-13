import store, { state } from '../store'
import calcRoute from './calcRoute'
import { fitInBounds }  from '@/lib/utils'

export default function(position, address) {

    let marker = new google.maps.Marker({
        user: true,
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

    if( state.userLocation )
        state.userLocation.setMap(null) // remove old position

    marker.setMap(state.map)

    store.commit('SET_USER_ADDRESS', address) // printed address
    store.commit('SET_USER_LOCATION', marker) // location object

    infoWindow.open(state.map, marker)
    setTimeout(() => infoWindow.close(state.map), 2000)

    fitInBounds(state.focusedLocation
                    ? [state.focusedLocation, marker]
                    : [...state.markers, marker]
                )

    if( state.directionsRenderer ) {
        calcRoute(state.userLocation, state.focusedLocation)
    }

}
