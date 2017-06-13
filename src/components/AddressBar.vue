<template>

    <div class="col-8 address-bar">

        <div class="address-input" v-show="inputShown">

            <form class="col" @submit.prevent="geocoding()">
                <input id="input-geocoding" v-model="addressInput">
            </form>

            <button @click="inputShown = false"
                    v-show="userAddress"
            >
                &times;
            </button>
        </div>

        <div class="col user-address" v-show="!inputShown">
            {{ userAddress }}
            <button @click="inputShown = true">EDIT</button>
        </div>

    </div>

</template>
<script>
import { geocoding } from '@/map/geocoding'

export default {
    data() {
        return {
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
        focusedLocation() { this.inputShown = false },
    },

    methods: {
        geocoding() { geocoding(this.addressInput) },
    }
}
</script>
