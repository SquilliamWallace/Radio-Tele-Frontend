<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <v-app light>
            <full-calendar @event-created="createEvent" @event-selected="openEvent" :events="events" class='overcast' id="calendar"></full-calendar>
            <v-layout justify-center>
                <v-dialog dark fullscreen hide-overlay v-model="openCreateModal">
                    <create-appointment :eventObj="event" v-on:close-modal="closeEventModal"></create-appointment>
                </v-dialog>
            </v-layout>
        </v-app>
    </v-app>
</template>

<script>
import {FullCalendar} from 'vue-full-calendar'
import NavigationBar from '../components/NavigationBar.vue'
import router from '../router'
import CreateAppointment from '../components/Appointment.vue'
export default {
    name: 'Scheduler',
    data() {
        return {
            events: [
                {
                    title: 'watch them stars',
                    start: '2018-10-09T00:00:01',
                    allDay: true
                },
                {
                    title: 'do it again but for less time',
                    start: '2018-10-10T12:00:00',
                    end: '2018-10-10T15:00:00'
                },
                {
                    title: 'i guess ill go again',
                    start: '2018-10-11T05:00:00',
                    end: '2018-10-11T10:00:00'
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
        }
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
