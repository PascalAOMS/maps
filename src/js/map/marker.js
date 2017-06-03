
export class Marker {
    constructor(lat, lng, content) {
        this.lat = lat
        this.lng = lng
        this.content = content
    }

    add() {
        map.addMarker({
            lat: this.lat,
            lng: this.lng,
            infoWindow: {
                content: this.content
            } 
        })
    }

}
