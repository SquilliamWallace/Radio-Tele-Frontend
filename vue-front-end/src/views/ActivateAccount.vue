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
import { error } from 'util';
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
                });
                // Return to login page
                router.push('/');
            }
            // Call the API endpoint to activate the account
            ApiDriver.User.activate(token).then(response => {
                HttpResponse.then(response, data => {
                    this.callAlert();
                    // Show the success text
                    this.accountActivated = true;
                }, (status, errors) => {
                    console.log(errors)
                })
            })
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
