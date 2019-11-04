<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
          <!-- Insert code here -->
          <h1>Sensor Data</h1>

<v-container grid text-xs-center>
    <v-layout row>
        <v-flex md4>
                <v-card dark >                 
                        <div class="sensor-name">Overall</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark color="red">
                    <div class="sensor-status">Error</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>
    
    <v-layout row>
        <v-flex md4>
                <v-card dark >
                        <div class="sensor-name">Gate</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark :color="gateStatColor">
                    <div class="sensor-status">{{ gateStatText }}</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md4>
                <v-card dark >
                        <div class="sensor-name">Proximity</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark :color="proximityStatColor">
                    <div class="sensor-status">{{ proximityStatText }}</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md4>
                <v-card dark >
                        <div class="sensor-name">Azimuth Motor</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark :color="azimuthStatColor">
                    <div class="sensor-status">{{ azimuthStatText }}</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md4>
                <v-card dark >
                        <div class="sensor-name">Elevation Motor</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark :color="elevationStatColor">
                    <div class="sensor-status">{{ elevationStatText }}</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex md4>
                <v-card dark >
                        <div class="sensor-name">Weather Station</div>
                </v-card>
        </v-flex>

        <v-flex md4>
                <v-card dark :color="weatherStatColor">
                    <div class="sensor-status">{{ weatherStatText }}</div>
                </v-card>
        </v-flex>

        <v-flex md>
            <v-card-actions class="justify-start">
                <div>
                    <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5"></v-switch>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>

</v-container>
</v-card>

</div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading"
import moment from 'moment';    // Is this page going to be working with dates. 
export default {
    name: 'SensorData',
    data(){
        return {
            // Overall data

            // status values
            gateStatus: 0,
            proximityStatus: 0,
            azimuthStatus: 0, 
            elevationStatus: 0, 
            weatherStatus: 0, 

            // status colors
            gateStatColor: "green",
            proximityStatColor: "yellow",
            azimuthStatColor: "red",
            elevationStatColor: "green",
            weatherStatColor: "red",
            // status text
            gateStatText: "OK",
            proximityStatText: "WARNING",
            azimuthStatText: "ERROR", 
            elevationStatText: "OK",
            weatherStatText: "ERROR",

            // imported data
            dbData: [
                {   id: 1, name: "Gate", dataType: "tinyint", description: "Resembles status of gate sensor", value: 0 },
                {   id: 2, name: "Proximity", dataType: "tinyint", description: "Resembles status of proximity sensor", value: 1 },
                {   id: 3, name: "Azimuth Motor", dataType: "tinyint", description: "Resembles status of azimuth motor", value: 2 },
                {   id: 4, name: "Elevation Motor", dataType: "tinyint", description: "Resembles status of elevation motor", value: 0 },
                {   id: 5, name: "Weather Station", dataType: "tinyint", description: "Resembles status of weather station", value: 1 }
            ]
        }
    },
    methods:{
        
    },
    mounted: function(){

    },
    components: {
        Loading
    },
    computed: {
        
    }
};
</script>
<style scoped>
.sensor-name {
    text-align: center;
    color: white; 
    font-size: 35px;
    /* text-decoration: underline; */
    text-decoration-color: white;
}
.sensor-status {
    text-align: center;
    color: black; 
    font-size: 35px;
    /* text-decoration: underline; */
    text-decoration-color: white;
}
</style>