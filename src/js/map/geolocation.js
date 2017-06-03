
export default function() {

    if( navigator.geolocation ) {

        navigator.geolocation.getCurrentPosition(position => {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            console.log(pos);
        })

    }

}
