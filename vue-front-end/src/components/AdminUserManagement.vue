<template>
    <v-card  width = "100%">
            <v-list >
                <v-list-tile v-for="user in users" :key = "user.id" >
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
                    <v-btn icon @click="banUser(user.id)">
                        <v-icon>gavel</v-icon>
                    </v-btn>
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
            viewUserId: ''
        
            
        }
    },
    methods:{
        getUsers(){
            ApiDriver.User.allUsers(this.data).then((response) => {
                let that = this;
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data)
                    console.log(that.users)
                }, (status, errors) => {
                    if (parseInt(status) === 403) {
                        alert("Access Denied");
                        CurrentUserValidation.validateCurrentUser(this.$store);
                    }
                })
            }).catch((error) => {
                alert("An error occurred loading in the list of users")
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
<<<<<<< Updated upstream

            console.log(this.users)
=======
        },
        banUser(userId){
            ApiDriver.User.ban(userId).then((response) => {
                console.log(response)
                
            })
>>>>>>> Stashed changes
        }
    },
    mounted: function(){
        this.getUsers()
    }
}

</script>
<style scoped>

</style>
