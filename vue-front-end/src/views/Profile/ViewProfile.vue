<template>
    <v-app>
    <div>
        <navigation-bar></navigation-bar>
        <loading v-show="$store.state.isLoading"></loading>
        <v-container v-show="!$store.state.isLoading" id = "profile" width = "700px" >
            <v-layout row wrap>
                <v-flex xs4>
                <v-card class = "elevation-0" color = "transparent">
                    <v-avatar size = "200">
                            <img src="https://icdn3.digitaltrends.com/image/50395182-infinite-space-background-with-silhouette-of-telescope.jpg?ver=1" alt="Patrick">
                        </v-avatar>
                        <div class = "headline">{{ profile.firstName.value }} {{ profile.lastName.value }}</div>
                </v-card>
                </v-flex>
                <v-flex xs8>
                    <v-card class = "elevation-0" color = "transparent">
                        <v-divider></v-divider>
                        <div class = "headline text-xs-left">Email <v-icon>email</v-icon></div>
                        <div id = "profileInfo" class = "text-xs-left">{{ profile.email.value }}</div>
                        <v-divider></v-divider>
                        <div v-show="profile.phone.value" class = "headline text-xs-left">Phone <v-icon>phone</v-icon></div>
                        <div v-show="profile.phone.value" gid = "profileInfo" class = "text-xs-left">{{ profile.phone.value }}</div>
                        <v-divider></v-divider>
                        <div v-show="profile.company.value" class = "headline text-xs-left">Company  <v-icon>business</v-icon></div>
                        <div v-show="profile.company.value" id = "profileInfo" class = "text-xs-left">{{ profile.company.value }}</div>
                        <v-divider></v-divider>
                        <div class = "headline text-xs-left">Membership <v-icon>person</v-icon></div>
                        <div id = "profileInfo" class = "text-xs-left">{{ profile.type.value }}</div>
                        <v-divider></v-divider>

                        <!-- 
                            linked component: RequestRole.vue
                            
                            v-model="updateRole" {
                                this.updateRole: boolean
                                displays modal only if updateRole is set to true
                            }

                            v-on:close-modal="roleChange = false" {
                                sets this.roleChange to false, to make the modal not display
                            }

                            @chosen="changeRoleRequest"
                                Recieve User's requested role from the RequestRole component, 
                                and pass it to changeRoleRequest method
                        -->
                        
                            <request-role v-model="updateRole" v-on:close-modal="updateRole = false" @false="cancelRoleRequest" @chosen="changeRoleRequest"></request-role>
                            <v-container>
                                <v-layout justify-center row>
                                <v-flex xs12 sm6 >
                                    <v-select
                                    v-model="controlValue"
                                    :items="controls"
                                    label="Navigation"
                                    ></v-select>
                                </v-flex>
                                <v-btn color="primary darken-1" @click="controlParser(controlValue)">Go</v-btn>
                                </v-layout>
                            </v-container>
                            
                             
                            
                
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <br><br><br>
                    <div>
                        <!-- 
                            Edit Profile
                        -->
                        <v-dialog v-model="dialog" v-if="showChangeEmailButton" max-width="600px" dark>

                        <!--
                            Change Email Modal
                        -->
                            <v-card>
                                <v-card-title class="justify-center">
                                    <span class="headline">Change Your Email</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-flex xs12>
                                            <v-text-field
                                            name="newEmail"
                                            v-model="changeEmailForm.email.value"
                                            :error=changeEmailForm.email.hasError
                                            :rules="[rules.required]"
                                            :error-messages=changeEmailForm.email.errorMessage
                                            :validate-on-blur=true
                                            label="Enter New Email Address"
                                            v-on:keyup.enter="changeEmailRequest"
                                            required
                                            ></v-text-field>
                                        </v-flex>
                                        <br>
                                        <v-flex xs12>
                                            <v-text-field
                                            name="newEmailConfirm"
                                            v-model="changeEmailForm.emailConfirm.value"
                                            :error=changeEmailForm.emailConfirm.hasError
                                            :rules="[rules.required, rules.emailMatch]"
                                            :error-messages=changeEmailForm.emailConfirm.errorMessage
                                            :validate-on-blur=true
                                            label="Confirm New Email Address"
                                            v-on:keyup.enter="changeEmailRequest"
                                            required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <br><br>
                                        <v-btn color="primary darken-1" @click="changeEmailRequest">Submit</v-btn>
                                        <v-btn color="red darken-1" @click="clearDialog">Cancel</v-btn>
                                    </v-container>
                                </v-card-text>
                            </v-card>
                        </v-dialog>

                        <!-- 
                            Edit Password Modal
                        -->
                        <!-- <v-btn v-if="$store.state.currentUserId == profile.id.value" color="primary darken-1" @click.native="passReset = true">Edit Password</v-btn> -->
                         <v-dialog v-model="passReset" persistent max-width="600px" dark>
                            <v-card>
                                <v-container>
                                    <v-flex xs12>
                                        <v-card-text class = "headline">
                                            Change Password
                                        </v-card-text>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field 
                                        :error=changePasswordForm.currentPassword.hasError
                                        :rules="[passResetRules.required]"
                                        :error-messages=changePasswordForm.currentPassword.errorMessage
                                        :validate-on-blur=true
                                        v-model="changePasswordForm.currentPassword.value" label="Old Password" type="password" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field 
                                        :error=changePasswordForm.password.hasError
                                        :rules="[passResetRules.required, passResetRules.passMatch]"
                                        :error-messages=changePasswordForm.password.errorMessage
                                        :validate-on-blur=true
                                        v-model="changePasswordForm.password.value" label="New Password" type="password" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                        :error=changePasswordForm.passwordConfirm.hasError
                                        :rules="[passResetRules.required, passResetRules.passMatch]" 
                                        :error-messages=changePasswordForm.passwordConfirm.errorMessage
                                        :validate-on-blur=true
                                        v-model="changePasswordForm.passwordConfirm.value" label="Verify Password" type="password" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-card-text></v-card-text>
                                    </v-flex>

                                    <v-btn @click.native="changePasswordRequest" color="green" >Submit</v-btn>
                                    <v-btn @click.native="clearPassReset" color = "red">Cancel</v-btn>
                                    
                                </v-container>
                            </v-card>
                        </v-dialog>

                        <!-- <v-btn color="primary darken-1" @click="completedAppointmentsRedirect">View Completed Observations</v-btn> -->
                        <!-- <v-btn color="primary darken-1" @click="futureAppointmentsRedirect">View Future Observations</v-btn> -->
                        
                        <!-- Option Selector -->
                        

                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    </v-app>
</template>

<script>
import NavigationBar from '../../components/utility/NavigationBar.vue'
import ApiDriver from '../../ApiDriver'
import router from '../../router'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from '../../utils/CurrentUserValidation'
import Loading from "../../components/utility/Loading"
import CustomErrorHandler from '../../utils/CustomErrorHandler';
import RequestRole from '../../components/user/RequestRole.vue';
export default {
    title: "Radio Telescope 1.1.0",
    name: "ViewProfile",
    data() {
        return {
            profile: {
                id: { value: null },
                firstName: { value: "" },
                lastName: { value: "" },
                email: { value: "" },
                phone: { value: "" },
                company: { value: "" },
                type: { value: "" }
            },
            changeEmailForm: {
                email: { value: "" },
                emailConfirm: { value: "" }
            },
            changePasswordForm: {
                currentPassword: {value: ""},
                password: {value: ""},
                passwordConfirm: {value: ""},
                id: {value: ""}
            },
            controlValue: 'Edit Profile',
            controls: [
                'Edit Profile',
                'View Completed Observations', 
                'View Future Observations'
            ],
            rules: {
                required: val => val.length > 0 || 'This field is required',
                emailMatch: val => val === this.changeEmailForm.email.value || 'Emails do not match'
            },
            dialog: false,
            showChangeEmailButton: false,

            passReset: false,
            passResetRules: {
                required: val => val.length > 0 || 'This field is required',
                passMatch: val => val === this.changePasswordForm.password.value || 'Passwords do not match'
            },
            updateRole: false
        }
    },
    components: {
      NavigationBar,
      Loading,
      RequestRole
    },
    methods: {
        controlParser(value){
            console.log(value)
            if(value === 'Edit Profile'){
                this.editRedirect()
            }else if(value === 'Change Password'){
                this.passReset = true
            }else if(value === 'Change Email'){
                this.dialog = true
            }else if(value === 'Request New Role'){
                this.updateRole = true
            }else if(value === 'View Completed Observations'){
                this.completedAppointmentsRedirect()
            }else if(value === 'View Future Observations'){
                this.futureAppointmentsRedirect()
            }
        },
        editRedirect() {
            router.push('/users/' + this.$route.params.userId + '/edit')
        },
        futureAppointmentsRedirect() {
            router.push('/users/' + this.profile.id.value + '/appointments/future')
        },
        completedAppointmentsRedirect() {
            router.push('/users/' + this.profile.id.value + '/appointments/completed')
        },
        retrieveInformation() {
            let that = this;
            if (!this.$route.params.userId) {
                router.push('/')
            } else {    
                // Set the store's loading boolean to true
                this.$store.commit("loading", true);

                // Make the API call
                ApiDriver.User.get(this.$route.params.userId).then((response) => {
                    // Handle the server response
                    HttpResponse.then(response, (data) => {
                        // Populate the data and set the store's boolean back to false
                        that.populateData(data.data)
                        this.$store.commit("loading", false)
                    }, (status, errors) => {
                        // Access Denied
                        if (parseInt(status) === 403) {
                            // Call the generic access denied handler
                            HttpResponse.accessDenied(that)
                        } 
                        // Not Found
                        else if (parseInt(status) === 404) {
                            // Call the generic invalid resource id handler
                            HttpResponse.notFound(that, errors)
                        }
                    })
                }).catch((errors) => {
                    // Handle an erroneous API call
                    let message = "An error occurred when loading this user\'s information"
                    HttpResponse.generalError(this, message, true)
                })
            }
        },
        populateData(data) {
            // Populate the profile information
            this.profile.id.value = data.id;
            this.profile.firstName.value = data.firstName;
            this.profile.lastName.value = data.lastName;
            this.profile.email.value = data.email;
            this.profile.phone.value = data.phoneNumber;
            this.profile.company.value = data.company;
            if (data.membershipRole) {
                this.profile.type.value = data.membershipRole;
            } else {
                this.profile.type.value = "Pending Approval";
            }   
            this.showChangeEmailButton = (data.id === this.$store.state.currentUserId)
        },
        cancelRoleRequest(boolean) {
            if(!boolean) {
                changeRole = false;
            }
        },
        changeEmailRequest() {
            // Clear any errors
            this.clearErrors();

            // Populate the data
            let data = JSON.stringify({
                email: this.changeEmailForm.email.value,
                emailConfirm: this.changeEmailForm.emailConfirm.value
            });
            // Call the api method
            ApiDriver.User.changeEmail(this.profile.id.value, data).then(response => {
                // Handle the response
                HttpResponse.then(response, data => {
                    // Success alert
                    this.$swal({
                        title: '<span style="color:#f0ead6">Success!<span>',
                        html: '<span style="color:#f0ead6">You should receive an email shortly at ' + 
                        this.changeEmailForm.email.value + ' containing a link to accept your email change<span>',
                        type: 'success',
                        background: '#302f2f'
                    }).then(response => {
                        // Clear out the modal's information
                        this.clearDialog();
                    });
                }, (status, errors) => {
                    // Access Denied
                    if (parseInt(status) === 403) {
                        // Call the generic access denied handler
                        HttpResponse.accessDenied(this)
                    } 
                    // Not Found
                    else if (parseInt(status) === 404) {
                        // Call the generic invalid resource id handler
                        HttpResponse.notFound(that, errors)
                    } 
                    // Bad request
                    else {
                        // Handle errors
                        this.handleErrors(errors)
                    }
                })
            }).catch(errors => {
                // Handle an erroneous API call
                let message = "An error occurred changing this user's email address"
                HttpResponse.generalError(this, message, false)
            });
        },
        clearPassReset() { //resets form values to nothing
            this.passReset = false
            this.clearErrors()
            this.changePasswordForm.currentPassword.value = ''
            this.changePasswordForm.password.value = ''
            this.changePasswordForm.passwordConfirm.value = ''
        },
        changePasswordRequest() {


            this.changePasswordForm.id.value = this.profile.id.value
            let form = JSON.stringify({
                currentPassword: this.changePasswordForm.currentPassword.value,
                password: this.changePasswordForm.password.value,
                passwordConfirm: this.changePasswordForm.passwordConfirm.value,
                id: this.changePasswordForm.id.value
            });
            

            ApiDriver.User.changePassword(this.profile.id.value, form).then(response => {
                // Handle the response
                HttpResponse.then(response, data => {
                    // Success alert
                    this.$swal({
                        title: '<span style="color:#f0ead6">Success!<span>',
                        html: '<span style="color:#f0ead6">Your password has been changed',
                        type: 'success',
                        background: '#302f2f'
                    }).then(response => {
                        // Clear out the modal's information
                        this.clearPassReset();
                    });
                }, (status, errors) => {
                    // Access Denied
                    if (parseInt(status) === 403) {
                        // Call the generic access denied handler
                        HttpResponse.accessDenied(this)
                    } 
                    // Not Found
                    else if (parseInt(status) === 404) {
                        // Call the generic invalid resource id handler
                        HttpResponse.notFound(that, errors)
                    } 
                    // Bad request
                    else {
                        // Handle errors
                        this.passResetErrorHandler(errors)
                    }
                })
            }).catch(errors => {
                // Handle an erroneous API call
                let message = "An error occurred changing this user's password"
                HttpResponse.generalError(this, message, false)
            });

            
            
        },
        /*
            This function is called when submit is called on RequestRole component
            newRole is passed to the back-end and a request is placed on the
            Admin User Approval page
        */
        changeRoleRequest: function(newRole) {
             // Populate the data
            let data = JSON.stringify({
                role: newRole.toUpperCase()
            });
            // Call the api method
            ApiDriver.User.changeRoleRequest(this.profile.id.value, newRole.toUpperCase()).then(response => {
                // Handle the response
                HttpResponse.then(response, data => {
                // Success alert
                    this.$swal({
                        title: '<span style="color:#f0ead6">Request Sent<span>',
                        html: '<span style="color:#f0ead6">It will be reviewed by an Administrator<span>',
                        type: 'success',
                        background: '#302f2f'
                    }).then(response => {
                        // Clear out the modal's information
                        this.clearDialog();
                    });
                }, (status, errors) => {
                    // Access Denied
                    if (parseInt(status) === 403) {
                        // Call the generic access denied handler
                        HttpResponse.accessDenied(this)
                    } 
                    // Not Found
                    else if (parseInt(status) === 404) {
                        // Call the generic invalid resource id handler
                        HttpResponse.notFound(that, errors)
                    } 
                    // Bad request
                    else {
                        // Handle errors
                        this.handleErrors(errors)
                    }
                })
            }).catch(errors => {
                // Handle an erroneous API call
                let message = "An error occurred requesting a role change"
                HttpResponse.generalError(this, message, false)
            });
        },
        clearDialog() {
            // Clear out the modal
            this.clearErrors();
            this.dialog = false;
            this.changeEmailForm.email.value = "";
            this.changeEmailForm.emailConfirm.value = "";
        },
        passResetErrorHandler(errors){
            // populate error messages for form
            for(var field in errors){
                let message = errors[field][0];

                if(field === "CURRENT_PASSWORD"){
                    CustomErrorHandler.populateError(this.changePasswordForm.currentPassword, message);
                }else if(field === "PASSWORD"){
                    CustomErrorHandler.populateError(this.changePasswordForm.password, message);
                }else if(field === "PASSWORD_CONFIRM"){
                    CustomErrorHandler.populateError(this.changePasswordForm.passwordConfirm, message);
                }else{
                    HttpResponse.generalError(this, message, false);
                }
            }
            this.$forceUpdate();
        },
        handleErrors(errors) {
            // Populate error messages for the form
            for (var field in errors) {
                let message = errors[field][0];

                if (field === "EMAIL") {
                    CustomErrorHandler.populateError(this.changeEmailForm.email, message);
                } else if (field === "EMAIL_CONFIRM") {
                    CustomErrorHandler.populateError(this.changeEmailForm.emailConfirm, message);
                } else {
                    HttpResponse.generalError(this, message, false);
                }
            }
            // Force update to display errors
            this.$forceUpdate();
        },
        clearErrors() {
            CustomErrorHandler.clearError(this.changeEmailForm.email);
            CustomErrorHandler.clearError(this.changeEmailForm.emailConfirm);
            CustomErrorHandler.clearError(this.changePasswordForm.currentPassword)
            CustomErrorHandler.clearError(this.changePasswordForm.password)
            CustomErrorHandler.clearError(this.changePasswordForm.passwordConfirm)
        },
        // This method is called from the button, and toggles the modal
        toggleUpdateRole() {
            this.updateRole = !this.updateRole;
        },
    },
    mounted() {
        // Retrieve the user information when loaded onto the DOM
        this.retrieveInformation()
        if (!this.$store.state.isAdmin) {
            this.$store.commit("updateInfo", {page: "View Profile", info: "This page shows the information for the user\n that is currently logged in."})
        } else {
            this.$store.commit("updateInfo", {page: "View Profile", info: "This page shows the information for the selected user.\n From here you can view the user's information to check\n for inappropriate or falsified content, as well as view\n their completed and future appointments."})
        }

        if (this.$store.state.currentUserId == this.$route.params.userId) {
            console.log("end me")
            this.controls.push("Change Email")
            this.controls.push("Change Password")
            this.controls.push("Request New Role")
        }
    }
}
</script>

<style scoped>
    #profile {
        border: 0px solid white;
        margin-top: 100px;
    }
    #profileInfo {
        font-size: 20px;
    }
</style>

