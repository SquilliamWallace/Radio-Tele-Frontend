<template>
    <div>
        <navigation-bar></navigation-bar>
        <v-container>
            <v-list-tile >
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Start Date:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ startMonth }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn v-on:click="getAppointment" icon ripple>
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title >End Date:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ endMonth }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple>
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Public:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ privacy }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple>
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Celestial Body:</v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ celestialBody }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple>
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-content class="white--text">
                    <v-list-tile-title>Telescope Id:
                    </v-list-tile-title>
                    <v-list-tile-sub-title class = "pl-3">{{ Tele }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple>
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            
            
        
    </v-container>
    </div>
    
</template>
<script>

import NavigationBar from '../components/NavigationBar.vue'
import ApiDriver from '../ApiDriver.js'
import moment from 'moment'
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
                celestialBody: 'Alpha Centauri',
                Tele: 1,

                items: [
                { title: 'Start Date', day: "6", month: "10", year: "2018", h: "6", mm: "30", period: "am"},
                { title: 'End Date', day: "6", month: "10", year: "2018", h: "1", mm: "45", period: "pm"},
                { title: 'Privacy', private:"true"},
                { title: 'Coordinates', celestialBody: "Mars"},
                { title: 'Telescope', enum: '1'}
                ],
        }
    },
    components: {
        NavigationBar
    },
    methods: {
        getAppointment () {
            ApiDriver.Appointment.view(this.$route.params.appointmentId).then((response) => {
                console.log(response)
                this.populateData(response.data.data)
            
            }).catch((error) => {
                console.log(error)
            });
        },
        auth () {
            ApiDriver.Auth().then((response) => {
                console.log(response)
            })
        },
        populateData(data){
            this.privacy = data.public
            this.startMonth = moment(data.startTime).format('MM/DD/YYYY hh:mm A')
            this.endMonth = moment(data.endTime).format('MM/DD/YYYY hh:mm A')
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