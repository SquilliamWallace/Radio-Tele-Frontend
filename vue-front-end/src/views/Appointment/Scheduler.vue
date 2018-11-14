<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <choose-telescope ref="choose" v-model="tele" @chosen="populateData"></choose-telescope>
        <loading v-show="$store.state.isLoading"></loading>
        <v-app v-show="!$store.state.isLoading" light>
            <h1 justify-center>{{ telescopeName }}</h1>
            <v-btn v-show="!this.tele" v-on:click="toggleChooseTelescope" ripple>Change Telescope</v-btn>
            <full-calendar @event-created="createEvent" @event-selected="openEvent" :events="events" :header="header" id="calendar"></full-calendar>
            <v-layout justify-center>
                <create-appointment :eventObj="event" v-model="openCreateModal" @created-event="createdEvent" v-on:close-modal="openCreateModal = false"></create-appointment>
            </v-layout>
        </v-app>
         <private-event v-model="privateEventModal"></private-event>
    </v-app>
</template>

<script>
import {FullCalendar} from 'vue-full-calendar'

import NavigationBar from '../../components/NavigationBar.vue'
import router from '../../router'
import moment from 'moment'
import CreateAppointment from '../../components/Appointment.vue'
import ApiDriver from '../../ApiDriver'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from '../../utils/CurrentUserValidation'
import PrivateEvent from "../../components/PrivateEvent"
import Loading from "../../components/Loading"
import ChooseTelescope from "../../components/ChooseTelescope"

export default {
    name: 'Scheduler',
    data() {
        return {
            events: [],
            event: {},
            openCreateModal: false,
            privateEventModal: false,
            tele: true,
            telescopeId: "",
            telescopes: [
                "John Rudy Park", 
                "Scale Model",
                "Virtual"
            ],
            telescopeName: '',
            header: {
                left:   'prev,next today',
                center: 'title',
                right:  'month,agendaWeek,agendaDay'
            },
        }
    },
    components: {
        FullCalendar,
        NavigationBar,
        CreateAppointment,
        PrivateEvent,
        Loading,
        ChooseTelescope
    },
    methods: {
        openEvent(event) {
            if (event.public) {
                router.push('/appointments/' + event.id + "/view" )
            } else if (this.$store.state.isAdmin || (this.$store.state.currentUserId == event.userId)){
                router.push('/appointments/' + event.id + "/view" )
            } else {
                this.privateEventModal = true;
                //alert("Sorry you dont have permission to view that event")
            }
        },
        createEvent: function(Obj) {
            this.event.allDay = Obj.allDay
            this.event.start = moment(Obj.start).format('YYYY-MM-DD hh:mm A')
            this.event.end = moment(Obj.end).format('YYYY-MM-DD hh:mm A')
            
            // this.$data.newStartTime = Obj.start.format();
            // this.$data.newEndTime = Obj.end.format();
            this.openCreateModal = true;
        },
        closeEventModal() {
            this.openCreateModal = false;
        },
        toggleChooseTelescope() {
            this.events = []
            this.tele = !this.tele
        },
        createdEvent: function(data, id) {
            var event = {
                title: "Your Observation",
                backgroundColor: "green",
                id: id,
                end: new Date(data.endTime),
                public: data.isPublic,
                start: new Date(data.startTime),
                telescopeId: data.telescopeId,
                userId: data.userId,
                editable: false,
                draggable: false
            }
            
            if (this.telescopeId == event.telescopeId){
                this.events.push(event)
            }
        },
        populateData: function(id) {
            this.$store.commit("loading", true);
            this.telescopeId = id
            this.telescopeName = this.telescopes[id-1] + " telescope"
            ApiDriver.Appointment.futureAppointmentsByTelescopeID(id, 0, 100).then((response) => {
                HttpResponse.then(response, (data) => {
                        for (var index in response.data.data.content) {
                            var element = response.data.data.content[index]
                            var backgroundColor= "";
                            var title = "";
                            
                            if (element.userId == this.$store.state.currentUserId) {
                                title = "Your Observation";
                                backgroundColor = "green";
                            }
                            else if (element.public) {
                                backgroundColor = "";
                                title = element.userFirstName + " " + element.userLastName;
                            } else {
                                backgroundColor = "black";
                                if (this.$store.state.isAdmin) {
                                    title = element.userFirstName + " " + element.userLastName;
                                } else {
                                    title = "Private Observation"
                                }
                            }
                            

                            var eventData = {
                                title: title,
                                start: new Date(element.startTime),
                                end: new Date(element.endTime),
                                backgroundColor: backgroundColor,
                                id: element.id,
                                telescopeId: element.telescopeId,
                                userId: element.userId,
                                public: element.public,
                                editable: false,
                                draggable: false
                            }
                            this.events.push(eventData);
                        }
                        this.$store.commit("loading", false);
                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">Access Denied<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
                        }
                        this.$store.commit("loading", false);
                    })
            });
        },
        closeModal() {
            this.privateEventModal = false
        }
    }
}

/*$(function() {
$('#calendar').fullCalendar({
    groupByDateAndResource: true,
    defaultView: 'agendaDay',
    header: {
        left:   'prev,next ChangeTelescope',
        center: 'title',
        right:  'month,agendaWeek,agendaDay'
    },
    customButtons: {
        ChangeTelescope: {
            text: 'Change Telescope',
            click: function() {
                this.tele = true
            }
        }
    },
    
    events: this.events
    });
});*/
</script>

<style scoped>
.loading-dialog {
   background-color: #303030; 
}
</style>
