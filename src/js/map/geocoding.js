
export default function(map, userAddress, userLocation) {



    let address = userAddress

    if( address.indexOf('berlin') < 0 ) {
        address += ' berlin'
    }

    const GEOCODER = new google.maps.Geocoder()

    GEOCODER.geocode({ address }, (results, status) => {
        if( status === 'OK' ) {
            let position = results[0].geometry.location

            map.setCenter(position)

            let marker = new google.maps.Marker({
                position,
                map,
                title: 'Ich bin hier!',
                icon: '../assets/img/pin-user.png'
            })
        }
    })

}
