<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <v-card v-if="!$store.state.isLoading" width = "100%">
        <v-layout row wrap>
            <v-text-field  v-on:keyup.enter="search(searchParam)" v-on:keyup.down="reset" clearable v-model = "searchParam" class="ml-2 mr-2" label="Search..." append-icon="search" dark></v-text-field>
            <v-select
            :items="filterTypes"
            label="Filter by"
            v-model="filterType"
            ></v-select>
            <v-btn @click="reset" class="mt-3 mr-4">Clear</v-btn>
        </v-layout>
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
                <div v-else-if="user.status == 'Banned'">
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
                    <v-textarea
                        v-if= "action == ban"
                        background-color = "white"
                        outline
                        label="Reason for ban"
                        counter
                        maxlength="120"
                        full-width
                        single-line
                        v-model="banMessage"
                    ></v-textarea>
                    
                    <v-btn @click.native="confirm = false" color = "red">Cancel</v-btn>
                    <span v-if = "action === 'ban'">
                        <v-btn @click="banUser(chosenUserId, banMessage), confirm = false" color = "green" >Submit</v-btn>
                    </span>
                    <span v-if = "action === 'unban'">
                        <v-btn @click="unbanUser(chosenUserId), confirm = false" color = "green" >Submit</v-btn>
                    </span>
                    
                </v-container>
            </v-card>
        </v-dialog>
    </v-card>
    </div>
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
            filtered: [],
            unfiltered: [],
            viewUserId: '',
            hover: false,
            confirm: false,
            chosenUserId: '',
            chosenUserName: '',
            action: '',
            icon:'',
            filterTypes: ['Email','User Id'],
            filterType: 'Email',

            // Ban-related
            banMessage: "",

            //search
            searchParam: ''
        }
    },
    methods:{
        reset(){
            this.users = this.unfiltered
        },
        search(param){
           this.filtered = []
           if(param === ''){
               this.users = this.unfiltered
           }
            //for filter based on email
            else if(this.filterType === "Email"){
                for (var i = 0; i < this.users.length; i++) {
                    if(this.users[i].email.split('@')[0].toLowerCase() === param.split('@')[0].toLowerCase()){
                        this.filtered.push(this.users[i])
                    }
                }
            }
            // for filter based on user id
            else if(this.filterType === "User Id"){
                for (var i = 0; i < this.users.length; i++) {
                    if(this.users[i].id.toString() === param.toString()){
                        this.filtered.push(this.users[i])
                    }
                }
                
            }
            this.users = this.filtered
        },
        getUsers(){
            this.$store.commit("loading", true);
            ApiDriver.User.allUsers(this.data).then((response) => {
                HttpResponse.then(response, data => {
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
            });
        },
        populateData(data){
            for (var index in data.content) {
                let user = data.content[index];
                if (!user.membershipRole) {
                    user.membershipRole = 'Pending Approval';
                }
                this.users.push(user);
                this.unfiltered.push(user)
            }
        },
        banUser(userId, message){
            ApiDriver.User.ban(userId, message).then((response) => {
                location.reload();
            })
        },
        unbanUser(userId){
            ApiDriver.User.unban(userId).then((response) => {
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
