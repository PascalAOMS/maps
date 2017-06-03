import gmaps from 'gmaps'

export default function(map) {

    let address = document.getElementById('input-address')



    gmaps.geocode({
        address,
        callback(results, status) {
            console.log(status);
            if( status == 'OK' ) {
                console.log(results);
                let latlng = results[0].geometry.location

                map.setCenter(latlng.lat(), latlng.lng())
                map.addMarker({
                    lat: latlng.lat(),
                    lng: latlng.lng()
                })
            }

        }
    })

}
