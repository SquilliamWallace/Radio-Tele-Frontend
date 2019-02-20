<template dark>
   
</template>

<script>
import { error } from 'util';
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import ApiDriver from "../ApiDriver";

export default {
    data() {
        return {
            
        }
    },

    props: {
        
    },

    methods: {
        search() {
            // This line sends the User's choice from the list of roles to the
            // parent, through use of @chosen="parentFunction"
            
        }, 
        cancel() {
            // Pass a false value to ViewProfile to indicate that we want
            // the modal closed, through the use of @false="cancelRoleRequest"
            
        }

    }
}
</script>

<style scoped>

</style>