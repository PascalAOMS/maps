<template>

    <div>
        <div id="map"></div>


        <div class="container">

            <div class="row">


                <form class="col-12" @submit.prevent="geocoding">
                    <input v-model="userAddress">
                </form>

                <ul class="col-4">
                    <!-- <li v-for="(location, i) in locations" @click="focusLocation(i)">
                        <b>{{ location.name }}</b><br>
                        {{ location.description }}

                        <hr>
                    </li> -->
                </ul>

                <div id="route-panel" class="col-8"></div>

                <div class="button-row">
                    <!-- <button @click="closeDetail()">Close Detail</button> -->
                </div>


            </div>

        </div>


    </div>



</template>

<script>

import { EventBus } from '@/main'
import { setMapOnAll } from '@/map/helpers'
import geolocation from '@/map/geolocation'
import geocoding from '@/map/geocoding'

const icon = '../assets/img/pin.png'




export default {
    data() {
        return {
            map: null,
            locations: [],
            userLocation: null,
            userAddress: 'tramper weg 1',
            markers: []
        }
    },

    watch: {

    },

    created() {

        this.fetchLocations()

    },

    mounted() {

        this.initMap()



        // let directionsService = new google.maps.DirectionsService(),
        //     directionsDisplay,
        //     map
        //
        // function initialize() {
        //     directionsDisplay = new google.maps.DirectionsRenderer();
        //     var chicago = new google.maps.LatLng(41.850033, -87.6500523);
        //     var mapOptions = {
        //         zoom:7,
        //         center: chicago
        //     }
        //     map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //     directionsDisplay.setMap(map);
        //     directionsDisplay.setPanel(document.getElementById('route-panel'));
        // }
        //
        // function calcRoute() {
        //     var request = {
        //         origin: { lat: 51.1234, lng: 13.245 },
        //         destination: { lat: 52.1234, lng: 14.245 },
        //         travelMode: 'DRIVING'
        //     }
        //
        //     directionsService.route(request, function(result, status) {
        //         if (status == 'OK') {
        //             directionsDisplay.setDirections(result);
        //         }
        //     })
        // }
        //
        // initialize()
        // calcRoute()
            //geocoding(map)



    },

    methods: {

        initMap() {
            let mapContainer = document.getElementById('map')

            this.map = new google.maps.Map(mapContainer, {
                zoom: 6,
                center: { lat: 52.507629, lng: 13.1459666 }
            })

            this.addLocationMarkers()


        },

        resizeMap() {
            google.maps.event.trigger(map, 'resize')
            this.addLocationMarkers()
        },

        fetchLocations() {
            fetch('../fuchs.json')
                .then(res => res.json())
                .then(res => this.locations = res)
                .then(() => {

                    if( this.map ) { // check if map loaded once
                        return this.resizeMap()
                    }

                    return this.initMap()
                })
        },

        addLocationMarkers() {
            this.locations.map(location => {

                let marker = new google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map: this.map,
                    title: 'Hello World!',
                    icon
                })

                let infoWindow = new google.maps.InfoWindow({
                    content: location.description,
                    maxWidth: 200
                })

                marker.addListener('click', () => {
                    //infoWindow.close()
                    infoWindow.open(this.map, marker)
                })

                this.markers.push(marker)
            })

        },

        // focusLocation(i) {
        //     this.map.removeMarkers()
        //
        //     let focusedLocation = this.locations[i]
        //
        //     this.map.addMarker({
        //         lat: focusedLocation.lat,
        //         lng: focusedLocation.lng,
        //         icon,
        //         click(i) { // when in loop, set iterator to focus list item on marker click
        //             console.log(i);
        //         },
        //         infoWindow: {
        //             content: 'Hi'
        //         }
        //     })
        //
        //
        //     if( this.userLocation.lat !== null ) {
        //
        //         this.map.addMarker({
        //             lat: this.userLocation.lat,
        //             lng: this.userLocation.lng,
        //             icon: userIcon,
        //             infoWindow: userInfoWindow
        //         })
        //
        //         this.calcRoute(this.userLocation, focusedLocation)
        //     }
        // },
        //
        //
        //
        geocoding() {
            let address = this.userAddress

            if( address.indexOf('berlin') < 0 ) {
                address += ' berlin'
            }

            const GEOCODER = new google.maps.Geocoder()

            GEOCODER.geocode({ address }, (results, status) => {
                if( status === 'OK' ) {
                    let position = results[0].geometry.location


                    let userMarker = new google.maps.Marker({
                        position,
                        map: this.map,
                        title: 'Ich bin hier!',
                        icon: '../assets/img/pin-user.png'
                    })

                    setMapOnAll(this.markers, null)

                    if( this.userLocation )
                        this.markers.pop() // delete old user location

                    this.userLocation = position
                    this.markers.push(userMarker)

                    setMapOnAll(this.markers, this.map) // render all markers again
                    this.map.setCenter(position)
                }
            })
        },


    }




}
</script>
