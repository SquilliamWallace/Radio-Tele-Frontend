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
                <v-form ref="form" @submit.prevent="submit">
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
                    <v-card-text v-for="n in 5" :key="n">
                    {{ content }}
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        flat
                        color="purple"
                        @click="terms = false"
                    >Ok</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                <v-dialog v-model="conditions" width="70%">
                <v-card>
                    <v-card-title class="title">Conditions</v-card-title>
                    <v-card-text v-for="n in 5" :key="n">
                    {{ content }}
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        flat
                        color="purple"
                        @click="conditions = false"
                    >Ok</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
// import Navbar from "../components/Navbar.vue"
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
        terms: false
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          email: [
              val => /.+@.+.\.+./.test(val) || 'Needs Valid Email'
          ],
          account: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required']
        },
        accountTypes: ['Free', 'Member', 'Student', 'Researcher'],
        conditions: false,
        snackbar: false,
        terms: false,
        phoneMask: 'phone',
        defaultForm
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.email &&
          this.form.accountType &&
          this.form.terms
        )
      }
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      }
    }
  }
</script>
    
<style scoped>

</style>
