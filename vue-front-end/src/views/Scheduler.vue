<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <v-app light>
            <full-calendar @event-created="createEvent" @event-selected="openEvent" :events="events" class='overcast' id="calendar"></full-calendar>
            <v-layout justify-center>
                <create-appointment :eventObj="event" v-model="openCreateModal" v-on:close-modal="openCreateModal = false"></create-appointment>
            </v-layout>
        </v-app>
    </v-app>
</template>

<script>
import {FullCalendar} from 'vue-full-calendar'
import NavigationBar from '../components/NavigationBar.vue'
import router from '../router'
import CreateAppointment from '../components/Appointment.vue'
import ApiDriver from '../ApiDriver'
import HttpResponse from '../utils/HttpResponse'
import CurrentUserValidation from '../utils/CurrentUserValidation'
export default {
    name: 'Scheduler',
    data() {
        return {
            events: [],
            openCreateModal: false,
            event: {
                title: "",
                allDay: false,
                start: "",
                end: ""
            }
        }
    },
    components: {
        FullCalendar,
        NavigationBar,
        CreateAppointment
    },
    methods: {
        openEvent(event) {
            console.log(event)
            if (event.public) {
                router.push('/appointments/' + event.id + "/view" )
            }
            else if (this.$store.state.isAdmin || (this.$store.state.currentUserId == event.userId)){
                router.push('/appointments/' + event.id + "/view" )
            } else {
                prompt("Sorry you dont have permission to view that event")
            }
        },
        createEvent(Obj) {
            this.event.allDay = Obj.allDay
            this.event.start = Obj.start.format()
            this.event.end = Obj.end.format()
            
            // this.$data.newStartTime = Obj.start.format();
            // this.$data.newEndTime = Obj.end.format();
            this.openCreateModal = true;
        },
        closeEventModal() {
            this.openCreateModal = false;
        },
        populateData() {
            ApiDriver.Appointment.futureAppointmentsByTelescopeID(1, 0, 100).then((response) => {
                //console.log(response.data.data.content);
                HttpResponse.then(response, (data) => {
                        for (var index in response.data.data.content) {
                            var element = response.data.data.content[index]
                            var backgroundColor= "";
                            var title = "";
                            console.log(element.public);
                            if (element.public) {
                                backgroundColor = "";
                                title = element.userFirstName + " " + element.userLastName;
                            } else {
                                backgroundColor = "black";
                            }
                            var eventData = {
                                title: title,
                                start: element.startTime,
                                end: element.endTime,
                                backgroundColor: backgroundColor,
                                id: element.id,
                                telescopeId: element.telescopeId,
                                userId: element.userId,
                                public: element.public
                            }

                            this.events.push(eventData)
                        }
                    }, (status, errors) => {
                        if (parseInt(status) === 403) {
                            alert("Access Denied");
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        } else {
                            console.log(status)
                            console.log(errors)
                        }
                    })
            });
        }
    },
    mounted() {
        this.populateData();
    }  
}

$(function() {
$('#calendar').fullCalendar({
    themeSystem: 'jquery-ui',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listMonth'
    }
    });
});
</script>

<style scoped>
.loading-dialog {
   background-color: #303030; 
}
</style>
