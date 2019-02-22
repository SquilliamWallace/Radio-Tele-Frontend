<template>
<div>
    <v-flex v-show="emailChanged">
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card class="white--text mb-3">
                        <v-card-title primary-title class="justify-center">
                            <span class="headline">Email Updated</span>
                        </v-card-title>
                        <v-card-text>
                            <div>Your email has been successfully updated!</div>
                            <br><br>
                            <v-btn class="primary darken-1" @click="handleUpdatedEmail">Log in with your new email</v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-flex>
</div>
</template>
<script>
import ApiDriver from '../../ApiDriver';
import router from '../../router';
import HttpResponse from '../../utils/HttpResponse';
export default {
    title: "Radio Telescope 1.0.0",
    name: "UpdateEmail",
    data() {
        return {
            emailChanged: false
        }
    },
    methods: {
        changeEmail() {
            // Grab the token from the route parameter
            let token = this.$route.query.token
            // If the token was not found, the email was either
            // not sent correctly, or the user is manually accessing the page
            if (!token) {
                this.$swal({
                    title: '<span style="color:#f0ead6">Error!<span>',
                    html: '<span style="color:#f0ead6">Email Token Not Found<span>',
                    type: 'error',
                    background: '#302f2f'
                }).then(response => {
                    // Return to login page since user's should
                    // not be logged in at this point. If they
                    // are, we are treating them as if they are not
                    router.push('/');
                });
            } else {
                // Call the API endpoint to change the email
                ApiDriver.updateEmail(token).then(response => {
                    HttpResponse.then(response, data => {
                        this.callAlert();
                        this.emailChanged = true
                    }, (status, errors) => {
                        let message = "";

                        // There will only ever be one error here
                        for (var index in errors) {
                            message = errors[index][0];
                        }

                        HttpResponse.generalError(this, message, true)
                    });
                }).catch(errors => {
                    // Handle an erroneous API call
                    let message = "An error occurred changing this user's email address";
                    HttpResponse.generalError(this, message, true)
                });
            }
        },
        callAlert() {
            this.$swal({
                title: '<span style="color:#f0ead6">Email Updated!<span>',
                html: '<span style="color:#f0ead6">Your email address was updated. ' + 
                'Please log in with your new credentials<span>',
                type: 'success',
                background: '#302f2f'
            });
        },
        handleUpdatedEmail() {
            ApiDriver.logout();
            this.$store.commit("logout");
            router.push('/')
        }
    },
    mounted() {
        // Update the email when loaded into the DOM
        this.changeEmail()
    }
        
}
</script>