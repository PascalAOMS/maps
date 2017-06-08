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

    let markerPositons = markers

    // if( markers === state.makers ) {
    //     markerPositions.map(marker => bound.extend(marker.getPosition))
    // }
    // else {
    //     markerPositions.map(marker => bounds.extend(marker[i]))
    // }

    markerPositons.map(marker => bounds.extend(marker.getPosition()))

    // for( let i = 0; i < markerPositons.length; i++ ) {
    //     bounds.extend(markers[i])
    // }
    state.map.fitBounds(bounds)
}
