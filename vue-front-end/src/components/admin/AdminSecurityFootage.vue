<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
        <h1>Security Footage</h1>

        
        
    </v-card>
</div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading";
import moment from 'moment';    // Is this page going to be working with dates. 
export default {
    name: 'SecurityFootage',
    data(){
        return {
            
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

</style>