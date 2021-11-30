<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
    <v-container grid text-xs-center>
        <v-card-title primary-title class="justify-center">Sensor Network Sensor Initialization</v-card-title>
    </v-container>

    <v-container fluid>
        <v-checkbox v-model="sensorInit.ElevationEncoder" label="Elevation Encoder"></v-checkbox>
        <v-checkbox v-model="sensorInit.AzimuthEncoder" label="Azimuth Encoder"></v-checkbox>
        <v-checkbox v-model="sensorInit.ElevationTemperature" label="Elevation Temperature"></v-checkbox>
        <v-checkbox v-model="sensorInit.AzimuthTemperature" label="Azimuth Temperature"></v-checkbox>
        <v-checkbox v-model="sensorInit.AzimuthAccelerometer" label="Azimuth Accelerometer"></v-checkbox>
        <v-checkbox v-model="sensorInit.ElevationAccelerometer" label="Elevation Accelerometer"></v-checkbox>
        <v-checkbox v-model="sensorInit.CounterbalanceAccelerometer" label="Counterbalance Accelerometer"></v-checkbox>
        <input v-model="sensorInit.RetTimeOut" placeholder="Data Retrieval Timeout (seconds)" name="DataRetTimeout" class="textbox">    
        <input v-model="sensorInit.InitTimeout" placeholder="Initialization Timeout (seconds)" name="InitTimeout" class="textbox">
    </v-container>


    <v-btn :disabled="bothInputFieldsFilled" @click="fillSensorInitData(sensorInit)">Submit</v-btn>
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
    computed:{
        bothInputFieldsFilled(){
            return !(this.sensorInit.RetTimeOut != null && this.sensorInit.RetTimeOut != 0 && this.sensorInit.InitTimeout !=null && this.sensorInit.InitTimeout != 0)
        }
    },
    methods:{
        sendCommand(command){
            ApiDriver.webSocket(command);
        },
        fillSensorInitData(sensorInit){
            const SensorInitData = [];
            for(var i = 0; i < 9; i++){
                SensorInitData[i] = 0;
            }

            if(sensorInit.ElevationEncoder){
                SensorInitData[0] = 1;
            }
            if(sensorInit.AzimuthEncoder){
                SensorInitData[1] = 1;
            }
            if(sensorInit.ElevationTemperature){
                SensorInitData[2] = 1;
            }
            if(sensorInit.AzimuthTemperature){
                SensorInitData[3] = 1;
            }
            if(sensorInit.AzimuthAccelerometer){
                SensorInitData[4] = 1;
            }
            if(sensorInit.ElevationAccelerometer){
                SensorInitData[5] = 1;
            }
            if(sensorInit.CounterbalanceAccelerometer){
                SensorInitData[6] = 1;
            }
            if(sensorInit.RetTimeOut != null){
                SensorInitData[7] = sensorInit.InitTimeout;
            }
            if(sensorInit.InitTimeout != null){
                SensorInitData[8] = sensorInit.RetTimeOut;
            }

            var InitCommand = "1.0 | SENSOR_INIT | " + SensorInitData.toString() + " | " + "TIME"
            this.sendCommand(InitCommand);      
        }
    }
};
</script>
<style scoped>
.textbox{
    width: 100%;
    height: 50px;
    border-color: white;
    color: white;
}
</style>