<template>

    <div class="location-card">
        Hit
    </div>

</template>

<script>
import store from '@/store'
import { fitInBounds } from '@/lib/utils'

export default {
    computed: {
        map()          { return this.$store.getters.map },
        mapCenter()    { return this.$store.getters.mapCenter },
        locations()    { return this.$store.getters.locations },
        userLocation() { return this.$store.getters.userLocation },
        markers()      { return this.$store.getters.markers },
        focusedLocation() { return this.$store.getters.focusedLocation },
        directionsRenderer() { return this.$store.getters.directionsRenderer }
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


        store.commit('SET_FOCUSED_LOCATION', null)

        fitInBounds(this.markers)

        next()
    },
}
</script>
