<template>
    <div>
        <navigation-bar></navigation-bar>
        <v-app light>
            <full-calendar @event-selected="openEvent" :events="events" class='overcast' id="calendar"></full-calendar>
        </v-app>
    </div>
</template>

<script>
import {FullCalendar} from 'vue-full-calendar'
import NavigationBar from '../components/NavigationBar.vue'
import router from '../router'
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
            ]
        }
    },
    components: {
        FullCalendar,
        NavigationBar
    },
    methods: {
        openEvent() {
            router.push('/appointmentView')
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
