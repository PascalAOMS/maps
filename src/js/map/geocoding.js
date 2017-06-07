import { state } from '../store'


export default function(map, userAddress, userLocation) {

    console.log(state.locations);

    let address = this.userAddress

    if( address.indexOf('berlin') < 0 ) {
        address += ' berlin'
    }

    const GEOCODER = new google.maps.Geocoder()

    GEOCODER.geocode({ address }, (results, status) => {
        if( status === 'OK' ) {
            let position = results[0].geometry.location


            let userMarker = new google.maps.Marker({
                position,
                map: this.map,
                title: 'Ich bin hier!',
                icon: '../assets/img/pin-user.png'
            })


            if( this.userLocation ) {
                this.markers[this.markers.length - 1].setMap(null) // hide last marker which is user's
                this.markers.pop() // delete old user location
            }

            this.userLocation = position
            this.markers.push(userMarker)

            this.markers[this.markers.length - 1].setMap(this.map) // render all markers again
            this.map.setCenter(position)
        }
    })

}
