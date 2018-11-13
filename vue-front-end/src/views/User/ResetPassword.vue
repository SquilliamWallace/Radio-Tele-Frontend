<template>
<div>
    <v-flex>
        <v-container>
            <v-layout row wrap class="white--text mb-3">
                <v-flex width = "10px" xs12>
                    <v-card-text class = "headline">Reset Password</v-card-text>
                </v-flex>
            </v-layout>
        </v-container>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field
                        v-model="data.password.value"
                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                        :rules="[rules.required]"
                        :error=data.password.hasError
                        :error-messages=data.password.errorMessage
                        label="Enter New Password"
                        color="bule darken-2"
                        hint="At least 8 characters. 3 of 4 of the following: Uppercase, Lowercase, Digit, Special Character"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        required
                        v-on:keyup.enter="submit"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                        v-model="data.passwordConfirm.value"
                        :append-icon="show2 ? 'visibility_off' : 'visibility'"
                        :rules="[rules.required, rules.passMatch]"
                        :error=data.passwordConfirm.hasError
                        :error-messages=data.passwordConfirm.errorMessage
                        label="Confirm Password"
                        color="bule darken-2"
                        :type="show2 ? 'text' : 'password'"
                        @click:append="show2 = !show2"
                        :validate-on-blur=true
                        required
                        v-on:keyup.enter="submit"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-btn color="primary" @click="submit">Reset Password</v-btn>
        </v-card-text>
    </v-flex>
</div>
</template>
<script>
import ApiDriver from '../../ApiDriver';
import router from '../../router'
import CustomErrorHandler from '../../utils/CustomErrorHandler'
import HttpResponse from '../../utils/HttpResponse'
export default {
    name: 'ResetPassword',
    data() {
        return {
            data: {
                password: {
                    value: "",
                    hasError: false
                },
                passwordConfirm: {
                    value: "",
                    hasError: false
                }
            },
            rules: {
                required: val => val.length > 0 || 'Required field',
                passMatch: val => val === this.data.password.value || 'Passwords do not match'
            },
            show1: false,
            show2: false
        }
    },
    methods: {
        submit() {
            // Retrieve the token parameter
            let token = this.$route.query.token;

            // Obtain the stringified data
            let data = JSON.stringify({
                password: this.data.password.value,
                passwordConfirm: this.data.passwordConfirm.value,
            });

            // Make the API call
            ApiDriver.resetPassword(data, token).then(response => {
                // Clear out any errors
                this.clearErrors();

                // Handle the server response
                HttpResponse.then(response, data => {
                    // Success alert
                    this.$swal({
                        title: '<span style="color:#f0ead6">Password Reset!<span>',
                        html: '<span style="color:#f0ead6">Your password has successfully been reset<span>',
                        type: 'success',
                        background: '#302f2f'
                    }).then(response => {
                        // Redirect to login page
                        router.push('/')
                    });
                }, (status, errors) => {
                    // Handle errors
                    this.handleErrors(errors);
                });
            })
        },
        validateToken() {
            // Retrieve the token
            let token = this.$route.query.token;

            // If the token was not found, the email was either
            // not sent correctly, or the user is manuall accessing the page
            if (!token) {
                this.$swal({
                    title: '<span style="color:#f0ead6">Error!<span>',
                    html: '<span style="color:#f0ead6">Reset Password Token Not Found<span>',
                    type: 'error',
                    background: '#302f2f'
                }).then(response => {
                    // Return to login page since user's should
                    // not be logged in at this point. If they
                    // are, we are treating them as if they are not
                    router.push('/');
                });
            }
        },
        handleErrors(errors) {
            // Populate the field error messages
            for (var field in errors) {
                let message = errors[field][0];

                if (field === "PASSWORD") {
                    CustomErrorHandler.populateError(this.data.password, message);
                } else if (field === "PASSWORD_CONFIRM") {
                    CustomErrorHandler.populateError(this.data.passwordConfirm, message);
                } else {
                    this.$swal({
                        title: '<span style="color:#f0ead6">Error!<span>',
                        html: '<span style="color:#f0ead6">' + message + '<span>',
                        type: 'error',
                        background: '#302f2f'
                    }).then(response => {
                        router.push('/');
                    });
                }
            }
        },
        clearErrors() {
            CustomErrorHandler.clearError(this.data.password);
            CustomErrorHandler.clearError(this.data.passwordConfirm);
        }
    },
    mounted() {
        // Check for the token when loaded into DOM
        this.validateToken();
    }
}
</script>