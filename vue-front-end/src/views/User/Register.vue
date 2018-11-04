<template>
    <v-app>
        <v-snackbar
            v-model="snackbar"
            top
            color="success"
            >
            <span>Registration successful!</span>
            <v-btn
                flat
                @click="registerSuccess()"
                >
                Okay
            </v-btn>
        </v-snackbar>
        <v-container v-bind:style="{ padding:'50px' }">
            <v-card flat>
                <v-form ref="form" @submit.prevent="submit" refs="form">
                <v-container grid-list-xl fluid>
                    <v-layout wrap>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.first.value"
                        :rules="rules.required"
                        :error=form.first.hasError
                        :error-messages=form.first.errorMessage
                        color="blue darken-2"
                        label="First Name"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.last.value"
                        :rules="rules.required"
                        :error=form.last.hasError
                        :error-messages=form.last.errorMessage
                        color="blue darken-2"
                        label="Last Name"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.email.value"
                        :rules="rules.required"
                        :error=form.email.hasError
                        :error-messages=form.email.errorMessage
                        color="blue darken-2"
                        label="Email"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.emailConfirm.value"
                        :rules="[rules.required, rules.emailMatch]"
                        :error=form.emailConfirm.hasError
                        :error-messages=form.emailConfirm.errorMessage
                        color="bule darken-2"
                        label="Confirm Email"
                        validate-on-blur=true
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.password.value"
                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                        :type="show1 ? 'text' : 'password'"
                        :rules="rules.required"
                        :error=form.password.hasError
                        :error-messages=form.password.errorMessage
                        color="blue darken-2"
                        label="Password"
                        hint="At least 8 characters. 3 of 4 of the following: Uppercase, Lowercase, Digit, Special Character"
                        @click:append="show1 = !show1"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.passwordMatch.value"
                        :append-icon="show2 ? 'visibility_off' : 'visibility'"
                        :rules="[rules.required, rules.passMatch]"
                        :error=form.passwordMatch.hasError
                        :error-messages=form.passwordMatch.errorMessage
                        :type="show2 ? 'text' : 'password'"
                        color="blue darken-2"
                        label="Re-Type Password"
                        @click:append="show2 = !show2"
                        validate-on-blur=true
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select
                        v-model="form.accountType.value"
                        :items="accountTypes"
                        :rules="rules.required"
                        :error=form.accountType.hasError
                        :error-messages=form.accountType.errorMessage
                        color="blue darken-2"
                        label="Account Type"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.affiliates.value"
                        label="Company Affiliation (Optional)"
                        color="blue darken-2">
                    </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.phoneNumber.value"
                        mask='phone'
                        color="blue darken-2"
                        label="Phone Number (optional)"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-checkbox
                        v-model="form.terms"
                        color="green"
                        >
                        <div slot="label" @click.stop="">
                            Do you accept the
                            <a href="javascript:;" @click.stop="terms = true">terms</a>
                            and
                            <a href="javascript:;" @click.stop="conditions = true">conditions?</a>
                        </div>
                        </v-checkbox>
                    </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat @click="cancel">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                    :disabled="!formIsValid"
                    flat
                    color="primary"
                    type="submit"
                    >Register</v-btn>
                </v-card-actions>
                </v-form>
                <v-dialog v-model="terms" width="70%">
                <v-card>
                    <v-card-title class="title">Terms</v-card-title>
                    <v-card-text>
                    {{ contentTerms }}
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        flat
                        color="blue darken-2"
                        @click="terms = false"
                    >Ok</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                <v-dialog v-model="conditions" width="70%">
                <v-card>
                    <v-card-title class="title">Conditions</v-card-title>
                    <v-card-text>
                    {{ contentConditions }}
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        flat
                        color="blue darken-2"
                        @click="conditions = false"
                    >Ok</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-card>
        </v-container>
        <form-confirmation v-model="confirmModal"></form-confirmation>
    </v-app>
</template>

<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import FormConfirmation from '../../components/FormConfirmation';
import HttpResponse from '../../utils/HttpResponse';
import CustomErrorHandler from "../../utils/CustomErrorHandler";
    export default {
    data () {
      return {
          form: {
              first: {
                  value: "",
                  hasError: false
              },
              last: {
                  value: "",
                  hasError: false
              },
              email: {
                  value: "",
                  hasError: false
              },
              emailConfirm: {
                  value: "",
                  hasError: false
              },
              password: {
                  value: "",
                  hasError: false
              },
              passwordMatch: {
                  value: "",
                  hasError: false
              },
              affiliates: {
                  value: "",
                  hasError: false
              },
              accountType: {
                  value: "",
                  hasError: false
              },
              phoneNumber: {
                  value: "",
                  hasError: false
              },
              show1: false,
              show2: false,
              terms: false
        },
        rules: {
            required: val => (val || '').length > 0 || 'This field is required',
            passMatch: val => val === this.form.password.value || 'Passwords must match',
            emailMatch: val => val === this.form.email.value || 'Emails must match'
        },
        accountTypes: ['Guest', 'Member', 'Student', 'Researcher'],
        conditions: false,
        show1: false,
        show2: false,
        snackbar: false,
        terms: false,
        confirmModal: false,
        contentTerms: 'TERMS OF SERVICE\n\n----\n\nOVERVIEW\nThis website is operated by YCAS. Throughout the site, the terms “we”, “us” and “our” refer to YCAS. YCAS offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.\nBy visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.\nPlease read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.\nAny new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.\nOur store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.',
        contentConditions: 'TERMS OF CONDITIONS\n\n----\n\nOVERVIEW\nThis website is operated by YCAS. Throughout the site, the terms “we”, “us” and “our” refer to YCAS. YCAS offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.\nBy visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.\nPlease read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.\nAny new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.\nOur store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.'
      }
    },
    //Check each required section has input.
    computed: {
      formIsValid () {
        return (
          this.form.first.value &&
          this.form.last.value &&
          this.form.email.value &&
          this.form.emailConfirm &&
          this.form.accountType.value &&
          this.form.password.value && 
          this.form.passwordMatch.value &&
          this.form.terms
        )
      }
    },
    methods: {
        submit () {
        // Update this.accountType to full Uppercase lettering on submit
        let categoryOfService = this.form.accountType.value.toUpperCase()
        if (this.$refs.form.validate()) {
            let that = this;

            // Spring requires JSON strings
            let data = JSON.stringify({
                firstName: this.form.first.value,
                lastName: this.form.last.value,
                email: this.form.email.value,
                emailConfirm: this.form.emailConfirm.value,
                phoneNumber: this.form.phoneNumber.value,
                password: this.form.password.value,
                passwordConfirm: this.form.passwordMatch.value,
                company: this.form.affiliates.value,
                categoryOfService: categoryOfService
            });
        
            // This will need changed to properly handle success or failure scenarios
            ApiDriver.User.register(data).then((response) => {
                // After each submit, clear any errors
                this.clearErrors();

                // Handle the response
                HttpResponse.then(response, function(data) {
                    // If the call was a success, redirect to the login page
                    if (data.statusCode == 200 && data.statusReason == "OK"){
                        router.push('/')
                    }
                }, function(status, errors) {
                    // Otherwise handle errors
                    that.handleErrors(errors)
                })
            });
        }
      },
      cancel() {
          router.push('/')
      },
      passwordMatchError() {
          return (this.form.password === this.form.passwordMatch) ? '' : 'Passwords must match'
      },
      handleErrors(errors) {
          // Populate the field error messages
          for (var field in errors) {
              let message = errors[field][0];

              if (field === "FIRST_NAME") {
                  CustomErrorHandler.populateError(this.form.first, message);
              } else if (field === "LAST_NAME") {
                  CustomErrorHandler.populateError(this.form.last, message);
              } else if (field === "EMAIL") {
                  CustomErrorHandler.populateError(this.form.email, message);
              } else if (field === "EMAIL_CONFIRM") {
                  CustomErrorHandler.populateError(this.form.emailConfirm, message);
              } else if (field === "PASSWORD") {
                  CustomErrorHandler.populateError(this.form.password, message);
              } else if (field === "PASSWORD_CONFIRM") {
                  CustomErrorHandler.populateError(this.form.passwordMatch, message);
              } else if (field === "CATEGORY_OF_SERVICE") {
                  CustomErrorHandler.populateError(this.form.accountType, message);
              }
          }
      },
      clearErrors() {
          // Clear all error fields
          CustomErrorHandler.clearError(this.form.first);
          CustomErrorHandler.clearError(this.form.last);
          CustomErrorHandler.clearError(this.form.email);
          CustomErrorHandler.clearError(this.form.password);
          CustomErrorHandler.clearError(this.form.passwordMatch);
          CustomErrorHandler.clearError(this.form.accountType);
      }
    },
    components: {
        FormConfirmation
    }
  }
</script>
    
<style scoped>

</style>
