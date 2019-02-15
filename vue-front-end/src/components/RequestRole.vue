<template dark>
    <v-dialog dark :value="value" @input="$emit('input')" persistent width="50%">
        
    </v-dialog>
</template>

<script>
// TODO: clean these up
import { error } from 'util';
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import ApiDriver from "../ApiDriver";

export default {
    data() {

    },

    props: {

    },

    methods: {
        submit() {
            this.$emit('input')
        }

    }
}
</script>

<style scoped>

</style>