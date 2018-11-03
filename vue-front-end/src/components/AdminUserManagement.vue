<template>
    <v-card  width = "100%">
            <v-list >
                <v-list-tile v-for="user in users" :key = "user.id"  @click="hover = !hover">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{user.firstName}} {{user.lastName}}: {{user.membershipRole}}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                            {{user.email}}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-btn icon v-bind:href = "'http://localhost:8081/users/' + user.id + '/view'">
                        <v-icon>account_circle</v-icon>
                    </v-btn>
                    <div v-if = "user.status === 'Active'">
                        <v-btn icon @click="banUser(user.id)">
                            <v-icon>gavel</v-icon>
                        </v-btn>  
                    </div>
                    <div v-if = "user.status === 'Banned'">
                        <v-btn icon @click="unbanUser(user.id)">
                            <v-icon>lock_open</v-icon>
                        </v-btn> 
                    </div>
                </v-list-tile>
            </v-list>
        
    </v-card>
</template>
<script>
import router from '../router';
import ApiDriver from '../ApiDriver';
import HttpResponse from '../utils/HttpResponse';
import CurrentUserValidation from  '../utils/CurrentUserValidation';
export default {
    name: 'AdminUserManagement',
    data(){
        return{
            data: {
               pageNumber: 0,
               pageSize: 50 
            },
            users: [],
            viewUserId: '',
            hover: false,
           
        
            
        }
    },
    methods:{
        getUsers(){
            ApiDriver.User.allUsers(this.data).then((response) => {
                console.log(response)
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data)
                }, (status, errors) => {})
            }).catch((error) => {
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the list of users<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
                console.log(error)
            });
        },
        populateData(data){
            for (var index in data.content) {
                let user = data.content[index];
                if (!user.membershipRole) {
                    user.membershipRole = 'Pending Approval';
                }
                this.users.push(user);
            }

           
        },
        banUser(userId){
            ApiDriver.User.ban(userId).then((response) => {
                console.log(response)
                
            })
        },
        unbanUser(userId){
            ApiDriver.User.unban(userId).then((response) => {
                console.log(response)
            })
        }
    },
    mounted: function(){
        this.getUsers()
    }
}

</script>
<style scoped>

</style>
