import calcRoute from './calcRoute'
import { geocoding } from './geocoding'
import setUserLocation from './setUserLocation'
import store, { state } from '../store'
import { fitInBounds } from '../lib/utils'

export default function(travelMode) {

    //google.maps.event.addListenerOnce(state.map, 'idle', () => {

        if( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition(pos => {

                let position = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }

                // reverse geocoding
                const GEOCODER = new google.maps.Geocoder()

                GEOCODER.geocode({ location: position }, (results, status) => {

                    let result = results[0].address_components,
                        street,
                        number,
                        district

                    for( let i = 0; i < result.length; i++ ) {
                        if( result[i].types.includes('route') ) {
                            street = result[i].long_name
                        }
                        if( result[i].types.includes('street_number') ) {
                            number = result[i].long_name
                        }
                        if( result[i].types.includes('sublocality') || result[i].types.includes('locality') ) {
                            district = result[i].long_name
                        }
                    }

                    let formattedAddress = `${street ? street : ''} ${number ? number : ''}${street ? ',' : ''} ${district}`

                    setUserLocation(position, formattedAddress)

                })

                //setUserLocation(position, 'address')


            }, function() {
                alert('Not supported.')
            })
        }

    //})

}
