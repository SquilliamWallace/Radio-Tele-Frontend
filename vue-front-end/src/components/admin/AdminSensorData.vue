<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
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
                                <!-- <div class="sensor-name">{{ sensor.displayName }}</div> -->
                                <v-btn block class="sensor-button" height=100 @click="sensor.thresholdToggle = true; getThresholds();">{{ sensor.displayName }}</v-btn>
                                <v-dialog hide-overlay width="600px" v-model="sensor.thresholdToggle">
                                    <!-- <v-btn outlined color="primary darken-2" slot="activator">{{sensor.displayName}}</v-btn> -->
                                    <v-card dark>
                                        <v-card-subtitle>
                                            <h1>Thresholds for {{ sensor.displayName }} Sensor</h1>
                                        </v-card-subtitle>
                                        <v-card-text>
                                            <v-form>
                                                <div v-if="sensor.windThreshold != null || sensor.tempThreshold != null || sensor.vibrationThreshold != null || sensor.currentThreshold != null">
                                                    <div v-if="sensor.windThreshold != null">
                                                        <v-text-field label="Wind Threshold" v-model="sensor.windThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 0)">Submit Wind Threshold</v-btn>
                                                    </div>
                                                    <div v-if="sensor.tempThreshold != null">
                                                        <v-text-field label="Temp Threshold" v-model="sensor.tempThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 1)">Submit Temp Threshold</v-btn>
                                                    </div>
                                                    <div v-if="sensor.vibrationThreshold != null">
                                                        <v-text-field label="Vibration Threshold" v-model="sensor.vibrationThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 2)">Submit Vibration Threshold</v-btn>
                                                    </div>
                                                    <div v-if="sensor.currentThreshold != null">
                                                        <v-text-field label="Current Threshold" v-model="sensor.currentThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 3)">Submit Current Threshold</v-btn>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <v-card-text>No thresholds for this sensor</v-card-text>
                                                </div>
                                            </v-form>
                                        </v-card-text>
                                    </v-card> 
                                </v-dialog>
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

            sensorList: [
                'gate',
                'proximity',
                'azimuthMotor',
                'elevationMotor',
                'weatherStation'
            ],

            sensors: [
                { id: 1, refName: 'NO_REF', displayName: 'Gate', name: 'gate', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: null, vibrationThreshold: null, currentThreshold: null },
                { id: 2, refName: 'NO_REF', displayName: 'Proximity', name: 'proximity', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: null, vibrationThreshold: null, currentThreshold: null },
                { id: 3, refName: 'AZ_MOTOR', displayName: 'Azimuth Motor', name: 'azimuthMotor', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: 81, vibrationThreshold: 2, currentThreshold: 7 },
                { id: 4, refName: 'ELEV_MOTOR', displayName: 'Elevation Motor', name: 'elevationMotor', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: 81, vibrationThreshold: 2, currentThreshold: 7 },
                { id: 5, refName: 'NO_REF', displayName: 'Weather Station', name: 'weatherStation', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: 80, tempThreshold: null, vibrationThreshold: null, currentThreshold: null }
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
                // {   id: 1, name: "Gate", dataType: "tinyint", description: "Resembles status of gate sensor", value: 0, override: 0 },
                // {   id: 2, name: "Proximity", dataType: "tinyint", description: "Resembles status of proximity sensor", value: 1, override: 0 },
                // {   id: 3, name: "Azimuth Motor", dataType: "tinyint", description: "Resembles status of azimuth motor", value: 2, override: 0 },
                // {   id: 4, name: "Elevation Motor", dataType: "tinyint", description: "Resembles status of elevation motor", value: 0, override: 0 },
                // {   id: 5, name: "Weather Station", dataType: "tinyint", description: "Resembles status of weather station", value: 2, override: 0 }
            ]
        }
    },
    methods:{
        getOverallStatus(dbData){
            this.overallStatus = 0;             // if all are OK, this remains unchanged
            for (var index in dbData) {
                if (this.sensorList.includes(index) && !this.isOverride(index.override)){   // Ignore if overriden or not sensor
                    if (dbData[index] == 2){
                        this.overallStatus = 2;
                        return this.overallStatus;                     // if ERROR found, immediately return
                    }
                    else if(dbData[index] == 1){
                        this.overallStatus = 1;
                        // console.log("Status 1 found: " + index);     // Logging for debugging purposes
                    }
                }
                
            }
            return this.overallStatus;
        },
        setOverallStatus(dbData){
            var overall = this.getOverallStatus(dbData);
            // console.log("overall index: " + overall);
            this.overallStatColor = this.getStatusColor(overall);
            this.overallStatText = this.getStatusText(overall);
        },
        setStatuses(dbData) {
            for(var dbIndex in dbData) {                                              // iterate over all sensors brought in from database
                // console.log("dbData: " + dbIndex + ", " + dbData[dbIndex]);              // Logging for debugging purposes
                for(var localIndex of this.sensors){                                       // iterate over all local sensor variables
                    if (dbIndex == localIndex.name){   
                        // console.log("Found: " + dbIndex);                               // We have found the matching sensor
                        localIndex.status = dbData[dbIndex];                                 // set the status value
                        localIndex.override = dbIndex.override;                              // set the override
                        if (this.isOverride(dbIndex.override)){
                            localIndex.statusColor = "orange";                             // set the status color to orange for override
                            localIndex.statusText = "OVERRIDE";                            // set the status text to OVERRIDE
                        }
                        else{
                            localIndex.statusColor = this.getStatusColor(dbData[dbIndex]);   // set the status color using status value
                            localIndex.statusText = this.getStatusText(dbData[dbIndex]);     // set the status text using status value
                        }
                        
                        // console.log(localIndex.name + ", " + localIndex.status + ", " + localIndex.statusColor + ", " + localIndex.statusText);
                    }
                }
            }
            this.setOverallStatus(dbData);
        },
        retrieveStatuses() {
            // Make the API call
            ApiDriver.SensorStatus.getMostRecent().then((response) => {
                // Handle the server response
                HttpResponse.then(response, (data) => {
                    // Populate the data and set the store's boolean back to false
                    // console.log("Data Returned: " + JSON.stringify(data.data));  // Logging for debugging purposes
                    this.setStatuses(data.data);
                    this.$store.commit("loading", false)
                }, (status, errors) => {
                    // Access Denied
                    if (parseInt(status) === 403) {
                        // Call the generic access denied handler
                        HttpResponse.accessDenied(this);
                    } 
                    // Not Found
                    else if (parseInt(status) === 404) {
                        // Call the generic invalid resource id handler
                        HttpResponse.notFound(this, errors);
                    }
                })
            })
        },
        resetStatuses() {
            // This part is going to have to be redone when overrides are implemented
            for(var dbIndex of this.dbData) {                                              // iterate over all sensors brought in fromd database
                for(var localIndex of this.sensors){                                       // iterate over all local sensor variables
                    if (dbIndex.name == localIndex.name){                                  // We have found the matching sensor
                        dbIndex.override = localIndex.override ;                           // Copy the local override value back into the database
                        /* Here is where we would send an HTTP request to the back end updating the new override value */
                    }
                }
            }
            this.retrieveStatuses();                                                                 // Update the front-end
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
        },
        getThresholds(){
            // Set the store's loading boolean to true
            this.$store.commit("loading", true);

            // Make the API call
            ApiDriver.Thresholds.retrieveThresholds().then((response) => {  
                // Handle the server response         
                HttpResponse.then(response, (data) => {
                    // Populate the data and set the store's boolean back to false
                    console.log("Thresholds returned: " + JSON.stringify(data.data));
                    this.populateData(data.data)    
                    console.log("Thresholds after populate: " + JSON.stringify(this.thresholds));                                        
                    this.$store.commit("loading", false);
                }, (status, errors) => {
                    // Access Denied
                    if (parseInt(status) === 403) {
                        // Call the generic access denied handler
                        HttpResponse.accessDenied(this);
                    } 
                    // Invalid Resource Id
                    else if (parseInt(status) === 404) {
                        // Call the generic not found handler
                        HttpResponse.notFound(this, errors);
                    }
                })
            }).catch((error) => {
                // Handle an erroneous API call
                console.log(error)
                let message = "An error occurred when loading this observation";
                HttpResponse.generalError(this, message, true);
            });
        },
        populateData(data){
            console.log("Entered populatData()...");
            for (var index in data) {
                console.log("Data: " + JSON.stringify(data[index]));
                if (data[index].sensorName.includes("AZ_MOTOR")){
                    if (data[index].sensorName.includes("TEMP")){
                        // Set the Temperature thresholds for the Azimuth Motor
                        this.sensors[2].tempThreshold = data[index].maximum;
                        console.log("Successfully retrieved azimuth motor temp threshold!")
                    }
                    else if (data[index].sensorName.includes("VIBRATION")){
                        // Set the Temperature thresholds for the Azimuth Motor
                        this.sensors[2].vibrationThreshold = data[index].maximum;
                        console.log("Successfully retrieved azimuth motor vibration threshold!")
                    }
                    else if (data[index].sensorName.includes("CURRENT")){
                        // Set the Temperature thresholds for the Azimuth Motor
                        this.sensors[2].currentThreshold = data[index].maximum;
                        console.log("Successfully retrieved azimuth motor current threshold!")
                    }
                }
                if (data[index].sensorName.includes("ELEV_MOTOR")){
                    if (data[index].sensorName.includes("TEMP")){
                        // Set the Temperature thresholds for the Elevation Motor
                        this.sensors[3].tempThreshold = data[index].maximum;
                        console.log("Successfully retrieved elevation motor temp threshold")
                    }
                    else if (data[index].sensorName.includes("VIBRATION")){
                        // Set the Temperature thresholds for the Elevation Motor
                        this.sensors[3].vibrationThreshold = data[index].maximum;
                        console.log("Successfully retrieved elevation motor vibration threshold!")
                    }
                    else if (data[index].sensorName.includes("CURRENT")){
                        // Set the Temperature thresholds for the Elevation Motor
                        this.sensors[3].currentThreshold = data[index].maximum;
                        console.log("Successfully retrieved elevation motor current threshold!")
                    }   
                }
                if (data[index].sensorName.includes("WIND")){
                    // Set the Wind Threshold
                        this.sensors[4].windThreshold = data[index].maximum;
                        console.log("Successfully retrieved wind threshold!")
                }
            }
        },
        setThreshold(thresholdName, thresholdValue) {
            ApiDriver.Thresholds.updateThresholdByName(thresholdName, thresholdValue).then((response) =>{
            HttpResponse.then(response, (data) => {
                    this.$swal({
                    title: '<span style="color:#f0ead6">Threshold Set<span>',
                    html: '<span style="color:#f0ead6">The threshold has been updated with the new maximum <span>',
                    type: 'success',
                    background: '#302f2f'
                });
                this.$emit('input');
            }, (status, errors) => {
                if(parseInt(status)==403){
                    HttpResponse.accessDenied(this)
                } else if(parseInt(status)==404){
                    HttpResponse.notFound(this, errors)
                } else {
                    for(var field in errors) {
                        let message = errors[field][0]
                    }
                    HttpResponse.generalError(this, message, false)
                }
            })
        })
        },
        submitThreshold(id, thresholdNumber){
            console.log("Threshold ID: " + id);
            // Save the thresholds values for Threshold ID
            if (id == 3) {
                if (thresholdNumber == 1) {
                    this.setThreshold("AZ_MOTOR_TEMP", this.sensors[id - 1].tempThreshold);
                    console.log("Successfully set azimuth motor temp threshold!")
                }
                else if (thresholdNumber == 2) {
                    this.setThreshold("AZ_MOTOR_VIBRATION", this.sensors[id - 1].vibrationThreshold);
                    console.log("Successfully set azimuth motor vibration threshold!")
                }
                else if (thresholdNumber == 3) {
                    this.setThreshold("AZ_MOTOR_CURRENT", this.sensors[id - 1].currentThreshold);
                    console.log("Successfully set azimuth motor current threshold!")
                }
            }
            else if (id == 4) {
                if (thresholdNumber == 1) {
                    this.setThreshold("ELEV_MOTOR_TEMP", this.sensors[id - 1].tempThreshold);
                    console.log("Successfully set elevation motor temp threshold!")
                }
                else if (thresholdNumber == 2) {
                    this.setThreshold("ELEV_MOTOR_VIBRATION", this.sensors[id - 1].vibrationThreshold);
                    console.log("Successfully set elevation motor vibration threshold!")
                }
                else if (thresholdNumber == 3) {
                    this.setThreshold("ELEV_MOTOR_CURRENT", this.sensors[id - 1].currentThreshold);
                    console.log("Successfully set elevation motor current threshold!")
                }
            }
            else if (id == 5) {
                if (thresholdNumber == 0) {
                    this.setThreshold("WIND", this.sensors[id - 1].windThreshold);
                    console.log("Successfully set wind threshold!")
                }
            }
        },
    },
    mounted: function(){
        this.retrieveStatuses();
        this.getThresholds();
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
.sensor-button {
    text-align: center;
    /* display: block; */
    font-size: 35px;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-color: "primary";
}
</style>