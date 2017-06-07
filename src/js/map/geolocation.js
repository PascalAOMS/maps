import store, { state } from '../store'

export default function() {

    google.maps.event.addListenerOnce(state.map, 'idle', () => {

        if( navigator.geolocation ) {

            navigator.geolocation.getCurrentPosition(pos => {
                let position = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }

                let marker = new google.maps.Marker({
                    position: { lat: position.lat, lng: position.lng },
                    map: state.map,
                    title: 'Ich bin hier!',
                    icon: '../assets/img/pin-user.png'
                })

                let infoWindow = new google.maps.InfoWindow({
                    content: 'Ich bin hier!',
                    maxWidth: 200
                })

                marker.addListener('click', () => {
                    //infoWindow.close()
                    infoWindow.open(state.map, marker)
                })

                store.commit('PUSH_MARKER_TO_LIST', marker)
                state.map.setCenter(position)
                state.map.setZoom(10)
                infoWindow.open(state.map, marker)

                setTimeout(() => {
                    infoWindow.close(state.map)
                }, 2000)

                setTimeout(() => {
                    state.map.setCenter(state.mapCenter)
                    state.map.setZoom(6)
                }, 3000)

            }, function() {
                alert('Not supported.')
            })
        }

    })

}
