<template>
    <div>
        <navigation-bar></navigation-bar>
        <v-container>
            <v-list-tile >
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Start Date:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ startMonth }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title >End Date:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ endMonth }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Public:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ privacy }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Celestial Body:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ celestialBody }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Telescope Id:
                    </v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ Tele }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider>
                <v-divider></v-divider>
            </v-divider>
            <v-btn v-if="status === 'Completed'" color="primary" v-bind:href="'/appointments/' + id + '/rf-data'">View Data</v-btn>
        </v-container>
        <v-layout wrap>
        <v-flex v-if="$store.state.currentUserId === eventUserId | $store.state.isAdmin">
            <div>
                <v-btn color="primary" @click="editAppointment">Edit</v-btn>
            </div>
        </v-flex>
        <v-flex v-if="$store.state.currentUserId === eventUserId | $store.state.isAdmin">
            <div>
                <v-btn color="error" @click="cancelAppointment">Cancel</v-btn>
            </div>
        </v-flex>
        </v-layout>
        <edit-appointment :appointmentObj="appointment" v-model="edit"> </edit-appointment>
        <cancel-appointment v-model="cancel">  </cancel-appointment>
    </div>
    
</template>
<script>

import NavigationBar from '../components/NavigationBar.vue'
import ApiDriver from '../ApiDriver.js'
import HttpResponse from '../utils/HttpResponse'
import CurrentUserValidation from  '../utils/CurrentUserValidation'
import moment from 'moment'
import CancelAppointment from "../components/CancelAppointment.vue"
import EditAppointment from "../components/EditAppointment.vue"

export default {
    name: "AppointmentView",
    data() {
            return {

                posts: [],
                errors: [],

                startDay: 6,
                startMonth: '',
                startYear: '2018',
                endDay: '6', endMonth: '', endYear: '2018',
                startHour: '6', startMinute: '30', period: 'am',
                endHour: '1', endMinute: '45', endPeriod: 'pm',
                privacy: 'private',
                status: '',
                celestialBody: 'Alpha Centauri',
                Tele: 1,

                items: [
                { title: 'Start Date', day: "6", month: "10", year: "2018", h: "6", mm: "30", period: "am"},
                { title: 'End Date', day: "6", month: "10", year: "2018", h: "1", mm: "45", period: "pm"},
                { title: 'Privacy', private:"true"},
                { title: 'Coordinates', celestialBody: "Mars"},
                { title: 'Telescope', enum: '1'}
                ],
                eventUserId: 0,
                edit: false,
                appointment: {},
                cancel: false
        }
    },
    components: {
        NavigationBar,
        EditAppointment,
        CancelAppointment
    },
    methods: {
        getAppointment () {
            ApiDriver.Appointment.view(this.$route.params.appointmentId).then((response) => {
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data)
                }, (status, errors) => {
                    if (parseInt(status) === 403) {
                        this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">Access Denied<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                        CurrentUserValidation.validateCurrentUser(this.$store);
                    }
                })
            }).catch((error) => {
                console.log(error)
            });
        },
        auth () {
            ApiDriver.Auth().then((response) => {
                HttpResponse.then(response, (data) => {
                    
                }, (status, errors) => {
                    if (parseInt(status) === 403) {
                        this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">Access Denied<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                        CurrentUserValidation.validateCurrentUser(this.$store);
                    }
                })
            }).catch((error) => {
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading this appointment data<span>',
                            type: 'error',
                            background: '#302f2f'
                        });
                console.log(error)
            })
        },
        populateData(data){
            this.id = data.id
            this.eventUserId = data.userId
            this.privacy = data.public
            this.startMonth = moment(data.startTime).format('YYYY-MM-DD hh:mm A')
            this.endMonth = moment(data.endTime).format('YYYY-MM-DD hh:mm A')
            this.status = data.status

            console.log(this.status)
        },
        editAppointment () {
            this.appointment.id = this.id
            this.appointment.privacy = !this.privacy
            this.appointment.start = this.startMonth
            this.appointment.end = this.endMonth
            this.appointment.Tele = this.Tele
            this.edit = true
        },
        cancelAppointment () {
            this.cancel = true
        },
        closeModal() {
            this.edit = false
            this.appointment = {}
        }
    },
    mounted: function(){
        this.auth()
        this.getAppointment()
    }
}
</script>

<style scoped>
    
</style>