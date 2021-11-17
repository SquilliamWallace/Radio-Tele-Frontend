<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
    <v-container grid text-xs-center>
        <v-card-title primary-title class="justify-center">Sensor Network Sensor Initialization</v-card-title>
    </v-container>
    <v-container fluid>
        <v-checkbox v-model="sensorInit.AzimuthTemperature" label="Azimuth Temperature"></v-checkbox>
        <v-checkbox v-model="sensorInit.ElevationTemperature" label="Elevation Temperature"></v-checkbox>
        <v-checkbox v-model="sensorInit.AzimuthAccelerometer" label="Azimuth Accelerometer"></v-checkbox>
        <v-checkbox v-model="sensorInit.ElevationAccelerometer" label="Elevation Accelerometer"></v-checkbox>
        <v-checkbox v-model="sensorInit.CounterbalanceAccelerometer" label="Counterbalance Accelerometer"></v-checkbox>
        <v-checkbox v-model="sensorInit.AzimuthEncoder" label="Azimuth Encoder"></v-checkbox>
        <v-checkbox v-model="sensorInit.ElevationEncoder" label="Elevation Encoder"></v-checkbox>
    </v-container>
    <v-container>
        <input v-model="sensorInit.InitTimeout" placeholder="Initialization Timeout (seconds)" name="InitTimeout">
    </v-container>
    <v-container>
        <input v-model="sensorInit.RetTimeOut" placeholder="Data Retrieval Timeout (seconds)" name="DataRetTimeout">
    </v-container>

    <v-btn @click="fillSensorInitData(sensorInit)">TEST WEBSOCKET BUTTON</v-btn>

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
    name: 'SensorInit',
    data () {
    return {
        Command: "SCRIPT: STOW",
        sensorInit: {
            ElevationEncoder: false,
            AzimuthEncoder: false,
            ElevationTemperature: false,
            AzimuthTemperature: false,
            AzimuthAccelerometer: false,
            ElevationAccelerometer: false,
            CounterbalanceAccelerometer: false,
            RetTimeOut: null,
            InitTimeout: null,
        }
    }
  },
    methods:{
        webSocketTest(command){
            ApiDriver.webSocket(command);
        },
        fillSensorInitData(sensorInit){
            const SensorInitData = [];
            for(var i = 0; i < 9; i++){
                SensorInitData[i] = 0;
            }

            if(sensorInit.AzimuthTemperature){
                SensorInitData[0] = 1;
            }
            if(sensorInit.ElevationTemperature){
                SensorInitData[1] = 1;
            }
            if(sensorInit.AzimuthAccelerometer){
                SensorInitData[2] = 1;
            }
            if(sensorInit.ElevationAccelerometer){
                SensorInitData[3] = 1;
            }
            if(sensorInit.CounterbalanceAccelerometer){
                SensorInitData[4] = 1;
            }
            if(sensorInit.AzimuthEncoder){
                SensorInitData[5] = 1;
            }
            if(sensorInit.ElevationEncoder){
                SensorInitData[6] = 1;
            }
            if(sensorInit.InitTimeout != null){
                SensorInitData[7] = sensorInit.InitTimeout;
            }
            if(sensorInit.RetTimeOut != null){
                SensorInitData[8] = sensorInit.RetTimeOut;
            }

            var InitCommand = "VERSION | SENSOR_INIT | " + SensorInitData.toString() + " | " + new Date().toUTCString;
            this.webSocketTest(InitCommand);      
        }
  }
};
</script>
<style scoped>
</style>