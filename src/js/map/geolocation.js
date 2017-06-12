import calcRoute from './calcRoute'
import setUserLocation from './setUserLocation'
import store, { state } from '../store'
import { fitInBounds } from '../lib/utils'

export default function(travelMode) {

    //google.maps.event.addListenerOnce(state.map, 'idle', () => {

        if( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition(pos => {

                console.log(pos);

                let position = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }

                // NEEDS REVERSE GEOCODING

                setUserLocation(position, 'address')


            }, function() {
                alert('Not supported.')
            })
        }

    //})

}
