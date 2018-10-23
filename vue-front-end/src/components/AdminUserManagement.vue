<template>
    <v-card flat>
        <v-card-title>
            
        </v-card-title>
    </v-card>
</template>
<script>
import router from '../router';
import ApiDriver from '../ApiDriver';
export default {
    name: 'AdminUserManagement',
    data(){
        return{
            data: {
               pageNumber: 0,
               pageSize: 50 
            },

        }
    },
    methods:{
        getUsers(){
            ApiDriver.User.allUsers(this.data).then((response) => {
                console.log(response)
                this.populateData(response.data.data)
            }).catch((error) => {
                console.log(error)
            });
        },
        populateData(){
            
        }
    },
    
    mounted: function(){
    this.getUsers()
}
}

</script>
<style scoped>

</style>
