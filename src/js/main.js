import './map/marker'
import geolocation from './map/geolocation'
import { styles } from './map/styles'

function initMap() {
	let mapCanvas  = document.getElementById('map'),
		mapOptions = {
			center: new google.maps.LatLng(52.507629,13.1459666),
			zoom: 8,
			disableDefaultUI: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		map = new google.maps.Map(mapCanvas, mapOptions)

    //marker

    map.set('styles', styles)
}

google.maps.event.addDomListener(window, 'load', initMap);
