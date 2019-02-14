<!-- SIMPLE drop down selction modal to choose which telesope to view the scheduler for
    Automatically pops up on scheduler page at first, then can be made to appear again by hitting the 
    "change telescope" button on the scheduler page
-->
<template dark>
    <v-dialog dark :value="value" @input="$emit('input')" persistent width="50%">
            <v-card flat>
                <v-card-title class="headline">Choose Telescope</v-card-title>
                <v-form ref="form" @submit.prevent="submit" refs="form">
                <v-container grid-list-xl fluid>
                    <v-flex xs12 sm6>
                        <v-select
                        v-model="telescopeName"
                        :items="telescopes"
                        color="blue darken-2"
                        label="Telescope"
                        required
                        ></v-select>
                    </v-flex>
                </v-container>
                <v-card-actions>
                    <v-btn
                    flat
                    color="primary"
                    type="submit"
                    >Submit</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
    </v-dialog>
</template>

<script>
import { error } from 'util';
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import ApiDriver from "../ApiDriver";

export default {
    data() {
        name: 'Telescope'
        return {
            telescopes: [
                "John C. Rudy County Park", 
                "Scale Model",
                "Virtual"
            ],
            telescopeName: "John C. Rudy County Park"
        }
    },
    props: {
        eventObj: {},
        value: false
    },
    methods: {
        submit() {
            var reset = []
            var telescopeId = this.telescopes.indexOf(this.telescopeName) + 1
            // this sends the telescopeId to the scheduler page and an empty array to be used to reset the events array on the scheduler page.
            // the empty array is used to prevent duplicate events being displayed.
            this.$emit("chosen", telescopeId, reset)
            this.$emit('input')
        },
        handleLoggedIn() {
            // Call the auth api endpoint so we can populate
            // the Vue store with user information
            ApiDriver.Auth.User(this.$store.state.token).then((response) => {
                HttpResponse.then(response, (data) => {
                    // Commit the data to the store and update the vue app
                    this.$store.commit("login", data.data);
                    this.$forceUpdate();
                }, (status, errors) => {
                    // Handle if the user logging in has an inactive/disabled account
                    this.handleAccountDisabled(errors)
                })
            });
        },
        handleAccountDisabled(errors) {
        let message = "";

        // There will only ever be one error in this scenario
        for (var index in errors) {
          message = errors[index][0]
        }

        // Display the error message in an alert
        this.$swal({
          title: '<span style="color:#f0ead6">Error!</span>',
          html: '<span style="color:#f0ead6">' + message + '</span>',
          type: 'error',
          background: '#302f2f'
        }).then(response => {
            router.push('/')
        });
      }
    },
    mounted() {
        // Verify the user is logged in
        this.handleLoggedIn();
    }
}
</script>

<style scoped>

</style>
