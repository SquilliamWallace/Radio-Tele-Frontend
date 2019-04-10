<template>
  <div id="parallax-wrap">
    <v-parallax
      height="100%"
      src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    >
      <div style="margin: auto;">
        <v-layout align-center>
          <v-flex xs12>
            <v-card style="opacity:.95" width="500px" height="500px" dark>
              <v-card-text style="padding-top: 50px" class="headline">Login</v-card-text>
              <v-card-text>
                <v-form>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          name="email"
                          v-model="data.username.value"
                          :error="data.username.hasError"
                          :error-messages="data.username.errorMessage"
                          label="Email"
                          required
                          outline
                          browser-autocomplete
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          name="password"
                          v-model="data.password.value"
                          :error="data.password.hasError"
                          :error-messages="data.password.errorMessage"
                          label="Password"
                          type="password"
                          required
                          outline
                        ></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-btn large block color="primary" @click="submit">LOGIN</v-btn>
                      </v-flex>
                      <v-flex class="register-style" xs12>
                        <span color="primary" @click="registerRedirect">Register New Account</span>
                      </v-flex>
                      <v-flex xs12>
                        <v-dialog v-model="requestPasswordReset" max-width="600px" dark>
                          <span slot="activator" color="primary darken-1">Forgot your password?</span>
                          <v-card>
                            <v-card-title class="justify-center">
                              <span class="headline">Request Password Reset</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container grid-list-md>
                                <v-text-field
                                  name="reqPassEmail"
                                  v-model="data.reqPassEmail.value"
                                  :error="data.reqPassEmail.hasError"
                                  :error-messages="data.reqPassEmail.errorMessage"
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
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-parallax>
  </div>
</template>

<script>
import NavigationBar from "../../components/utility/NavigationBar.vue";
import ApiDriver from "../../ApiDriver";
import router from "../../router";
import CurrentUserValidation from "../../utils/CurrentUserValidation";
import CustomErrorHandler from "../../utils/CustomErrorHandler";
import HttpResponse from "../../utils/HttpResponse";
import { checkBrowser } from "../../mixins/BrowserVersion.js";
export default {
  title: "Radio Telescope 1.1.0",
  name: "Login",
  data() {
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
    };
  },
  methods: {
    submit() {
      // Clear any errors
      this.clearErrors();

      // Make the API call
      ApiDriver.login(this.data)
        .then(response => {
          let that = this;

          // Redirect on success
          if (response.headers.authorization) {
            that.$store.commit("embedToken", response.headers.authorization);
            router.push("/home");
          } else {
            // Populate error messages for the form fields
            CustomErrorHandler.populateError(
              this.data.username,
              this.generalErrorMessage
            );
            CustomErrorHandler.populateError(
              this.data.password,
              this.generalErrorMessage
            );
          }
        })
        .catch(error => {
          // Populate error messages for the form fields
          CustomErrorHandler.populateError(
            this.data.username,
            this.generalErrorMessage
          );
          CustomErrorHandler.populateError(
            this.data.password,
            this.generalErrorMessage
          );
        });
    },
    submitResetRequest() {
      // Clear any errors
      this.clearErrors();

      // Make the API call
      ApiDriver.requestPasswordReset(this.data.reqPassEmail.value).then(
        response => {
          // Handle the server response
          HttpResponse.then(
            response,
            data => {
              // Display the success alert
              this.$swal({
                title: '<span style="color:#f0ead6">Success!<span>',
                html:
                  '<span style="color:#f0ead6">You should receive an email shortly' +
                  " containing a link to reset your password<span>",
                type: "success",
                background: "#302f2f"
              }).then(response => {
                // Close the modal
                this.requestPasswordReset = false;
              });
            },
            (status, errors) => {
              // Populate the error messages for the form field
              CustomErrorHandler.populateError(
                this.data.reqPassEmail,
                "Invalid Email Address"
              );
              this.$forceUpdate();
            }
          );
        }
      );
    },
    clearDialog() {
      // Close the modal and reset values
      CustomErrorHandler.clearError(this.data.reqPassEmail);
      this.requestPasswordReset = false;
      this.data.reqPassEmail.value = "";
    },
    registerRedirect() {
      router.push("/users/register");
    },
    clearErrors() {
      CustomErrorHandler.clearError(this.data.username);
      CustomErrorHandler.clearError(this.data.password);
      CustomErrorHandler.clearError(this.data.reqPassEmail);
    }
  },
  mounted: function() {
    checkBrowser(this);
  }
};
</script>
<style scoped>
#parallax-wrap {
  height: 100%;
}

.register-style {
  justify-content: center;
  text-align: center;
  cursor: pointer;
}

</style>