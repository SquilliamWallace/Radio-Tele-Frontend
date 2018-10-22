<template>
    <v-app>
        <v-container v-bind:style="{ padding:'50px' }">
            <v-card flat>
                <v-snackbar
                v-model="snackbar"
                absolute
                top
                right
                color="success"
                >
                <span>Registration successful!</span>
                <v-icon dark>check_circle</v-icon>
                </v-snackbar>
                <v-form ref="form" @submit.prevent="submit" refs="form">
                <v-container grid-list-xl fluid>
                    <v-layout wrap>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.first"
                        :rules="rules.name"
                        color="blue darken-2"
                        label="First name"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.last"
                        :rules="rules.name"
                        color="blue darken-2"
                        label="Last name"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.email"
                        :rules="rules.email"
                        color="blue darken-2"
                        label="Email"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select
                        v-model="form.accountType"
                        :items="accountTypes"
                        :rules="rules.account"
                        color="blue darken-2"
                        label="Account Type"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.password"
                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                        :rules="rules.password"
                        :type="show1 ? 'text' : 'password'"
                        color="blue darken-2"
                        label="Password"
                        @click:append="show1 = !show1"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.passwordMatch"
                        :append-icon="show2 ? 'visibility_off' : 'visibility'"
                        
                        :type="show2 ? 'text' : 'password'"
                        color="blue darken-2"
                        label="Re-Type Password"
                        :error-messages='passwordMatchError()'
                        @click:append="show2 = !show2"
                        required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea
                        v-model="form.affiliates"
                        color="blue darken-2"
                        >
                        <div slot="label">
                            Company Affiliates <small>(optional)</small>
                        </div>
                        </v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field
                        v-model="form.phoneNumber"
                        :mask='phoneMask'
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
                    <v-btn flat @click="resetForm">Cancel</v-btn>
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
// import Navbar from "../components/Navbar.vue"
import router from '../router';
import ApiDriver from '../ApiDriver'
import FormConfirmation from '../components/FormConfirmation'
    export default {
    data () {
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        email: '',
        password: '',
        passwordMatch: '',
        affiliates: '',
        accountType: '',
        phoneNumber: '',
        show1: false,
        show2: false,
        terms: false
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
            email: [
                val => /.+@.+.\.+./.test(val) || 'Needs Valid Email'
            ],
            account: [
                val => (val || '').length > 0 || 'This field is required'
            ],
            name: [
                val => (val || '').length > 0 || 'This field is required'
            ],
            password: [
                val => (val || '').length >= 8 || 'Password must be atleast 8 Characters Long',
                val => /.*[0-9].*/.test(val) || 'Password must have atleast 1 Number',
                val => /.*[A-Z].*/.test(val) || 'Password must have atleast 1 Capital',
                val => /.*[!@#$%^&*()].*/.test(val) || 'Password must have atleast 1 Special Character'
            ],
            passMatch: [
                val => val == this.password || 'Passwords must match'
            ]
        },
        accountTypes: ['Guest', 'Member', 'Student', 'Researcher'],
        conditions: false,
        show1: false,
        show2: false,
        snackbar: false,
        terms: false,
        phoneMask: 'phone',
        confirmModal: false,
        contentTerms: 'TERMS OF SERVICE\n\n----\n\nOVERVIEW\nThis website is operated by YCAS. Throughout the site, the terms “we”, “us” and “our” refer to YCAS. YCAS offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.\nBy visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.\nPlease read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.\nAny new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.\nOur store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.',
        contentConditions: 'TERMS OF CONDITIONS\n\n----\n\nOVERVIEW\nThis website is operated by YCAS. Throughout the site, the terms “we”, “us” and “our” refer to YCAS. YCAS offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.\nBy visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.\nPlease read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.\nAny new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.\nOur store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.',
        defaultForm
      }
    },
    //Check each required section has input.
    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.email &&
          this.form.accountType &&
          this.form.password && 
          this.form.passwordMatch &&
          this.form.terms
          
        )
      }
    },

    methods: {
      //If cancel clear the form. (Maybe switch back to log in screen)
      resetForm () {
        this.confirmModal = !this.confirmModal
      },
      submit () {
        // Update this.accountType to full Uppercase lettering on submit
        this.form.accountType = this.form.accountType.toUpperCase()
        if (this.$refs.form.validate()) {
            console.log(this.form)

            // Spring requires JSON strings
            let data = JSON.stringify({
                firstName: this.form.first,
                lastName: this.form.last,
                email: this.form.email,
                phoneNumber: this.form.phoneNumber,
                password: this.form.password,
                passwordConfirm: this.form.passwordMatch,
                company: this.form.affiliates,
                categoryOfService: this.form.accountType
            })
        
            // This will need changed to properly handle success or failure scenarios
            ApiDriver.User.register(data).then((response) => {
                console.log(response);
                if (response.status == 200 && response.statusText == "OK"){
                    router.push('/')
                }
            });
        }
      },
      passwordMatchError() {
          return (this.form.password === this.form.passwordMatch) ? '' : 'Passwords must match'
      }
    },
    components: {
        FormConfirmation
    }
  }
</script>
    
<style scoped>

</style>
