<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <div v-if="!$store.state.isLoading">
        <v-card v-if="users.length <= 0" flat>
            <v-card-title primary-title class="justify-center">No Users Require Approval</v-card-title>
            <v-card-text>
                <div>You will be notified if any users register and require role approval</div>
            </v-card-text>
        </v-card>
        <!-- 
        Start of User Approval
        -->
        <v-card v-if="users.length > 0" width = "100s%" align-center>
                <v-list >
                    <v-list-tile @click="''" v-for="user in users" :key = "user.id" >
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{user.userInfo.firstName}} {{user.userInfo.lastName}}
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{user.userInfo.email}} <span v-if = "user.userInfo.phoneNumber">- ({{user.userInfo.phoneNumber.slice(0,3)}})-{{user.userInfo.phoneNumber.slice(3,6)}}-{{user.userInfo.phoneNumber.slice(-4)}}</span>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-btn 
                            @click="confirm = !confirm, userCompany = user.userInfo.company, userEmail = user.userInfo.email, userFirst = user.userInfo.
                                            firstName, userLast = user.userInfo.lastName, userId = user.userInfo.id, userPhone = user.userInfo.phoneNumber, 
                                            userStatus = user.userInfo.status, userRequestedRole =user.role.charAt(0) + user.role.slice(1).toLowerCase(),
                                            form.roleId.value = user.id">
                            Choose Role
                        </v-btn>
                    </v-list-tile>
                </v-list>
        </v-card>
        <!-- 
        Add pagination below the entries 
        -->
        <div>
            <v-pagination v-if="numPages!=0"
                circle
                v-model="pageDisplay"
                @input = "next"
                :length="numPages"
                :total-visible="15"
            ></v-pagination>
        </div>
        <!-- this dialog is called when the approve button is pressed -->
         <v-dialog dark v-model = "confirm" persistent max-width="700px">
            <v-card>
                <v-container>
                    <v-flex xs12>
                        <v-card-text class = "headline">
                            Are you sure you want to approve this user?
                        </v-card-text>
                        <v-container align-content-start class = "align-content-start">

                            <v-list >
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            {{userLast}}, {{userFirst}} - Id: {{userId}}
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title class = "">
                                            {{userEmail}}
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-divider vertical></v-divider>

                                    <v-list-tile-content v-if="userPhone !== null" class = "pl-3">
                                            <v-list-tile-title>
                                                Phone:
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title class = "">
                                                ({{userPhone.slice(0,3)}})-{{userPhone.slice(3,6)}}-{{userPhone.slice(-4)}}
                                            </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <span v-if="userPhone != null"><v-divider vertical></v-divider></span>
                                   

                                    <v-list-tile-content class = "pl-3">
                                            <v-list-tile-title>
                                                Company:
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title class = "">
                                                {{userCompany}}
                                            </v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-divider vertical></v-divider>
                                        
                                    <v-list-tile-content class = "pl-3">
                                            <v-list-tile-title>
                                                Requested Role:
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title class = "">
                                                {{userRequestedRole}}
                                            </v-list-tile-sub-title>
                                    </v-list-tile-content>

                                </v-list-tile>
                            </v-list>
                        </v-container>
                        <v-card-text>
                            Select the role you wish to assign to this user.
                        </v-card-text>
                        <v-select
                            item-value= this.userRequestedRole
                            :items="accountTypes"
                            required
                            v-model="form.assignedRole.value"
                            ></v-select>
                    </v-flex>
                    
                    <v-btn @click.native="confirm = false" color = "red">Cancel</v-btn>
                    <v-btn @click.native="confirm = false, submit()" color = "green">Approve</v-btn>
                    
                    
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</div>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading"
export default {
    name:'AdminUserApproval',
    data(){
        return{
            data: {
                page: 1
            },
            form: {
                roleId: {
                    value: ""
                },
                assignedRole: {
                    value: ""
                }
            },
            users: [],
            confirm: false,
            
            pageNumber: 0,
            // Set this to 15?
            pageSize: 15,
            pageDisplay: 1,
            numPages: 0,

            // user info
            
            userId: '',
            userFirst: '',
            userLast: '',
            userCompany: '',
            userRequestedRole: '',
            userEmail: '',
            userPhone: '',
            userStatus: '',

            headers: [
                {header: 'Id'},
                {header: 'Company'},
                {header: 'Role'}
            ],
             accountTypes: ['Guest', 'Member', 'Student', 'Researcher'],
        }
    },
    methods:{
        submit(){
            let form = JSON.stringify({
               id: this.form.roleId.value,
               role: this.form.assignedRole.value.toUpperCase()
            });
            ApiDriver.User.approve(form).then((response) => {
            }).catch(errors => {
            })
            for (var index in this.users) {
                var user = this.users[index];
                if (user.id === this.form.roleId.value) {
                    this.users.splice(index, 1)
                }
            }
            
        },
        getUnapprovedUsers(){
            ApiDriver.User.unapproved(this.pageNumber, this.pageSize).then((response) => {
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data)
                },(status, errors) => {})
                
            })
        },
        populateData(data){
            for(var index in data.content){
                let user = data.content[index];
                this.users.push(user);
            }
            this.numPages = data.totalPages;
        },
        next(page){
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.users = [];
            this.getUnapprovedUsers();
        }
    },
    mounted: function(){
        this.getUnapprovedUsers();
    },
    components: {
        Loading
    }
}
</script>
<style scoped>
    
</style>
