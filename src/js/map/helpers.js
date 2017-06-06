

export function setMapOnAll(markers, map) {
    for( let i = 0; i < markers.length; i++ ) {
        markers[i].setMap(map);
    }
}
