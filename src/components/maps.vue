<template>

    <div>
        <div id="map" :class="{ 'is-larger': largeMap }"></div>

        <main class="container">

            <div class="row">

                <address-bar :travel-mode="travelMode"></address-bar>

                <button class="col-2" @click="geolocation()">Geolocation</button>
                <button class="col-2" @click="largeMap = !largeMap">Toggle Map Size</button>

                <div class="col-12">
                    <router-link to="/" >Zeige alle Orte</router-link>
                    <router-view></router-view>
                </div>


            </div>

        </main>

    </div>



</template>

<script>
import store from '@/store'
import { fitInBounds } from '@/lib/utils'
import { EventBus } from '@/main'
import geolocation from '@/map/geolocation'
import { autocompletion, geocoding } from '@/map/geocoding'
import calcRoute from '@/map/calcRoute'

import AddressBar from './AddressBar.vue'

export default {
    data() {
        return {
            travelMode: 'WALKING',
            largeMap: false,
        }
    },

    components: { AddressBar },

    computed: {
        map()          { return this.$store.getters.map },
        mapCenter()    { return this.$store.getters.mapCenter },
        locations()    { return this.$store.getters.locations },
        userAddress()  { return this.$store.getters.userAddress },
        userLocation() { return this.$store.getters.userLocation },
        markers()      { return this.$store.getters.markers },
        focusedLocation()    { return this.$store.getters.focusedLocation },
        directionsRenderer() { return this.$store.getters.directionsRenderer }
    },

    watch: {
        largeMap() {
            setTimeout(() => this.handleMap('resize'), 400)
        },
        travelMode() { store.commit('SET_TRAVELMODE', this.travelMode) }
    },



    created() {
        this.fetchLocations()
    },

    mounted() {


        autocompletion()


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

                this.addLocationMarkers()
            }
            else if( process === 'resize' ) {
                google.maps.event.trigger(this.map, 'resize')

                fitInBounds(this.focusedLocation
                                 ? [this.focusedLocation, this.userLocation]
                                 : this.markers
                            )
            }


            //geolocation() // ask for location after boot up

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


        geolocation() { geolocation(this.travelMode) },


    }




}
</script>
