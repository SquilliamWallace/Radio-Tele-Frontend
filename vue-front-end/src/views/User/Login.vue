<template>
<div>
    <v-parallax height="100%"  src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
    <v-flex>
            <v-container>
                <v-layout row wrap>
                    <v-flex width = "10px" xs12>
                        <v-card-text class = "headline">Login</v-card-text>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-card-text>
            <v-form>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field
                         name="email"
                         v-model="data.username.value"
                         :error=data.username.hasError
                         :error-messages=data.username.errorMessage
                         label="Email" 
                         required
                         v-on:keyup.enter="submit"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field 
                        name="password" 
                        v-model="data.password.value"
                        :error=data.password.hasError
                        :error-messages=data.password.errorMessage 
                        label="Password" 
                        type="password" 
                        required
                        v-on:keyup.enter="submit"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn color="primary" @click="submit">Login</v-btn>
                    </v-flex>
                    <v-flex class="register-style" xs12>
                        <v-btn color="primary" @click="registerRedirect">
                            <div>Register New Account</div>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-dialog v-model="requestPasswordReset" max-width="600px" dark>
                            <v-btn slot="activator" color="primary darken-1">Forgot your password?</v-btn>
                            <v-card>
                                <v-card-title class="justify-center">
                                    <span class="headline">Request Password Reset</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-text-field
                                        name="reqPassEmail"
                                        v-model="data.reqPassEmail.value"
                                        :error=data.reqPassEmail.hasError
                                        :error-messages=data.reqPassEmail.errorMessage
                                        label="Enter Email Address"
                                        v-on:keyup.enter="submitResetRequest"
                                        required
                                        ></v-text-field>
                                    </v-container>
                                    <v-spacer></v-spacer>
                                    <br>
                                    <v-btn color="primary" @click="submitResetRequest">Submit</v-btn>
                                    <v-btn color="red darken-1" @click="clearDialog">Cancel</v-btn>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-form> 
        </v-card-text>
    </v-flex>
    </v-parallax>
</div>
</template>

<script>
import NavigationBar from '../../components/NavigationBar.vue';
import ApiDriver from '../../ApiDriver';
import router from '../../router';
import CurrentUserValidation from '../../utils/CurrentUserValidation';
import CustomErrorHandler from '../../utils/CustomErrorHandler';
import HttpResponse from '../../utils/HttpResponse';
export default {
    name: "Login",
    data () {
        return {
            show: false,
            data: {
                username: {
                    value: "",
                    hasError: false
                },
                password: {
                    value: "",
                    hasError: false
                },
                reqPassEmail: {
                    value: "",
                    hasError: false
                }
            },
            generalErrorMessage: "Invalid Email or Password",
            requestPasswordReset: false
        }
    },
    methods: {
      submit() {
          // Clear any errors
          this.clearErrors();

          // Make the API call
          ApiDriver.login(this.data).then(response => {
              let that = this;

              // Redirect on success
              if(response.headers.authorization){
                that.$store.commit("embedToken", response.headers.authorization);
                router.push('/home');
              } else {
                  // Populate error messages for the form fields
                  CustomErrorHandler.populateError(this.data.username, this.generalErrorMessage);
                  CustomErrorHandler.populateError(this.data.password, this.generalErrorMessage);
              }
          }).catch(error => {
              // Populate error messages for the form fields
            CustomErrorHandler.populateError(this.data.username, this.generalErrorMessage);
            CustomErrorHandler.populateError(this.data.password, this.generalErrorMessage);
          });
      },
      submitResetRequest() {
          // Clear any errors
          this.clearErrors();
          
          // Make the API call
          ApiDriver.requestPasswordReset(this.data.reqPassEmail.value).then(response => {
              // Handle the server response
              HttpResponse.then(response, data => {
                  // Display the success alert
                  this.$swal({
                      title: '<span style="color:#f0ead6">Success!<span>',
                      html: '<span style="color:#f0ead6">You should receive an email shortly' + 
                      ' containing a link to reset your password<span>',
                      type: 'success',
                      background: '#302f2f'
                  }).then(response => {
                      // Close the modal
                      this.requestPasswordReset = false;
                  });
              }, (status, errors) => {
                  // Populate the error messages for the form field
                  CustomErrorHandler.populateError(this.data.reqPassEmail, "Invalid Email Address");
                  this.$forceUpdate();
              })
          })
      },
      clearDialog() {
          // Close the modal and reset values
          CustomErrorHandler.clearError(this.data.reqPassEmail);
          this.requestPasswordReset = false
          this.data.reqPassEmail.value = ""
      },
      registerRedirect(){
          router.push('/users/register');
      },
      clearErrors() {
          CustomErrorHandler.clearError(this.data.username);
          CustomErrorHandler.clearError(this.data.password);
          CustomErrorHandler.clearError(this.data.reqPassEmail);
      }
    }
}
</script>
<style scoped>
.register-style{
    justify-content: center;
    text-align: center;
}
</style>