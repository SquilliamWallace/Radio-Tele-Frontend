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
            events: [
                {
                    endTime: "2018-10-24T12:30:00.000+0000",
                    id: 1,
                    public: true,
                    startTime: "2018-10-24T09:00:00.000+0000",
                    status: "Scheduled",
                    telescopeId: 1,
                    userFirstName: "Matthew",
                    userId: 1,
                    userLastName: "Hasz"
                }
],
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
        openEvent() {
            router.push('/appointmentView')
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
                            var eventData = {
                                title: element.userFirstName + " " + element.userLastName,
                                start: element.startTime,
                                end: element.endTime
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

</style>
