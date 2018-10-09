<template>
<v-app light>
    <full-calendar class='overcast' id="calendar"></full-calendar>
</v-app>
</template>

<script>
import {FullCalendar} from 'vue-full-calendar'
export default {
    name: 'Scheduler',
    components: {
        FullCalendar
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
