<template>
<div>
    <v-flex v-show="accountActivated">
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card class="white--text mb-3">
                        <v-card-title primary-title class="justify-center">
                            <span class="headline">Account Activated</span>
                        </v-card-title>
                        <v-card-text>
                            <div>Your account has been successfully activated! 
                                <a href="/">Click here to login</a>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-flex>
</div>
</template>
<script>
import ApiDriver from '../ApiDriver';
import router from '../router'
import HttpResponse from '../utils/HttpResponse'
export default {
    name: "ActivateAccount",
    data() {
        return {
            accountActivated: false
        }
    },
    methods: {
        activateAccount() {
            // Grab the token from the route parameter
            let token = this.$route.query.token
            // If the token was not found, the token was not
            // sent properly
            if (!token) {
                this.$swal({
                    title: '<span style="color:#f0ead6">Error!<span>',
                    html: '<span style="color:#f0ead6">Activation Token Not Found<span>',
                    type: 'error',
                    background: '#302f2f'
                }).then(response => {
                    // Return to login page since user's should
                    // not be logged in at this point. If they
                    // are, we are treating them as if they are not
                    router.push('/');
                });
            }
            // Call the API endpoint to activate the account
            ApiDriver.User.activate(token).then(response => {
                HttpResponse.then(response, data => {
                    this.callAlert();
                    // Show the success text
                    this.accountActivated = true;
                }, (status, errors) => {
                    let message = "";

                    // There will only ever be one error here
                    for (var index in errors) {
                        message = errors[index][0];
                    }

                    HttpResponse.generalError(this, message, true)
                });
            }).catch(errors => {
                let message = "An error occurred activating this user's account";
                HttpResponse.generalError(this, message, true)
            });
        },
        callAlert() {
            this.$swal({
                title: '<span style="color:#f0ead6">Account Activated!<span>',
                html: '<span style="color:#f0ead6">Your account has been activated<span>',
                type: 'success',
                background: '#302f2f'
            });
        }
    },
    mounted() {
        // Activate the account when it is loaded to the DOM
        this.activateAccount();
    }
}
</script>
<style scoped>

</style>
