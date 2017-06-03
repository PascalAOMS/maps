import gmaps from 'gmaps'
import Marker from './marker'
import geolocation from './geolocation'
import geocoding from './geocoding'
import { styles } from './styles'

export const map = new gmaps({
    div: '#map',
    lat: 52.507629,
    lng: 13.1459666,
    zoom: 9
})

map.addMarker({
    lat: 52.507629,
    lng: 13.1459666,
    infoWindow: {
        content: 'Hit'
    }
})

let addButton = document.getElementById('add-marker')

addButton.addEventListener('click', () => {

    map.addMarker({
        lat: 52.657629,
        lng: 13.1569666,
        infoWindow: {
            content: 'Hit'
        }
    })

})


geolocation(map)
geocoding(map)
