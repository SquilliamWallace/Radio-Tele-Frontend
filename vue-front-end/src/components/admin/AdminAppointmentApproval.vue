<template>
<div>
    <loading v-if="$store.state.isLoading"></loading>
    <div v-if="!$store.state.isLoading">
        <v-card v-if="appointments.length <= 0" flat>
            <v-card-title primary-title class="justify-center">No Appointments Require Approval</v-card-title>
            <v-card-text>
                <div>You will be notified if any users tried to create an appointment beyond their time constraints</div>
            </v-card-text>
        </v-card>
        <v-card v-if="appointments.length > 0" width = "100s%" align-center>
                <v-list >
                    <v-list-tile @click="''" v-for="appointment in appointments" :key = "appointment.id" >
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{appointment.userFirstName}} {{appointment.userLastName}}
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{appointment.startTime}} - {{appointment.endTime}}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-btn 
                            @click="confirm = !confirm, id = appointment.id, startTime = appointment.startTime, 
                            endTime = appointment.endTime, telescopeId = appointment.telescopeId, idPublic = appointment.isPublic,
                            userId = appointment.userId, userFirstName = appointment.userFirstName, userLastName = appointment.userLastName,
                            rightAscension = appointment.rightAscension, declination = appointment.declination, telescopeName = telescopes[appointment.telescopeId - 1]
                            approved = false">
                            Deny
                        </v-btn>
                        <v-btn 
                            @click="confirm = !confirm, id = appointment.id, startTime = appointment.startTime, 
                            endTime = appointment.endTime, telescopeId = appointment.telescopeId, idPublic = appointment.isPublic,
                            userId = appointment.userId, userFirstName = appointment.userFirstName, userLastName = appointment.userLastName,
                            rightAscension = appointment.rightAscension, declination = appointment.declination, telescopeName = telescopes[appointment.telescopeId - 1]
                            approved = true">
                            Approve
                        </v-btn>
                    </v-list-tile>
                </v-list>
        </v-card>
         <div class="text-xs-center">
            <v-pagination
            circle
            v-model="pageDisplay"
            :length="numPages"
            @input="next"></v-pagination>
        </div>
        <v-layout justify-center>
            <v-flex xs12 sm1>
                <v-select
                v-model="selectedPageSize"
                :items="pageSizeList"
                label="Items per page"
                v-on:change="this.pageSizeUpdate"
                ></v-select>
            </v-flex>
        </v-layout>
        <!-- this dialog is called when the approve button is pressed -->
         <v-dialog dark v-model="confirm" persistent max-width="700px">
            <v-card>
                <v-container>
                    <v-flex xs12>
                        <v-card-text class="headline">
                            <span v-if="approved">
                            Are you sure you want to approve this Appointment?
                            </span>
                            <span v-if="!approved">
                            Are you sure you want to deny this Appointment?
                            </span>
                        </v-card-text>
                        <v-container align-content-start class = "align-content-start">

                            <v-list >
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            {{userLastName}}, {{userFirstName}} - Id: {{userId}}
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title class="">
                                            {{telescopeName}}
                                            {{startTime}} - {{endTime}}
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-divider vertical></v-divider>

                                    <!--<v-list-tile-content v-if="userPhone !== null" class = "pl-3">
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
                                    -->

                                </v-list-tile>
                            </v-list>
                        </v-container>
                    </v-flex>
                    
                    <v-btn @click.native="confirm = false" color = "red">Cancel</v-btn>
                    <v-btn @click.native="confirm = false, submit()" color = "green">
                        <span v-if="approved">
                            Approve
                            </span>
                            <span v-if="!approved">
                            Deny
                            </span>
                    </v-btn>
                    
                    
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
import moment from 'moment'
export default {
    name:'AdminAppointmentApproval',
    data(){
        return{
            data: {
            
            },
            //pagination
            pageDisplay: 1,
            numPages: 0,
            pageNumber: 0,
            selectedPageSize: "10",
            pageSizeList: [
                '10', '25', '50', '100'
            ],

            form: {
                roleId: {
                    value: ""
                },
                assignedRole: {
                    value: ""
                }
            },
            appointments: [],
            confirm: false,
            approved: false,

            telescopes: [
                "John Rudy Park", 
                "Scale Model",
                "Virtual"
            ],
            telescopeName: '',

            // Appointment info
            id: '',
            startTime: '',
            endTime: '',
            telescopeId: '',
            isPublic: '',
            userId: '',
            userFirstName: '',
            userLastName: '',
            status: '',
            rightAscension: '',
            declination: '',
            

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
                isApprove: this.approved
            });
            var isApprove = this.approved
            var aptId = this.id
            ApiDriver.Appointment.approveRequest(aptId, isApprove).then((response) => {

            }).catch(errors => {
            })
            for (var index in this.appointments) {
                var appointment = this.appointments[index];
                if (appointment.id === this.id) {
                    this.appointments.splice(index, 1)
                }
            }
            
        },
        getUnapprovedAppointments(){
            ApiDriver.Appointment.unapprovedRequest(this.pageNumber, this.selectedPageSize).then((response) => {
                HttpResponse.then(response, (data) => {
                    this.populateData(data.data)
                },(status, errors) => {})
                
            })
        },
        populateData(data){
            for(var index in data.content){
                let appointment = data.content[index];
                appointment.startTime = moment(appointment.startTime).format('MM-DD-YYYY hh:mm A');
                appointment.endTime = moment(appointment.endTime).format('MM-DD-YYYY hh:mm A');
                this.appointments.push(appointment);
            }
            this.numPages = data.totalPages;
        },
        next(page) {
            // Handle retrieving a new page of information
            this.pageNumber = page - 1;
            this.pageDisplay = page;
            this.appointments = [];
            this.getUnapprovedAppointments();
        },
        pageSizeUpdate(){
            this.appointments = []
            this.getUnapprovedAppointments()
        },
    },
    mounted: function(){
        this.getUnapprovedAppointments();
    },
    components: {
        Loading
    }
}
</script>
<style scoped>
    
</style>
