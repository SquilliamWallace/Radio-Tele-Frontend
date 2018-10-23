<template>
  <v-app>
    <navigation-bar></navigation-bar>
    <v-data-table
      :headers="headers"
      :items="RFData"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.rfId }}</td>
        <td class="text-xs">{{ props.item.appointmentId }}</td>
        <td class="text-xs">{{ props.item.intensity }}</td>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
export default {
    name: 'RFData',
    data() {
        return {
            headers: [
                {text: 'RF ID', align: 'left', value: 'rfId'},
                {text: 'Appointment ID', align: 'left', value: 'appointmentId'},
                {text: 'Intensity', align: 'left', value: 'intensity'}
            ],
            RFData: [
                {rfId: 1, appointmentId: 1, intensity: 'wow'},
                {rfId: 2, appointmentId: 1, intensity: 'much'},
                {rfId: 3, appointmentId: 2, intensity: 'very'},
                {rfId: 4, appointmentId: 3, intensity: 'pretty good'},
                {rfId: 5, appointmentId: 2, intensity: 'zoinks'}
            ]
        }
    },
    components: {
        NavigationBar
    }
}
</script>

<style scoped>

</style>
