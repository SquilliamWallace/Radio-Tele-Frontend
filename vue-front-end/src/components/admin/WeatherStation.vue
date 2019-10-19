<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">

    <v-data-table
        v-if="!$store.state.isLoading"
        hide-actions
        :headers="headers"
        :items="bodies"
        :pagination.sync="pagination"
        select-all
        class="elevation-1"
    >
        <template slot="headers" slot-scope="props">
            <tr>
            <th class="text-xs-center" v-for="header in props.headers" :key="header.text">
                <h2>{{ header.text }}</h2>
            </th>
            </tr>
        </template>
        <!--  -->
        <template slot="items" slot-scope="props">
            <tr
            @click="updateForm(props.item.name, props.item.id, props.item.declination, props.item.hours, props.item.minutes, props.item.seconds)"
            >
            <!-- <td class="text-xs-left">{{ props.item.id }}</td> -->
            <td class="text-xs-center">{{ props.item.text }}</td>
            <td class="text-xs-center">{{ props.item.val }}</td>
            </tr>
        </template>
    </v-data-table>

    <v-layout justify-center>
        <v-flex xs12 sm1>
            <v-select
                v-model="selectedDataSet"
                :items="dataSetList"
                label="Data Set"
            >
            </v-select>
        </v-flex>
    </v-layout>


          
    </v-card>
</div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading"

export default {
    name: 'WeatherStation',
    data(){
        return {
            headers: [
                { text: 'Data Set', align: 'left', sortable: false, value: 'dataName'},
                { text: 'Current Conditions', sortable: false, value: 'val' }
            ],
            bodies: [
                { id: 1, text: 'Temperature', val: "81 °F"},
                { id: 2, text: 'Wind Speed', val: "24 mph"},
                { id: 3, text: 'Rain Gauge', val: "2.0 in"}
            ],
            dataSetList: [
                'Temperature',
                'Wind Speed',
                'Rain Gauge'
            ],
            selectedDataSet: ''

        }
    },
    methods:{

    },
    mounted: function(){

    },
    components: {
        Loading,
    }
};

</script>
<style scoped>
    
</style>