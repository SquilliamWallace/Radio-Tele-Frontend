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
                                                <div v-if="sensor.windThreshold != null || sensor.tempThreshold != null || sensor.vibrationThreshold != null || sensor.currentThreshold || sensor.humidityThreshold != null">
                                                    <div v-if="sensor.windThreshold != null">
                                                        <v-text-field label="Wind Threshold" v-model="sensor.windThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 0)">Submit Wind Threshold</v-btn>
                                                    </div>
                                                    <div v-if="sensor.tempThreshold != null">
                                                        <v-text-field label="Temperature Threshold" v-model="sensor.tempThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 1)">Submit Temperature Threshold</v-btn>
                                                    </div>
                                                    <div v-if="sensor.vibrationThreshold != null">
                                                        <v-text-field label="Vibration Threshold" v-model="sensor.vibrationThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 2)">Submit Vibration Threshold</v-btn>
                                                    </div>
                                                    <div v-if="sensor.currentThreshold != null">
                                                        <v-text-field label="Current Threshold" v-model="sensor.currentThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 3)">Submit Current Threshold</v-btn>
                                                    </div>
                                                    <div v-if="sensor.humidityThreshold != null">
                                                        <v-text-field label= "Humidity Threshold" v-model="sensor.humidityThreshold"></v-text-field>
                                                        <v-btn color="primary darken-2" class="mr-4" @click="submitThreshold(sensor.id, 4)">Submit Humidity Threshold</v-btn>
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
                            <v-switch class="ma-0" inset label="Override" background-color="transparent" color="blue darken-5" v-model="sensor.override" ></v-switch>
                        </div>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
    <v-btn @click="sendSensorData(sensors)">Submit</v-btn>
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
                'weatherStation',
                'tempSensor'
            ],

            sensors: [
                { id: 1, refName: 'NO_REF', displayName: 'Gate', name: 'gate', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: null, vibrationThreshold: null, currentThreshold: null, humidityThreshold: null},
                { id: 2, refName: 'NO_REF', displayName: 'Proximity', name: 'proximity', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: null, vibrationThreshold: null, currentThreshold: null, humidityThreshold: null },
                { id: 3, refName: 'AZ_MOTOR', displayName: 'Azimuth Motor', name: 'azimuthMotor', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: 81, vibrationThreshold: 2, currentThreshold: 7, humidityThreshold: null },
                { id: 4, refName: 'ELEV_MOTOR', displayName: 'Elevation Motor', name: 'elevationMotor', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: 81, vibrationThreshold: 2, currentThreshold: 7, humidityThreshold: null },
                { id: 5, refName: 'NO_REF', displayName: 'Weather Station', name: 'weatherStation', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: 80, tempThreshold: null, vibrationThreshold: null, currentThreshold: null, humidityThreshold: null },
                { id: 6, refName: 'TEMP_SENSOR', displayName: 'Temp/Humidity', name: 'tempSensor', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: 81, vibrationThreshold: null, currentThreshold: null, humidityThreshold: null, humidityThreshold: 100}
            ],

            // status values
            gateStatus: 0,
            proximityStatus: 0,
            azimuthStatus: 0, 
            elevationStatus: 0, 
            weatherStatus: 0,
            tempStatus: 0, 

            // status colors
            gateStatColor: "green",
            proximityStatColor: "yellow",
            azimuthStatColor: "red",
            elevationStatColor: "green",
            weatherStatColor: "red",
            tempStatColor: "red",

            // status text
            gateStatText: "OK",
            proximityStatText: "WARNING",
            azimuthStatText: "ERROR", 
            elevationStatText: "OK",
            weatherStatText: "ERROR",
            tempStatText: "WARNING",

            // imported data
            dbData: [
                // {   id: 1, name: "Gate", dataType: "tinyint", description: "Resembles status of gate sensor", value: 0, override: 0 },
                // {   id: 2, name: "Proximity", dataType: "tinyint", description: "Resembles status of proximity sensor", value: 1, override: 0 },
                // {   id: 3, name: "Azimuth Motor", dataType: "tinyint", description: "Resembles status of azimuth motor", value: 2, override: 0 },
                // {   id: 4, name: "Elevation Motor", dataType: "tinyint", description: "Resembles status of elevation motor", value: 0, override: 0 },
                // {   id: 5, name: "Weather Station", dataType: "tinyint", description: "Resembles status of weather station", value: 2, override: 0 },
                // {   id: 6, name: "Temp Sensor", dataType: "tinyint", description: "Resembles status of temperatures", value: 0, override: 0 }
            ]
        }
    },
    methods:{
        webSocketTest(command){
            ApiDriver.webSocket(command);
        },
        getOverallStatus(dbData){
            this.overallStatus = 0;             // if all are OK, this remains unchanged
            for (var index in this.sensors) {
                if (this.sensorList.includes(this.sensors[index].name) && !this.isOverride(this.sensors[index].override)){   // Ignore if overriden or not sensor
                    if (this.sensors[index].status == 2){
                        this.overallStatus = 2;
                        return this.overallStatus;                     // if ERROR found, immediately return
                    }
                    else if(this.sensors[index].status == 1){
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
                        if (this.isOverride(localIndex.override)){
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
        retrieveOverrides() {
            // Make the API call
            ApiDriver.SensorOverrides.retrieveOverrides().then((response) => {
                // Handle the server response
                HttpResponse.then(response, (data) => {
                    // Populate the data and set the store's boolean back to false
                    // console.log("Data Returned: " + JSON.stringify(data.data));  // Logging for debugging purposes
                    this.setOverrides(data.data);
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
        setOverrides(dbData) {
            for(var dbIndex in dbData) {                                                        // iterate over all sensors brought in from database
                for(var localIndex of this.sensors){                                            // iterate over all local sensor variables
                    var localName = localIndex.displayName.toUpperCase().replace(/ /g, "_");    // turn "sensor name" into "SENSOR_NAME"
                    if (localName == dbData[dbIndex].sensorName){  
                        localIndex.override = dbData[dbIndex].overridden;                         //update override values
                    }
                }
            }
            this.retrieveStatuses();    // the statuses depend on the override states
        },
        overrideSensor(sensor) {
            var s = "";
            if (sensor.name == 'gate') {
                s = "GATE";
            }
            else if (sensor.name == 'proximity') {
                s = "PROXIMITY";
            }
            else if (sensor.name == 'azimuthMotor') {
                s = "AZIMUTH_MOTOR";
            }
            else if (sensor.name == 'elevationMotor') {
                s = "ELEVATION_MOTOR";
            }
            else if (sensor.name == 'weatherStation') {
                s = "WEATHER_STATION";
            }
            else if (sensor.name == 'tempSensor') {
                s = "TEMP_SENSOR";
            }

            ApiDriver.SensorOverrides.updateOverride(s, Boolean(sensor.override)).then((response) =>{
                HttpResponse.then(response, (data) => {
                        this.$swal({
                        title: '<span style="color:#f0ead6">Sensor Overridden<span>',
                        html: '<span style="color:#f0ead6">The sensor has been overridden <span>',
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
            }).catch((error) => {
            // Handle an erroneous API call
                console.log(error)
                let message = "An error occurred when loading this observation";
                HttpResponse.generalError(this, message, true);
            });

            this.retrieveOverrides();
            this.retrieveStatuses();                                                                 // Update the front-end
            console.log("Successfully retrieved new statuses for sensors!")
        },
        isOverride(val){
            if (val == 1 || val == true){ return true; }
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
                        console.log("Successfully retrieved azimuth motor temperature threshold!")
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
                        console.log("Successfully retrieved elevation motor temperature threshold")
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
                if (data[index].sensorName.includes("TEMP_SENSOR")){
                    // Set the Temp Threshold
                        this.sensors[6].tempThreshold = data[index].maximum;
                        console.log("Successfully retrieved temp threshold!")
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
                    console.log("Successfully set azimuth motor temperature threshold!")
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
                    console.log("Successfully set elevation motor temperature threshold!")
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
            else if (id == 6) {
                if (thresholdNumber == 0) {
                    this.setThreshold("TEMP", this.sensors[id - 1].tempThreshold);
                    console.log("Successfully set temp threshold!")
                }
                else if (thresholdNumber == 1) {
                    this.setThreshold("HUMIDITY", this.sensors[id - 1].humidityThreshold);
                    console.log("Successfully set humidity threshold!")
                }
            }
        },

            //         sensors: [
            //     { id: 1, refName: 'NO_REF', displayName: 'Gate', name: 'gate', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: null, vibrationThreshold: null, currentThreshold: null, humidityThreshold: null},
            //     { id: 2, refName: 'NO_REF', displayName: 'Proximity', name: 'proximity', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: null, vibrationThreshold: null, currentThreshold: null, humidityThreshold: null },
            //     { id: 3, refName: 'AZ_MOTOR', displayName: 'Azimuth Motor', name: 'azimuthMotor', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: 81, vibrationThreshold: 2, currentThreshold: 7, humidityThreshold: null },
            //     { id: 4, refName: 'ELEV_MOTOR', displayName: 'Elevation Motor', name: 'elevationMotor', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: 81, vibrationThreshold: 2, currentThreshold: 7, humidityThreshold: null },
            //     { id: 5, refName: 'NO_REF', displayName: 'Weather Station', name: 'weatherStation', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: 80, tempThreshold: null, vibrationThreshold: null, currentThreshold: null, humidityThreshold: null },
            //     { id: 6, refName: 'TEMP_SENSOR', displayName: 'Temp/Humidity', name: 'tempSensor', status: 0, statusColor: '', statusText: '', override: 0, thresholdToggle: false, windThreshold: null, tempThreshold: 81, vibrationThreshold: null, currentThreshold: null, humidityThreshold: 100}
            // ],

        sendSensorData(sensors){
            const AllSensorData = [];
            for(var i = 0; i < 14; i++){
                AllSensorData[i] = 0;
            }

            for(var x = 0; x < 14; x++){
                if(sensors.id){
                    AllSensorData[0] = sensors[x].id;
                }
                if(sensors.refName){
                    AllSensorData[1] = sensors[x].refName;
                }
                if(sensors.displayName){
                    AllSensorData[2] = sensors[x].displayName;
                }
                if(sensors.name){
                    AllSensorData[3] = sensors[x].name;
                }
                if(sensors.status){
                    AllSensorData[4] = sensors[x].staus;
                }
                if(sensors.statusColor){
                    AllSensorData[5] = sensors[x].statusColor;
                }
                if(sensors.statusText){
                    AllSensorData[6] = sensors[x].statusText;
                }
                if(sensors.override){
                    AllSensorData[7] = sensors[x].override;
                }
                if(sensors.thresholdToggle){
                    AllSensorData[8] = sensors[x].thresholdToggle;
                }
                if(sensors.windThreshold){
                    AllSensorData[9] = sensors[x].windThreshold;
                }
                if(sensors.tempThreshold){
                    AllSensorData[10] = sensors[x].tempThreshold;
                }
                if(sensors.vibrationThreshold){
                    AllSensorData[11] = sensors[x].vibrationThreshold;
                }
                if(sensors.currentThreshold){
                    AllSensorData[12] = sensors[x].currentThreshold;
                }
                if(sensors.humidityThreshold){
                    AllSensorData[13] = sensors[x].humidityThreshold;
                }
            }

            var InitCommand = "VERSION | SENSOR_INIT | " + AllSensorData.toString() + " | " + new Date().toUTCString;
            this.webSocketTest(InitCommand);
        }
    },
    mounted: function(){
        this.retrieveOverrides();       // Statuses are updated ofter override states are retrieved
        this.getThresholds();
    },
    //overrides and statuses need to be changed to persist on front end after page refresh
    beforeUpdate: function() {

    },
    updated: function() {
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