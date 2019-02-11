<template>
<div>
    <navigation-bar></navigation-bar>
    <loading v-show="$store.state.isLoading"></loading>
    <v-card v-show="!$store.state.isLoading" flat>
        <v-card-title v-if="completedAppointments.length === 0" primary-title class="justify-center">
            <span class="headline">No Completed Observations!</span>
        </v-card-title>
        <v-card-title v-else primary-title class="justify-center">
            <span class="headline">Completed Observations</span>
        </v-card-title>
        <v-card-text v-if="completedAppointments.length === 0">
            <div>You do not have any completed observations.
                <a href="/scheduler">Click here to schedule an observation</a>
            </div>
        </v-card-text>
         <v-card-title v-else>
            <v-list two-line>
                <v-list-tile class="list-item" v-for="appointment in completedAppointments" :key="appointment.id" v-bind:href="'/appointments/' + appointment.id + '/view'">
                    <v-list-tile-content v-if="completedAppointments.length > 0">
                        <v-list-tile-title v-if="appointment.celestialBody">
                            Appointment #{{ appointment.id }}
                        </v-list-tile-title>
                        <v-list-tile-title v-if="appointment.coordinates">
                            Coordinates: {{ appointment.coordinates }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                            Appointment Time: {{ appointment.startTime }} - {{ appointment.endTime }}
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
            @input="next"
            ></v-pagination>
        </div>
</div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from '../../utils/CurrentUserValidation';
import moment from 'moment';
import NavigationBar from '../../components/NavigationBar'
import Loading from "../../components/Loading"
export default {
    name: 'CompletedAppointments',
    data() {
        return {
            pageNumber: 0,
            pageDisplay: 1,
            pageSize: 25,
            numPages: 0,
            last: false,
            completedAppointments: []
        }
    },
    methods: {
        getCompletedAppointments() {
            // Set the store's loading boolean to true
            this.$store.commit("loading", true);

            // Make the API call
            ApiDriver.User.Appointment.completedAppointments(this.$route.params.userId, this.pageNumber, this.pageSize)
                .then(response => {
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
                    })
                }).catch(errors => {
                    // Handle an erroneous API call
                    let message = "An error occurred when loading the user\'s completed observations"
                    HttpResponse.generalError(this, message, true)
                })
        },
        populateData(data) {
            // Populate the completed appointments array
            for (var index in data.content) {
                let appointment = data.content[index];
                appointment.celestialBody = "Alpha Centauri";
                appointment.startTime = moment(appointment.startTime).format('MM/DD/YYYY hh:mm:ss A');
                appointment.endTime = moment(appointment.endTime).format('MM/DD/YYYY hh:mm:ss A');
                this.completedAppointments.push(appointment);
                this.numPages = data.totalPages;
            }
        },
        next(page) {
            // Handle retrieving a new page of information
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.completedAppointments = [];
            this.getCompletedAppointments();
        }
    },
    mounted: function() {
        // Retrieve the completed appointments when loaded onto the DOM
        this.getCompletedAppointments();
        this.$store.commit("updateInfo", {page: "Individual Completed Appointments", info: "This page displays all of your completed appointments.\n Click on an individual appointment to view more\n details."})
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