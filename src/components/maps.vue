<template>

    <div class="map-wrap">

        <div class="map-container">
            <div id="map"></div>

        </div>


        <main class="sidebar">

            <address-bar></address-bar>

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>


        </main>

    </div>



</template>

<script>
import store from '@/store'
import { setMapOnAll, fitInBounds } from '@/lib/utils'
import onResize from '@/lib/onResize'
import scrollMap from '@/map/scrollMap'
import { autocompletion, geocoding } from '@/map/geocoding'
import calcRoute from '@/map/calcRoute'
import { styles } from '@/map/styles'

import AddressBar from './AddressBar.vue'

export default {
    data() {
        return {
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
        travelMode() { store.commit('SET_TRAVELMODE', this.travelMode) },
    },



    created() {

        document.body.addEventListener('scroll', () => {

        })
    },

    mounted() {
        this.fetchLocations()


        autocompletion()


        const resizeMap = (resize) => {

        //    setTimeout(() => {
                console.log('handling');
                google.maps.event.trigger(this.map, 'resize')
                this.handleMap('resize')
            //}, 100)

        }

        onResize(resizeMap)




    },

    methods: {

        handleMap(process) {

            if( !this.map ) {
                let mapContainer = document.getElementById('map')

                const map = new google.maps.Map(mapContainer, {
                    styles,
                    disableDefaultUI: true,
                    backgroundColor: 'none'
                })

                store.commit('CREATE_MAP', map)
            }

            if( process !== 'resize' )
                this.addLocationMarkers()

            if( this.map ) {

                let boundLocation = []

                if( this.userLocation ) {
                    boundLocation.push(this.userLocation)
                }

                if( this.focusedLocation ) {
                    boundLocation.push(this.focusedLocation)
                }
                else {
                    boundLocation.push(...this.markers)
                }

                console.log(boundLocation);
                fitInBounds(boundLocation)
            }


            //geolocation() // ask for location after boot up

        },

        fetchLocations(category) {
            fetch('../all.json')
            // fetch('../' + category + '.json')
                .then(res => res.json())
                .then(res => store.commit('SET_RAW_LOCATIONS', res))
                .then(res => {
                    // check if map loaded once
                    this.handleMap()
                    //console.log(this.$route);
                })
        },

        addLocationMarkers() {

            let markers = []

            if( this.markers )
                setMapOnAll(this.markers, null)

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

                markers.push(marker)

             }

            // fitInBounds(markers)

            store.commit('SET_MARKERS', markers)

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

    }




}




</script>
