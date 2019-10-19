<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">

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