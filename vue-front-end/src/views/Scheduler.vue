<template>
    <div>
        <navigation-bar></navigation-bar>
        <v-app light>
            <full-calendar @event-created="createEvent" @event-selected="openEvent" :events="events" id="calendar"></full-calendar>
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
        },
        createEvent(time) {
            var title = prompt ("Enter a title");
            var event = {
                title: title,
                start: time.start.format(),
                end: time.end.format()
            };
            this.$data.events.push(event);
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
