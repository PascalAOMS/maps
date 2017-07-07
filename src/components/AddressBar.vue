<template>

    <div class="address-bar">

        <transition name="address" mode="out-in">


            <div class="address-input"
                :class="{ 'is-editable': userLocation,
                          'is-editing': userLocation && inputShown }"
                v-if="inputShown"
                key="editAddress"
            >

                <form @submit.prevent="geocoding()">
                    <input id="input-geocoding" v-model="addressInput" placeholder="Where are you?" autofocus>
                </form>

                <button class="input-btn geolocation" @click="geolocation()"><md-icon>my_location</md-icon></button>

                <button class="input-btn input-close"
                    @click="inputShown = false"
                    v-show="userAddress"
                    >
                    <md-icon>close</md-icon>
                </button>

            </div>

            <div class="user-address" v-if="!inputShown" key="finalAddress">
                <span class="user-location">{{ userAddress }}</span>
                <button class="input-btn" @click="editAddress"><md-icon>mode_edit</md-icon></button>
            </div>


        </transition>




    </div>

</template>
<script>
import geolocation from '@/map/geolocation'
import { geocoding } from '@/map/geocoding'

export default {
    data() {
        return {
            travelMode: 'WALKING',
            addressInput: 'tramper weg 1',
            inputShown: true
        }
    },

    computed: {
        userAddress()  { return this.$store.getters.userAddress },
        userLocation()  { return this.$store.getters.userLocation },
        focusedLocation()  { return this.$store.getters.focusedLocation },
    },

    watch: {
        userLocation() { this.inputShown = false },
        userLocation() { this.inputShown = false },
        focusedLocation() {
            if( this.userLocation )
                this.inputShown = false
        },
    },

    methods: {
        editAddress() {
            this.inputShown = true
            setTimeout(() => {
                document.getElementById('input-geocoding').select()
            }, 500);
        },
        geocoding() { geocoding(this.addressInput) },
        geolocation() { geolocation(this.travelMode) }
    }
}
</script>
