<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
          <!-- Insert code here -->
          <h1>Sensor Data</h1>
    <v-container fluid>
        <v-layout row>
            <v-flex >
                    <v-card :color="overallStatColor">
                        <div class="sensor-status">{{ overallStatText }}</div>
                    </v-card>
            </v-flex>
        </v-layout>
    </v-container>

    <v-container grid text-xs-center>
        <div v-for="sensor in sensors" :key="sensor.name">
            <v-layout row>
                <v-flex md4>
                        <v-card dark >
                                <div class="sensor-name">{{ sensor.name }}</div>
                        </v-card>
                </v-flex>

                <v-flex md4>
                        <v-card dark :color="sensor.statusColor">
                            <div class="sensor-status">{{ sensor.statusText }}</div>
                        </v-card>
                </v-flex>

                <v-flex md>
                    <v-card-actions class="justify-start">
                        <div>
                            <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5" v-model="sensor.override" @change="resetStatuses()"></v-switch>
                        </div>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </div>
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
            overallStatus: 0,
            overallStatColor: "green",
            overallStatText: "OK",

            sensors: [
                { id: 1, name: 'Gate', status: 0, statusColor: '', statusText: '', override: 0 },
                { id: 1, name: 'Proximity', status: 0, statusColor: '', statusText: '', override: 0 },
                { id: 1, name: 'Azimuth Motor', status: 0, statusColor: '', statusText: '', override: 0 },
                { id: 1, name: 'Elevation Motor', status: 0, statusColor: '', statusText: '', override: 0 },
                { id: 1, name: 'Weather Station', status: 0, statusColor: '', statusText: '', override: 0 }
            ],

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
                {   id: 1, name: "Gate", dataType: "tinyint", description: "Resembles status of gate sensor", value: 0, override: 0 },
                {   id: 2, name: "Proximity", dataType: "tinyint", description: "Resembles status of proximity sensor", value: 1, override: 0 },
                {   id: 3, name: "Azimuth Motor", dataType: "tinyint", description: "Resembles status of azimuth motor", value: 2, override: 0 },
                {   id: 4, name: "Elevation Motor", dataType: "tinyint", description: "Resembles status of elevation motor", value: 0, override: 0 },
                {   id: 5, name: "Weather Station", dataType: "tinyint", description: "Resembles status of weather station", value: 2, override: 0 }
            ]
        }
    },
    methods:{
        getOverallStatus(){
            this.overallStatus = 0;             // if all are OK, this remains unchanged
            for (var index of this.dbData) {
                if (!this.isOverride(index.override)){                 // Ignore if overriden
                    if (index.value == 2){
                        this.overallStatus = 2;
                        return this.overallStatus;                     // if ERROR found, immediately return
                    }
                    else if(index.value == 1){
                        this.overallStatus = 1;
                    }
                }
                
            }
            return this.overallStatus;
        },
        setOverallStatus(){
            var overall = this.getOverallStatus();
            // console.log("overall index: " + overall);
            this.overallStatColor = this.getStatusColor(overall);
            this.overallStatText = this.getStatusText(overall);
        },
        setStatuses() {
            for(var dbIndex of this.dbData) {                                              // iterate over all sensors brought in fromd database
                for(var localIndex of this.sensors){                                       // iterate over all local sensor variables
                    if (dbIndex.name == localIndex.name){                                  // We have found the matching sensor
                        localIndex.status = dbIndex.value;                                 // set the status value
                        localIndex.override = dbIndex.override;                              // set the override
                        if (this.isOverride(dbIndex.override)){
                            localIndex.statusColor = "orange";                             // set the status color to orange for override
                            localIndex.statusText = "OVERRIDE";                            // set the status text to OVERRIDE
                        }
                        else{
                            localIndex.statusColor = this.getStatusColor(dbIndex.value);   // set the status color using status value
                            localIndex.statusText = this.getStatusText(dbIndex.value);     // set the status text using status value
                        }
                        
                        console.log(localIndex.name + ", " + localIndex.status + ", " + localIndex.statusColor + ", " + localIndex.statusText);
                    }
                }
            }
            this.setOverallStatus();
        },
        resetStatuses() {
            for(var dbIndex of this.dbData) {                                              // iterate over all sensors brought in fromd database
                for(var localIndex of this.sensors){                                       // iterate over all local sensor variables
                    if (dbIndex.name == localIndex.name){                                  // We have found the matching sensor
                        dbIndex.override = localIndex.override ;                           // Copy the local override value back into the database
                        /* Here is where we would send an HTTP request to the back end updating the new override value */
                    }
                }
            }
            this.setStatuses();                                                                 // Update the front-end
        },
        isOverride(val){
            if (val == 1){ return true; }
            else {return false; }
        },
        getStatusColor(val) {
            switch(val)
            {
                case 0:
                    return "green";
                case 1:
                    return "yellow";
                case 2:
                    return "red";
                default:
                    return "white";          // empty string will result in default grey color
            }
        },
        getStatusText(val) {
            switch(val)
            {
                case 0:
                    return "OK";
                case 1:
                    return "WARNING";
                case 2:
                    return "ERROR";
                default:
                    return "UNKNOWN";
            }
        }
    },
    mounted: function(){
        this.setStatuses();
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