<template>

    <div>
        <div id="map"></div>


        <div class="container">

            <div class="row">


                <form class="col-6" @submit.prevent="geocoding()">
                    <input v-model="userAddress">
                </form>

                <select class="col-2" v-model="travelMode">
                    <option value="WALKING">zu Fuß</option>
                    <option value="TRANSIT">Bus/Bahn</option>
                    <option value="DRIVING">Auto</option>
                    <option value="BICYCLING">Fahrrad</option>
                </select>

                <button class="col-2" v-if="userLocation" @click="calcRoute()">Zeige Route</button>
                <button class="col-2" @click="geolocation()">Geolocation</button>

                <div class="col-4">
                    <router-link to="/" >Zeige alle Orte</router-link>
                    <router-view></router-view>
                </div>


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
import { fitInBounds } from '@/lib/utils'
import { EventBus } from '@/main'
import geolocation from '@/map/geolocation'
import geocoding from '@/map/geocoding'
import calcRoute from '@/map/calcRoute'


export default {
    data() {
        return {
            userAddress: 'tramper weg 1',
            travelMode: 'WALKING'
        }
    },

    computed: {
        map()          { return this.$store.getters.map },
        mapCenter()    { return this.$store.getters.mapCenter },
        locations()    { return this.$store.getters.locations },
        userLocation() { return this.$store.getters.userLocation },
        markers()      { return this.$store.getters.markers },
        focusedLocation() { return this.$store.getters.focusedLocation }
    },

    watch: {

        travelMode() {
            calcRoute(this.userLocation, this.focusedLocation, this.travelMode)
        }

    },

    created() {
        this.fetchLocations()
    },

    mounted() {





    },

    methods: {

        handleMap(process) {

            if( process === 'init' ) {
                let mapContainer = document.getElementById('map')

                const map = new google.maps.Map(mapContainer, {
                    //zoom: 6,
                    //center: this.mapCenter
                })

                store.commit('CREATE_MAP', map)
            }
            else if( process === 'resize' ) {
                google.maps.event.trigger(map, 'resize')
            }

            this.addLocationMarkers()
            //geolocation()

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

                fitInBounds(this.markers)
             }

        },

        // calcRoute() {
        //     let directionsService = new google.maps.DirectionsService(),
        //         directionsDisplay = new google.maps.DirectionsRenderer(),
        //         routePanel = document.getElementById('route-panel')
        //
        //
        //     directionsDisplay.setMap(this.map);
        //     directionsDisplay.setPanel(routePanel);
        //
        //
        //     let request = {
        //         origin: { lat: 51.1234, lng: 13.245 },
        //         destination: { lat: 52.1234, lng: 14.245 },
        //         travelMode: 'DRIVING'
        //     }
        //
        //     directionsService.route(request, (result, status) => {
        //         if (status == 'OK') {
        //             directionsDisplay.setDirections(result);
        //         }
        //     })
        //
        // },




            // let focusedLocation = this.locations[i]
            //
            // this.map.addMarker({
            //     lat: focusedLocation.lat,
            //     lng: focusedLocation.lng,
            //     icon,
            //     click(i) { // when in loop, set iterator to focus list item on marker click
            //         console.log(i);
            //     },
            //     infoWindow: {
            //         content: 'Hi'
            //     }
            // })
            //
            //
            // if( this.userLocation.lat !== null ) {
            //
            //     this.map.addMarker({
            //         lat: this.userLocation.lat,
            //         lng: this.userLocation.lng,
            //         icon: userIcon,
            //         infoWindow: userInfoWindow
            //     })
            //
            //     this.calcRoute(this.userLocation, focusedLocation)
            // }




        geocoding() { geocoding(this.userAddress) },
        calcRoute() { calcRoute(this.userLocation, this.focusedLocation, this.travelMode) },
        geolocation() { geolocation() },


    }




}
</script>
