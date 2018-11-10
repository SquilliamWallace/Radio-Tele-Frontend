<template>
    <div>
        <navigation-bar></navigation-bar>
        <loading v-show="$store.state.isLoading"></loading>
        <v-card v-show="!$store.state.isLoading" flat>
            <v-card-title v-if="publicAppointments.length === 0" primary-title class="justify-center">
                <span class="headline">No Public Observations!</span>
            </v-card-title>
            <v-card-title v-else primary-title class="justify-center">
                <span class="headline">Completed Public Observations</span>
            </v-card-title>
            <v-card-text v-if="publicAppointments.length === 0">
                <div>There are no completed public observations! Help contribute to the cause!</div>
                <a href="/scheduler">Click here to schedule a public observation</a>
            </v-card-text>
            <v-card-title v-else>
                <v-list three-line>
                    <v-list-tile class="list-item" v-for="appointment in publicAppointments" :key="appointment.id" v-bind:href="'/appointments/' + appointment.id + '/view'">
                        <v-list-tile-content v-if="publicAppointments.length > 0">
                            <v-list-tile-title v-if="appointment.celestialBody">
                            Celestial Body: {{ appointment.celestialBody }}
                            </v-list-tile-title>
                            <v-list-tile-title v-if="appointment.coordinates">
                                Coordinates: {{ appointment.coordinates }}
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                Appointment Time: {{ appointment.startTime }} - {{ appointment.endTime }}
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title v-if="$store.state.currentUserId !== appointment.id">
                                Conducted By: {{ appointment.userFirstName }} {{ appointment.userLastName }}
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title v-else>
                                Conducted By: You
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card-title>
        </v-card>
        <br>
        <div class="text-xs-center">
            <v-pagination
            circle
            v-model="pageDisplay"
            :length="numPages"
            @input="next"></v-pagination>
        </div>
    </div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from '../../utils/CurrentUserValidation';
import moment from 'moment';
import NavigationBar from '../../components/NavigationBar';
import Loading from '../../components/Loading'
export default {
    name: 'PublicAppointments',
    data() {
        return {
            pageNumber: 0,
            pageDisplay: 1,
            pageSize: 12,
            numPages: 0,
            last: false,
            publicAppointments: []
        }
    },
    methods: {
        getPublicAppointments() {
            // Set the store's loading boolean to true
            this.$store.commit("loading", true);

            // Make the API call
            ApiDriver.Appointment.publicAppointments(this.pageNumber, this.pageSize).then(response => {
                // Handle the server response
                HttpResponse.then(response, data => {
                    // Populate the data and set the store's boolean back to false
                    this.last = data.data.last;
                    this.populateData(data.data);
                    this.$store.commit("loading", false);
                }, (status, errors) => {
                    // Access Denied
                    if (parseInt(status) === 403) {
                        // Call the generic access denied handler
                        HttpResponse.accessDenied(this);
                    }
                });
            }).catch(errors => {
                // Handle an erroneous API call
                let message = "An error occurred when loading the public appointments"
                HttpResponse.generalError(this, message)
            })
        },
        populateData(data) {
            // Populate the public appointments array
            for (var index in data.content) {
                let appointment = data.content[index];
                appointment.celestialBody = "Alpha Centauri";
                appointment.startTime = moment(appointment.startTime).add(4, 'hours').format('MM/DD/YYYY hh:mm:ss A');
                appointment.endTime = moment(appointment.endTime).add(4, 'hours').format('MM/DD/YYYY hh:mm:ss A');
                this.publicAppointments.push(appointment);
                this.numPages = data.totalPages;
            }
        },
        next(page) {
            // Handle retrieving a new page of information
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.publicAppointments = [];
            this.getPublicAppointments();
        }
    },
    mounted: function() {
        // Retrieve the public appointments when loaded onto the DOM
        this.getPublicAppointments();
    },
    components: {
        NavigationBar,
        Loading
    }
}
</script>
<style scoped>
.list-item { 
    padding-bottom: 5px;
}
</style>

