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
import store from '@/store'
import { EventBus } from '@/main'
import geolocation from '@/map/geolocation'
import geocoding from '@/map/geocoding'


export default {
    data() {
        return {
            userAddress: 'tramper weg 1',
        }
    },

    computed: {
        map()          { return this.$store.getters.map },
        mapCenter()    { return this.$store.getters.mapCenter },
        locations()    { return this.$store.getters.locations },
        userLocation() { return this.$store.getters.userLocation },
        markers()      { return this.$store.getters.markers }
    },

    watch: {

    },

    created() {

        this.fetchLocations()

    },

    mounted() {

        //this.handleMap('init')
            //.then(() => geolocation())


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

        handleMap(process) {

            if( process === 'init' ) {
                let mapContainer = document.getElementById('map')

                const map = new google.maps.Map(mapContainer, {
                    zoom: 6,
                    center: this.mapCenter
                })

                store.commit('CREATE_MAP', map)
            }
            else if( process === 'resize' ) {
                google.maps.event.trigger(map, 'resize')
            }

            this.addLocationMarkers()
            geolocation()

        },

        fetchLocations() {
            fetch('../fuchs.json')
                .then(res => res.json())
                .then(res => store.commit('SET_LOCATIONS', res))
                .then(res => {
                    // check if map loaded once
                    this.handleMap(store.map ? 'resize' : 'init')
                })
        },

        addLocationMarkers() {

            for( let i = 0; i < this.locations.length; i++ ) {

                let lat = parseFloat(this.locations[i].lat),
                    lng = parseFloat(this.locations[i].lng)

                let marker = new google.maps.Marker({
                    position: { lat, lng },
                    map: this.map,
                    title: 'Hello!',
                    icon: '../assets/img/pin.png'
                })

                let infoWindow = new google.maps.InfoWindow({
                    content: this.locations[i].description,
                    maxWidth: 200
                })

                marker.addListener('click', () => {
                    //infoWindow.close()
                    infoWindow.open(this.map, marker)
                })

                store.commit('PUSH_MARKER_TO_LIST', marker)
             }

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
        geocoding() { geocoding(this.userAddress) },


    }




}
</script>
