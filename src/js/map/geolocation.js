import gmaps from 'gmaps'

export default function(map) {

    gmaps.geolocate({
        success(position) {

            let lat = position.coords.latitude,
                lng = position.coords.longitude,
                content = 'Ich bin hier!'

            map.addMarker({ lat, lng, infoWindow: { content } })
        },
        error(error) {
            console.log('Geolocation failed: '+ error.message)
        },
        not_supported() {
            console.log('Your browser does not support geolocation.')
        },
        always() {
            console.log('Done!')
        }
    })

}
