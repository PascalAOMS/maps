<template>


    <ul class="locations">
        <li v-for="(location, i) in locations" @click="focusLocation(i)">
            <b>{{ location.name }}</b><br>
            {{ location.description }}

            <hr>
        </li>
    </ul>



</template>

<script>
import store from '@/store'
export default {
    computed: {
        map()          { return this.$store.getters.map },
        mapCenter()    { return this.$store.getters.mapCenter },
        locations()    { return this.$store.getters.locations },
        userLocation() { return this.$store.getters.userLocation },
        markers()      { return this.$store.getters.markers }
    },


    methods: {
        focusLocation(markerPos) {

            let url = this.locations[markerPos].name
                        .toLowerCase()
                        .replace(/\s/g, '+')

            this.$router.push('/ort/' + url)

            store.commit('SET_FOCUSED_LOCATION', { marker: this.markers[markerPos], index: markerPos })

            const bounds = new google.maps.LatLngBounds()

            for( let i = 0; i < this.markers.length; i++ ) {
                // check if i = clicked || last item in array if userLocation
                if( i === markerPos || this.userLocation && i === this.markers.length - 1 ) {
                    bounds.extend(this.markers[i].getPosition())

                    if( i === markerPos ) // bound but also show clicked marker
                        this.markers[i].setMap(this.map)

                    continue
                }
                this.markers[i].setMap(null) // hide all which aren't clicked
            }

            this.map.fitBounds(bounds)

            if( !this.userLocation )
                this.map.setZoom(13)


        }
    }
}
</script>
