<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">

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