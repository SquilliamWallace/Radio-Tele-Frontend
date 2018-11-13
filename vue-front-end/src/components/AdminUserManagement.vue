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
                    <v-btn icon @click="confirm = !confirm, chosenUserId = user.id, action = 'ban', chosenUserName = user.firstName +' '+ user.lastName">
                        <v-icon>gavel</v-icon>
                    </v-btn>  
                </div>
                <div v-else>
                    <v-btn icon @click="confirm = !confirm, chosenUserId = user.id, action = 'unban', chosenUserName = user.firstName +' '+ user.lastName">
                        <v-icon>lock_open</v-icon>
                    </v-btn> 
                </div>
            </v-list-tile>
        </v-list>
            
            <!-- This dialog is called when the ban or unban button is pressed -->
        <v-dialog v-model = "confirm" persistent max-width="600px">
            <v-card>
                <v-container>
                    <v-flex xs12>
                        <v-card-text class = "headline">
                            Are you sure you want to {{action}}<br /> {{chosenUserName}}?
                        </v-card-text>
                    </v-flex>
                    
                    <v-btn @click.native="confirm = false" color = "red">Cancel</v-btn>
                    <span v-if = "action === 'ban'">
                        <v-btn @click="banUser(chosenUserId), confirm = false" color = "green" >Submit</v-btn>
                    </span>
                    <span v-if = "action === 'unban'">
                        <v-btn @click="unbanUser(chosenUserId), confirm = false" color = "green" >Submit</v-btn>
                    </span>
                    
                </v-container>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
import router from '../router';
import ApiDriver from '../ApiDriver';
import HttpResponse from '../utils/HttpResponse';
import CurrentUserValidation from  '../utils/CurrentUserValidation';
import Loading from "../components/Loading"
export default {
    name: 'AdminUserManagement',
    data(){
        return{
            data: {
               pageNumber: 0,
               pageSize: 50,
            },
            users: [],
            viewUserId: '',
            hover: false,
            confirm: false,
            chosenUserId: '',
            chosenUserName: '',
            action: '',
            icon:''
        }
    },
    methods:{
        getUsers(){
            this.$store.commit("loading", true);
            ApiDriver.User.allUsers(this.data).then((response) => {
                console.log(response)
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data)
                }, (status, errors) => {})
                this.$store.commit("loading", false);
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
                location.reload();
            })
        },
        unbanUser(userId){
            ApiDriver.User.unban(userId).then((response) => {
                console.log(response)
                location.reload();
            })
        }
    },
    mounted: function(){
        this.getUsers();
    },
    components: {
        Loading
    }
}

</script>
<style scoped>

</style>
