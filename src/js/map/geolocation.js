import store, { state } from '../store'
import { fitInBounds } from '../lib/utils'

export default function() {

    //google.maps.event.addListenerOnce(state.map, 'idle', () => {

        if( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition(pos => {

                let position = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }

                let marker = new google.maps.Marker({
                    position: { lat: position.lat, lng: position.lng },
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

                store.commit('SET_USER_LOCATION', marker)
                store.commit('PUSH_MARKER_TO_LIST', marker)

                infoWindow.open(state.map, marker)
                setTimeout(() => infoWindow.close(state.map), 2000)

                fitInBounds(state.focusedLocation
                                 ? [state.focusedLocation, marker]
                                 : state.markers
                            )


            }, function() {
                alert('Not supported.')
            })
        }

    //})

}
