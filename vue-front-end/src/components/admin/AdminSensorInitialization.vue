<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
    <v-container grid text-xs-center>
        <v-card-title primary-title class="justify-center">Sensor Network Sensor Initialization</v-card-title>
    </v-container>
    <v-checkbox v-model="SensorInitData" label="Elevation Encoder" value="1"></v-checkbox>
    <v-checkbox v-model="SensorInitData" label="Azimuth Encoder" value="2"></v-checkbox>
    <v-checkbox v-model="SensorInitData" label="Elevation Temperature" value="3"></v-checkbox>
    <v-checkbox v-model="SensorInitData" label="Azimuth Temperature" value="4"></v-checkbox>
    <v-checkbox v-model="SensorInitData" label="Azimuth Accelerometer" value="5"></v-checkbox>
    <v-checkbox v-model="SensorInitData" label="Elevation Accelerometer" value="6"></v-checkbox>
    <v-checkbox v-model="SensorInitData" label="Counterbalance Accelerometer" value="7"></v-checkbox>
    <v-text-field v-model="DataRetTimeout" label="Data Retrieval Timeout (seconds)" outlined></v-text-field>
    <v-text-field v-model="InitTimeout" label="Initialization Timeout (seconds)" outlined></v-text-field>
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
        SensorInitData: [],
        DataRetTimeOut: null,
        InitTimeout: null,
    }
  },
};
</script>
<style scoped>
</style>