<template>
    <v-card flat>
        <v-card-title>
            <v-list>
                <v-list-tile v-for="user in users" :key = "user.Firstname" v-bind:href = "'http://localhost:8081/users/' + user.id + '/view'">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{user.firstName}} {{user.lastName}}: {{user.membershipRole}}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                            {{user.email}}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
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
            users: [],
            viewUserId:''
            
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
        populateData(data){
            this.users = data.content
        },
        
    },
    
    mounted: function(){
        this.getUsers()
    }
}

</script>
<style scoped>

</style>
