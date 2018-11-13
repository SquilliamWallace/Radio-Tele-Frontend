<template>
    <div>
        <navigation-bar></navigation-bar>
        <loading v-show="$store.state.isLoading"></loading>
        <v-container v-show="!$store.state.isLoading" id = "profile" width = "700px" >
            <v-layout row wrap>
                <v-flex xs4>
                <v-card class = "elevation-0" color = "transparent">
                    <v-avatar size = "200">
                            <img src="https://i.kym-cdn.com/entries/icons/original/000/009/803/spongebob-squarepants-patrick-spongebob-patrick-star-background-225039.jpg" alt="Patrick">
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
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <br><br><br>
                    <div>
                        <v-btn color="primary darken-1" @click="editRedirect">Edit Profile</v-btn>
                        <v-dialog v-model="dialog" v-if="showChangeEmailButton" max-width="600px" dark>
                            <v-btn slot="activator" color="primary darken-1">Change Email</v-btn>
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
                                            :rules=[rules.required]
                                            :error-messages=changeEmailForm.email.errorMessage
                                            :validate-on-blur=true
                                            label="Enter New Email Address"
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
                        <v-btn color="primary darken-1" @click="completedAppointmentsRedirect">View Completed Observations</v-btn>
                        <v-btn color="primary darken-1" @click="futureAppointmentsRedirect">View Future Observations</v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import NavigationBar from '../../components/NavigationBar.vue'
import ApiDriver from '../../ApiDriver'
import router from '../../router'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from '../../utils/CurrentUserValidation'
import Loading from "../../components/Loading"
import CustomErrorHandler from '../../utils/CustomErrorHandler';
export default {
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
            rules: {
                required: val => val.length > 0 || 'This field is required',
                emailMatch: val => val === this.changeEmailForm.email.value || 'Emails do not match'
            },
            dialog: false,
            showChangeEmailButton: false
        }
    },
    components: {
      NavigationBar,
      Loading
    },
    methods: {
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
                        html: '<span style="color:#f0ead6">You should receive an email shortly' + 
                        ' containing a link to accept your email change<span>',
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
        clearDialog() {
            // Clear out the modal
            this.clearErrors();
            this.dialog = false;
            this.changeEmailForm.email.value = "";
            this.changeEmailForm.emailConfirm.value = "";
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
        }
    },
    mounted() {
        // Retrieve the user information when loaded onto the DOM
        this.retrieveInformation()
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

