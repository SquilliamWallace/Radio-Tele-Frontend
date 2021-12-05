<template>
    <div>
        <navigation-bar></navigation-bar>
        <loading v-show="$store.state.isLoading"></loading>
        <v-card v-show="!$store.state.isLoading" flat>
            <v-card-title v-if="futureAppointments.length === 0" primary-title class="justify-center">
                <span class="headline">No Future Observations!</span>
            </v-card-title>
            <v-card-title v-else primary-title class="justify-center">
                <span class="headline">Future Observations</span>
            </v-card-title>
            <v-card-text v-if="futureAppointments.length === 0">
                <div>You do not have any future observations.
                    <a href="/#/scheduler">Click here to schedule an observation</a>
                </div>
            </v-card-text>
            <div v-else>
                <v-list two-line>
                    <v-list-tile class="list-item" v-for="appointment in futureAppointments" :key="appointment.id" v-bind:href="'/#/appointments/' + appointment.id + '/view'">
                        <v-list-tile-content v-if="futureAppointments.length > 0">
                            <v-list-tile-title v-if="appointment.celestialBody">
                                Appointment #{{ appointment.id }}
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                Type: {{ appointment.type }}
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title>
                                Appointment Time: {{ appointment.startTime }} - {{ appointment.endTime }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </div>
        </v-card>
        <br>
        <div class="text-xs-center">
            <v-pagination
            circle
            v-model="pageDisplay"
            :length="numPages"
            @input="next"></v-pagination>
        </div>
         <v-layout justify-center>
            <v-flex xs12 sm1>
                <v-select
                v-model="selectedPageSize"
                :items="pageSizeList"
                label="Items per page"
                v-on:change="this.pageSizeUpdate"
                ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import CurrentUserValidation from '../../utils/CurrentUserValidation';
import moment from 'moment';
import NavigationBar from '../../components/utility/NavigationBar';
import Loading from '../../components/utility/Loading'
import HttpResponse from '../../utils/HttpResponse';
export default {
    title: "Radio Telescope 1.1.0",
    name: 'FutureAppointments',
    data() {
        return {
            pageNumber: 0,
            pageDisplay: 1,
            pageSize: 25,
            numPages: 0,
            last: false,
            futureAppointments: [],
            selectedPageSize: "10",
            pageSizeList: [
                '10', '25', '50', '100'
            ]
        }
    },
    methods: {
        getFutureAppointments() {
            // Set the store's loading boolean to true
            this.$store.commit("loading", true);

            // Make the API call
            ApiDriver.Appointment.futureAppointments(this.$route.params.userId, this.pageNumber, this.selectedPageSize)
                .then(response => {
                    // Handle the server response
                    HttpResponse.then(response, data => {
                        // Populate the data and set the store's boolean back to false
                        this.last = data.data.last
                        this.populateData(data.data);
                        this.$store.commit("loading", false);
                    }, (status, errors) => {
                        // Access Denied
                        if (parseInt(status) === 403) {
                            // Call the generic access denied handler
                            HttpResponse.accessDenied(this);
                        }
                    })
                }).catch(error => {
                    // Handle an erroneous API call
                    let message = "An error occurred when loading the user\'s future observations";
                    HttpResponse.generalError(this, message, true);
                });
        },
        populateData(data) {
            // Populate the future appointments array
            for (var index in data.content) {
                let appointment = data.content[index];
                appointment.celestialBody = "Alpha Centauri"
                appointment.startTime = moment(appointment.startTime).format('MM/DD/YYYY hh:mm:ss A');
                appointment.endTime = moment(appointment.endTime).format('MM/DD/YYYY hh:mm:ss A');
                this.futureAppointments.push(appointment);
                this.numPages = data.totalPages;
            }
        },
        next(page) {
            // Handle retrieving a new page of information
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.futureAppointments = [];
            this.getFutureAppointments();
        },
        pageSizeUpdate(){
            this.futureAppointments = []
            this.getFutureAppointments()
        },
    },
    mounted: function() {
        // Retrieve the future appointments when loaded onto the DOM
        this.getFutureAppointments();
        this.$store.commit("updateInfo", {page: "Individual Future Appointments", info: "This page displays all of your future appointments.\n Click on an individual appointment to view more\n details."})
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
