import { state } from '@/store'

// Capitalize Strings - src.capitalize()
String.prototype.capitalize = function() {
    return this.replace(/\b\w/g, l => l.toUpperCase())
}


// Wait for CSS Background Images for be loaded
export function getLoadedBackground(src, cb) {

    let url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,''),
        img = new Image()

    img.onload = () => cb()

    img.src = url
    if( img.complete ) img.onload()

}

// Hide/Show markers on map
export function setMapOnAll(markers, map) {
    for( let i = 0; i < markers.length; i++ ) {
        markers[i].setMap(map);
    }
}


export function fitInBounds(markers) {
    const bounds = new google.maps.LatLngBounds()

    for( let i = 0; i < markers.length; i++ ) {
        if( markers[i] === null ) continue // when in detail view w/o user location

        bounds.extend(markers[i].getPosition())
    }

    state.map.fitBounds(bounds)

    // when in location focus, map bound zooms to far in when no user location
    if( !state.userLocation && state.focusedLocation ) {
        state.map.setZoom(13)
    }
}
