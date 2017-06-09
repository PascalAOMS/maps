import store from '../store'

export default function(origin, destination, travelMode) {

    const distancService = new google.maps.DistanceMatrixService()

    distancService.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode
    }, (response, status) => {

        if (status !== 'OK') {
            return alert('Error was: ' + status)
        }

        let originList      = response.originAddresses,
            destinationList = response.destinationAddresses

        let distance = response.rows[0].elements[0].distance.text,
            duration = response.rows[0].elements[0].duration.text


        store.commit('SET_ROUTE_META', { distance, duration })

    })


}
