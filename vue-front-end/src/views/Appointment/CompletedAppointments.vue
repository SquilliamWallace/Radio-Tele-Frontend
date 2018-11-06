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
                            Celestial Body: {{ appointment.celestialBody }}
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
            this.$store.commit("loading", true);
            ApiDriver.Appointment.completedAppointments(this.$route.params.userId, this.pageNumber, this.pageSize)
                .then(response => {
                    HttpResponse.then(response, data => {
                        this.last = data.data.last;
                        console.log(this.last)
                        this.populateData(data.data);
                        this.$store.commit("loading", false);
                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            this.$store.commit("loading", false);
                            this.$swal({
                                title: '<span style="color:#f0ead6">Error!<span>',
                                html: '<span style="color:#f0ead6">Access Denied<span>',
                                type: 'error',
                                background: '#302f2f'
                            }).then(response => {
                                CurrentUserValidation.validateCurrentUser(this.$store);
                            });
                        }
                    })
                }).catch(error => {
                    this.$store.commit("loading", true);
                    this.$swal({
                        title: '<span style="color:#f0ead6">Error!<span>',
                        html: '<span style="color:#f0ead6">An error occurred when loading the user\'s completed appointments<span>',
                        type: 'error',
                        background: '#302f2f'
                    }).then(response => {
                        CurrentUserValidation.validateCurrentUser(this.$store);
                    });
                })
        },
        populateData(data) {
            console.log(data)
            for (var index in data.content) {
                let appointment = data.content[index];
                appointment.celestialBody = "Alpha Centauri";
                appointment.startTime = moment(appointment.startTime).add(4, 'hours').format('MM/DD/YYYY hh:mm:ss A');
                appointment.endTime = moment(appointment.endTime).add(4, 'hours').format('MM/DD/YYYY hh:mm:ss A');
                this.completedAppointments.push(appointment);
                this.numPages = data.totalPages;
            }
        },
        next(page) {
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.completedAppointments = [];
            this.getCompletedAppointments()
        }
    },
    mounted: function() {
        this.getCompletedAppointments();
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