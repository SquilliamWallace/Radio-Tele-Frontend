<template>
    <div>
        <navigation-bar></navigation-bar>
        <loading v-show="$store.state.isLoading"></loading>
        <v-container v-show="!$store.state.isLoading">
            <v-list-tile >
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Start Date:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ data.startTime.value }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title >End Date:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ data.endTime.value }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Public:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ data.isPublic.value }}</v-list-tile-sub-title>
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
                    <v-list-tile-sub-title class = "pl-3">{{ data.telescopeId }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile >
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Created by:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ data.userFirstName.value }} {{ data.userLastName.value}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            
            <v-divider>
                <v-divider></v-divider>
            </v-divider>
            <v-btn v-if="data.status.value === 'Completed'" color="primary" v-bind:href="'/appointments/' + id + '/rf-data'">View Data</v-btn>
        </v-container>
        <v-layout wrap>
        <v-flex v-if="($store.state.currentUserId === data.eventUserId.value | $store.state.isAdmin) && !complete">
            <div>
                <v-btn color="primary" @click="editAppointment">Edit</v-btn>
            </div>
        </v-flex>
        <v-flex v-if="($store.state.currentUserId === data.eventUserId.value | $store.state.isAdmin) && !complete">
            <div>
                <v-btn color="error" @click="cancelAppointment">Cancel</v-btn>
            </div>
        </v-flex>
        </v-layout>
        <edit-appointment :appointmentObj="appointment" v-model="edit" @edited="edited"></edit-appointment>
        <cancel-appointment v-model="cancel"> </cancel-appointment>
    </div>
    
</template>
<script>
import NavigationBar from '../../components/NavigationBar.vue'
import ApiDriver from '../../ApiDriver.js'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from  '../../utils/CurrentUserValidation'
import moment from 'moment'
import CancelAppointment from "../../components/CancelAppointment.vue"
import EditAppointment from "../../components/EditAppointment.vue"
import Loading from "../../components/Loading"
export default {
    name: "AppointmentView",
    data() {
        return {
            data: {
                id: {
                    value: null
                },
                userFirstName: {
                    value: null
                },
                userLastName: {
                    value: null
                },
                eventUserId: {
                    value: null
                },
                isPublic: {
                    value: false
                },
                startTime: {
                    value: null
                },
                endTime: {
                    value: null
                },
                status: {
                    value: ""
                }
            },
            celestialBody: 'Alpha Centauri',
            telescopeId: 1,
            eventUserId: 0,
            edit: false,
            appointment: {},
            cancel: false,
            complete: false
        }
    },
    components: {
        NavigationBar,
        EditAppointment,
        CancelAppointment,
        Loading
    },
    methods: {
        getAppointment () {
            // Set the store's loading boolean to true
            this.$store.commit("loading", true);

            // Make the API call
            ApiDriver.Appointment.view(this.$route.params.appointmentId).then((response) => {
                // Handle the server response
                HttpResponse.then(response, (data) => {
                    // Populate the data and set the store's boolean back to false
                    this.populateData(data.data)
                    this.$store.commit("loading", false);
                }, (status, errors) => {
                    // Access Denied
                    if (parseInt(status) === 403) {
                        // Call the generic access denied handler
                        HttpResponse.accessDenied(this);
                    } 
                    // Invalid Resource Id
                    else if (parseInt(status) === 404) {
                        // Call the generic not found handler
                        HttpResponse.notFound(this, errors);
                    }
                })
            }).catch((error) => {
                // Handle an errorneous API call
                let message = "An error occurred when loading this observation";
                HttpResponse.generalError(this, message, true);
            });
        },
        edited: function(start, end) {
            // Update the start and end times
            this.startMonth = start
            this.endMonth = end
        },
        populateData(data) {
            // Populate the appointment information 
            this.data.id.value = data.id
            this.data.userFirstName.value = data.userFirstName
            this.data.userLastName.value = data.userLastName
            this.data.eventUserId.value = data.userId
            this.data.isPublic.value = data.public
            this.data.startTime.value = moment(data.startTime).format('YYYY-MM-DD hh:mm A')
            this.data.endTime.value = moment(data.endTime).format('YYYY-MM-DD hh:mm A')
            this.data.status.value = data.status
            // If the appointment has been completed, mark the boolean
            if (this.data.status.value === 'Completed') {
                this.complete = true
            }
        },
        editAppointment () {
            this.appointment.id = this.data.id.value
            this.appointment.privacy = !this.data.isPublic.data
            this.appointment.start = this.data.startTime.value
            this.appointment.end = this.data.endTime.value
            this.appointment.Tele = this.telescopeId
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
    mounted: function() {
        // Retrieve the appointment when loaded onto the DOM
        this.getAppointment()
    }
}
</script>
<style scoped>
    
</style>