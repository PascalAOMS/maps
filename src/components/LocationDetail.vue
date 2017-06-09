<template>

    <div class="location-card container">

        <div class="row">

            <div class="col-6">

                <h2>{{ location.name }}</h2>
                <p>{{ location.description }}</p>

            </div>

            <div class="col-6">

                <select v-model="travelMode" v-if="userLocation">
                    <option value="WALKING">zu Fuß</option>
                    <option value="TRANSIT">Bus/Bahn</option>
                    <option value="DRIVING">Auto</option>
                    <option value="BICYCLING">Fahrrad</option>
                </select>

                <div id="panel-distance" class="panel"></div>

                <div class="route-panel">
                    <div class="route-meta" v-if="userLocation">
                        <span class="route__duration">{{ duration }}</span>
                        <span class="route__distance">{{ distance }}</span>
                    </div>
                    <div id="route-directions"></div>
                </div>

            </div>


        </div>


    </div>

</template>

<script>
import calcRoute from '@/map/calcRoute'
import store from '@/store'
import { fitInBounds } from '@/lib/utils'

export default {
    data() {
        return {
            travelMode: 'TRANSIT'
        }
    },

    computed: {
        map()   { return this.$store.getters.map },
        route() { return this.$store.getters.route },
        markers()   { return this.$store.getters.markers },
        mapCenter() { return this.$store.getters.mapCenter },
        locations() { return this.$store.getters.locations },
        userLocation() { return this.$store.getters.userLocation },
        focusedIndex() { return this.$store.getters.focusedIndex },
        focusedLocation()    { return this.$store.getters.focusedLocation },
        directionsRenderer() { return this.$store.getters.directionsRenderer },

        location() { return this.locations[this.focusedIndex] },
        distance() { return this.route ? this.route.distance : 'wird berechnet...' },
        duration() { return this.route ? this.route.duration : 'wird berechnet...' }

    },

    watch: {
        travelMode() { this.calcRoute() }, // travelMode appears when userLocation defined
        userLocation() { this.calcRoute() },
    },

    mounted() {

        if( this.userLocation ) {
            console.log('mounted');
            this.calcRoute()
        }

    },

    beforeRouteLeave(to, from, next) {
        // this.map.setCenter(this.mapCenter)
        // this.map.setZoom(6)

        if( this.directionsRenderer ) {
            this.directionsRenderer.setMap(null)
            this.directionsRenderer.setPanel(null)
            store.commit('SET_DIRECTIONS_RENDERER', null)
        }

        for( let i = 0; i < this.markers.length; i++ ) {
            // dont place markers which are already there to avoid flashing
            if( this.markers[i] === this.userLocation ||
                this.markers[i] === this.focusedLocation ) {
                continue
            }

            this.markers[i].setMap(this.map)
        }


        store.commit('SET_ROUTE_META', null)
        store.commit('SET_FOCUSED_LOCATION', { marker: null, index: null })

        fitInBounds(this.markers)

        next()
    },

    methods: {
        calcRoute() {
            calcRoute(this.userLocation, this.focusedLocation, this.travelMode)
        }
    }
}
</script>
