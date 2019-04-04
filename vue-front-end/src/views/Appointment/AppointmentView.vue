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
                    <v-list-tile-sub-title class = "pl-3" v-if="data.isPublic.value">Yes</v-list-tile-sub-title>
                    <v-list-tile-sub-title class = "pl-3" v-if="!data.isPublic.value">No</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <!-- 
                Maybe re-implement when able to detect if celestial body being tracked

            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Celestial Body:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ celestialBody }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            -->
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Coordinates:</v-list-tile-title>
                    <v-list-tile-sub-title class="pl-3" v-if="data.declination.value > 0">Right Ascension: {{ data.rightAscension.hours }} Hours {{data.rightAscension.minutes}} Minutes {{data.rightAscension.seconds}} Seconds, Declination: +{{ data.declination.value }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title class="pl-3" v-if="data.declination.value <= 0">Right Ascension: {{ data.rightAscension.hours }} Hours {{data.rightAscension.minutes}} Minutes {{data.rightAscension.seconds}} Seconds, Declination: {{ data.declination.value }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Telescope Name:
                    </v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ telescopeName }}</v-list-tile-sub-title>
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
            <v-btn v-if="data.status.value === 'Completed'" color="primary" v-bind:href="'/#/appointments/' + data.id.value + '/rf-data'">View Data</v-btn>
        </v-container>
        <v-layout wrap>
        <v-flex v-if="($store.state.currentUserId === data.eventUserId.value | $store.state.isAdmin) && !complete && !$store.state.isLoading">
            <div>
                <v-btn color="primary" @click="editAppointment">Edit</v-btn>
            </div>
        </v-flex>
        <v-flex v-if="($store.state.currentUserId === data.eventUserId.value | $store.state.isAdmin) && !$store.state.isLoading && !data.isPublic.value">
            <div>
                <v-btn color="primary" @click="shareAppointment">Share</v-btn>
            </div>
        </v-flex>
        <v-flex v-if="($store.state.currentUserId === data.eventUserId.value | $store.state.isAdmin) && !$store.state.isLoading && !data.isPublic.value">
            <div>
                <v-btn color="primary" @click="unshareAppointment">Unshare</v-btn>
            </div>
        </v-flex>
        <v-flex v-if="($store.state.currentUserId === data.eventUserId.value | $store.state.isAdmin) && !complete && !$store.state.isLoading">
            <div>
                <v-btn color="error" @click="cancelAppointment">Cancel</v-btn>
            </div>
        </v-flex>
        </v-layout>
        <edit-appointment :appointmentObj="appointment" v-model="edit" @edited="edited"></edit-appointment>
        <share-appointment v-model="share"></share-appointment>
        <unshare-appointment v-model="unshare"></unshare-appointment>
        <cancel-appointment v-model="cancel"> </cancel-appointment>
    </div>
    
</template>
<script>
import NavigationBar from '../../components/utility/NavigationBar.vue'
import ApiDriver from '../../ApiDriver.js'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from  '../../utils/CurrentUserValidation'
import moment from 'moment'
import CancelAppointment from "../../components/appointment/CancelAppointment.vue"
import EditAppointment from "../../components/appointment/EditAppointment.vue"
import ShareAppointment from "../../components/appointment/ShareAppointment"
import UnshareAppointment from "../../components/appointment/UnshareAppointment"
import Loading from "../../components/utility/Loading"
import { throws } from 'assert';
export default {
    title: "Radio Telescope 1.1.0",
    name: "AppointmentView",
    data() {
        return {
            startArray: [],
            endArray: [],
            startDateArray: [],
            endDateArray: [],
            startTimeArray: [],
            endTimeArray: [],
            startPmHour: 0,
            endPmHour: 0,
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
                },
                rightAscension: {
                    hours: null,
                    minutes: null,
                    seconds: null,
                    value: null
                },
                declination: {
                    value: null
                },
                telescopeId: {
                    value: null
                }
            },
            celestialBody: '',
            telescopeName: "",
            telescopes: [
                "John C. Rudy County Park", 
                "Scale Model",
                "Virtual"
            ],
            eventUserId: 0,
            edit: false,
            share: false,
            unshare: false,
            appointment: {
                id: {
                    value: null,
                    hasError: false
                },
                privacy: {
                    value: false,
                    hasError: false
                },
                start: {
                    value: null, 
                    hasError: false
                },
                end: {
                    value: null,
                    hasError: false
                },
                startTime: {
                    value: null
                },
                startDate: {
                    value: null
                },
                endTime: {
                    value: null
                },
                endDate: {
                    value: null
                },
                telescopeId: {
                    value: null,
                    hasError: false
                },
                rightAscension: {
                    hours: null,
                    minutes: null,
                    seconds: null,
                    value: null,
                    hasError: false
                },
                declination: {
                    value: null,
                    hasError: false
                }
            },
            cancel: false,
            complete: false,
            rawEndTime: ""
        }
    },
    components: {
        NavigationBar,
        EditAppointment,
        CancelAppointment,
        ShareAppointment,
        UnshareAppointment,
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
                // Handle an erroneous API call
                let message = "An error occurred when loading this observation";
                HttpResponse.generalError(this, message, true);
            });
        },
        edited: function(appointmentObj) {
            // Update the start and end times
            this.data.startTime.value = appointmentObj.start.value;
            this.data.endTime.value = appointmentObj.end.value;
            this.data.rightAscension.hours = appointmentObj.rightAscension.hours;
            this.data.rightAscension.minutes = appointmentObj.rightAscension.minutes;
            this.data.rightAscension.seconds = appointmentObj.rightAscension.seconds;
            this.data.declination.value = appointmentObj.declination.value;
            this.data.isPublic.value = !appointmentObj.privacy.value
        },
        populateData(data) {
            // Populate the appointment information 
            this.data.id.value = data.id
            this.data.telescopeId.value = data.telescopeId
            this.telescopeName = this.telescopes[this.data.telescopeId.value - 1]
            this.data.userFirstName.value = data.userFirstName
            this.data.userLastName.value = data.userLastName
            this.data.eventUserId.value = data.userId
            this.data.isPublic.value = data.public
            this.data.startTime.value = moment(data.startTime).format('MM-DD-YYYY hh:mm A')
            this.data.endTime.value = moment(data.endTime).format('MM-DD-YYYY hh:mm A')
            this.rawEndTime = data.endTime
            this.complete = moment(this.rawEndTime).isBefore(moment(), 'second')
            this.data.status.value = data.status
            this.data.rightAscension.value = data.rightAscension.toFixed(2);
            this.data.rightAscension.hours = data.hours,
            this.data.rightAscension.minutes = data.minutes,
            this.data.rightAscension.seconds = data.seconds,
            this.data.declination.value = data.declination
            // If the appointment has been completed, mark the boolean
            if (this.data.status.value === 'Completed') {
                this.complete = true
            }
        },
        editAppointment () {
            // Set the prop values and open up the edit modal
            this.appointment.id.value = this.data.id.value
            this.appointment.privacy.value = !this.data.isPublic.value
            this.appointment.start.value = this.data.startTime.value
            this.appointment.end.value = this.data.endTime.value
            // I apologize for this, it's gross but i had no other choice, the v-time and date pickers are very particular about the values they can model to
            this.startArray = this.appointment.start.value.split(" ")
            this.endArray = this.appointment.end.value.split(" ")
            this.startDateArray = this.startArray[0].split("-")
            this.appointment.startDate.value = this.startDateArray[2] + "-" + this.startDateArray[0] + "-" + this.startDateArray[1]
            this.startTimeArray = this.startArray[1].split(":")
            if(this.startArray[2] == "PM" && this.startTimeArray[0] !== "12" && !this.startTimeArray[1] !== "00"){
                this.startPmHour = parseInt(this.startTimeArray[0], 10) +12;
                this.startTimeArray[0] = this.startPmHour.toString();
            }
            else if(this.startArray[2] == "AM" && this.startTimeArray[0] == "12" && this.startTimeArray[1] == "00"){
                this.startPmHour = parseInt(this.startTimeArray[0], 10) - 12;
                this.startTimeArray[0] = this.startPmHour.toString() + "0";
            }
            this.appointment.startTime.value= this.startTimeArray[0] + ":" + this.startTimeArray[1]
            this.endDateArray = this.startArray[0].split("-")
            this.appointment.endDate.value = this.endDateArray[2] + "-" + this.endDateArray[0] + "-" + this.endDateArray[1]
            this.endTimeArray = this.endArray[1].split(":")
            if(this.endArray[2] == "PM" && this.endTimeArray[0] !== "12" && !this.endTimeArray[1] !== "00"){
                this.endPmHour = parseInt(this.endTimeArray[0], 10) +12;
                this.endTimeArray[0] = this.endPmHour;
            }
            else if(this.endArray[2] == "AM" && this.endTimeArray[0] == "12" && this.endTimeArray[1] == "00"){
                this.endPmHour = parseInt(this.endTimeArray[0], 10) - 12;
                this.endTimeArray[0] = this.endPmHour.toString() + "0";
            }
            this.appointment.endTime.value= this.endTimeArray[0] + ":" + this.endTimeArray[1]
            this.appointment.telescopeId.value = this.data.telescopeId.value
            this.appointment.rightAscension.hours = this.data.rightAscension.hours
            this.appointment.rightAscension.minutes = this.data.rightAscension.minutes
            this.appointment.rightAscension.seconds = this.data.rightAscension.seconds
            this.appointment.declination.value = this.data.declination.value
            this.edit = true
        },
        cancelAppointment () {
            // Open the modal
            this.cancel = true
        },
        closeModal() {
            // Reset prop values and close the edit modal
            this.edit = false
            this.appointment = {}
        },
        shareAppointment() {
            this.share = true
        },
        unshareAppointment() {
            this.unshare = true
        }
    },
    mounted: function() {
        // Retrieve the appointment when loaded onto the DOM
        this.getAppointment()
        this.complete = moment(this.startTime).isBefore(moment(), 'second')
        this.$store.commit("updateInfo", {page: "View Appointment", info: "This page displays the information for an individual\n appointment. Clicking the button at the bottom of the\n page will direct you to a table which displays all\n of the Radio Frequency data for the displayed\n appointment."})
    }
}
</script>
<style scoped>
    
</style>