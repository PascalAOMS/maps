import setUserLocation  from './setUserLocation'
import store, { state } from '../store'
import { fitInBounds }  from '@/lib/utils'

export function geocoding(userAddress) {

    const GEOCODER = new google.maps.Geocoder()

    let address = userAddress

    if( address.indexOf('berlin') < 0 ) {
        address = 'Berlin, ' + address
    }

    GEOCODER.geocode({ address }, (results, status) => {

        if( status !== 'OK' ) {
            alert(`Der Ort ${address} wurde nicht gefunden.`)
            return
        }


        let number,
            street,
            district

        let result = results[0].address_components

        for( let i = 0; i < result.length; i++ ) {
            if( result[i].types.includes('street_number') ) {
                number = result[i].long_name
            }
            if( result[i].types.includes('route') ) {
                street = result[i].long_name
            }
            if( result[i].types.includes('sublocality') ) {
                district = result[i].long_name
            }
        }

        let position = results[0].geometry.location,
            formattedAddress = `${street} ${number ? number : ''}, ${district}`

        setUserLocation(position, formattedAddress)

    })

}


export function autocompletion() {

    let input = document.getElementById('input-geocoding'),
        bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(52.693173, 13.763685),
            new google.maps.LatLng(52.298014, 13.018880)
        )

    let options = {
        bounds,
        //types: ['geocode'],
        componentRestrictions: { country: 'de' }
    }

    const AUTOCOMPLETE = new google.maps.places.Autocomplete(input, options)


    AUTOCOMPLETE.addListener('place_changed', () => {

        const place = AUTOCOMPLETE.getPlace()


        if( !place.geometry ) {
            return
        }

        let components = place.address_components,
            district

        for( let i = 0; i < components.length; i++ ) {
            if( components[i].types.includes('sublocality') ) {
                district = components[i].long_name
            }
        }

        let address = place.name + ', ' + district

        console.log(place);



        setUserLocation(place.geometry.location, address)

    })

}
