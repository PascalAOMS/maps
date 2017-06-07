import { state } from '../store'


export default function(userAddress) {

    let address = userAddress

    if( address.indexOf('berlin') < 0 ) {
        address += ' berlin'
    }

    const GEOCODER = new google.maps.Geocoder()

    GEOCODER.geocode({ address }, (results, status) => {
        if( status === 'OK' ) {
            let position = results[0].geometry.location


            let userMarker = new google.maps.Marker({
                position,
                map: state.map,
                title: 'Ich bin hier!',
                icon: '../assets/img/pin-user.png'
            })

            if( state.userLocation ) {
                state.markers[state.markers.length - 1].setMap(null) // hide last marker which is user's
                state.markers.pop() // delete old user location
            }

            state.userLocation = position
            state.markers.push(userMarker)

            state.markers[state.markers.length - 1].setMap(state.map) // render all markers again
            state.map.setCenter(position)
        }
    })

}
