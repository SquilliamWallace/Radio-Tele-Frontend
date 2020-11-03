<template>
    <div>
        <navigation-bar></navigation-bar>
        <loading v-show="$store.state.isLoading"></loading>
        <v-container v-show="!$store.state.isLoading" style="{ padding:'50px' }">
            <v-card flat>
                <v-form>
                    <v-container grid-list-xl fluid>
                        <v-flex xs12>
                            <v-text-field
                                v-model="profile.firstName.value"
                                label="First Name"
                                :error=profile.firstName.hasError
                                :error-messages=profile.firstName.errorMessage
                                v-on:keyup.enter="updateInformation"
                                required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="profile.lastName.value"
                                label="Last Name"
                                :error=profile.lastName.hasError
                                :error-messages=profile.lastName.errorMessage
                                v-on:keyup.enter="updateInformation"
                                required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="profile.phone.value"
                                :error=profile.phone.hasError
                                :error-messages=profile.phone.errorMessage
                                mask='phone'
                                label="Phone Number (Optional)"
                                v-on:keyup.enter="updateInformation">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="profile.company.value"
                                :error=profile.company.hasError
                                :error-messages=profile.company.errorMessage
                                label="Company Affiliation (Optional)"
                                v-on:keyup.enter="updateInformation">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-select
                            v-model="selectedNotificationType"
                            :items="notificationTypes"
                            label="Notification Type"
                            ></v-select>
                        </v-flex>
                    </v-container>
                    <v-card-actions>
                        <v-btn color="primary" @click="updateInformation">Save</v-btn>
                        <v-btn color="red darken-1" @click="cancelEdit">Cancel</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-container>
        <!--Modal to confirm cancellation of form input-->
    <form-confirmation v-model="confirmModal"></form-confirmation>
    </div>    
</template>

<script>
import router from "../../router";
import NavigationBar from "../../components/utility/NavigationBar.vue";
import FormConfirmation from "../../components/utility/FormConfirmation";
import ApiDriver from "../../ApiDriver";
import HttpResponse from "../../utils/HttpResponse";
import CustomErrorHandler from "../../utils/CustomErrorHandler";
import CurrentUserValidation from '../../utils/CurrentUserValidation'
import Loading from "../../components/utility/Loading"
export default {
  title: "Radio Telescope 1.1.0",
  name: "EditProfile",
  data() {
    return {
      profile: {
        firstName: {
          value: "",
          hasError: false
        },
        lastName: {
          value: "",
          hasError: false
        },
        phone: {
          value: "",
          hasError: false
        },
        company: {
          value: "",
          hasError: false
        },
        notificationType: {
            value: "",
            hasError: false
        }
      },
      confirmModal: false,
      selectedNotificationType: "EMAIL",
      notificationTypes: [
            'EMAIL',
            'SMS', 
            'ALL'
      ]
    };
  },
  methods: {
    cancelEdit() {
      this.confirmModal = !this.confirmModal;
    },
    populateData(data) {
        // Populate the profile information
        this.profile.firstName.value = data.firstName;
        this.profile.lastName.value = data.lastName;
        this.profile.phone.value = data.phoneNumber;
        this.profile.company.value = data.company;
        this.profile.notificationType.value = data.notificationType;
        this.selectedNotificationType = this.profile.notificationType.value;
    },
    retrieveInformation() {
        let that = this;
        // Set the loading flag to true
        this.$store.commit("loading", true);
        // Call the retrieve method
        ApiDriver.User.get(this.$route.params.userId).then(response => {
            // Handle the response
            HttpResponse.then(response, data => {
                // If it was a success, populate the user information fields
                that.populateData(data.data);
                this.$store.commit("loading", false);
            }, (status, errors) => {
                // Access Denied
                if (parseInt(status) === 403) {
                    // Call the generic access denied handler
                    HttpResponse.accessDenied(this);
                } 
                // Not Found
                else if (parseInt(status) === 404) {
                    // Call the generic invalid resource id handler
                    HttpResponse.notFound(this, errors)
                }
            });
        }).catch(errors => {
            // Handle an erroneous API call
            let message = "An error occurred loading this user's information";
            HttpResponse.generalError(this, message, true)
        });
    },
    updateInformation() {
        // Populate the data
        let data = {
            id: this.$store.state.currentUserId,
            firstName: this.profile.firstName.value,
            lastName: this.profile.lastName.value,
            phoneNumber: this.profile.phone.value,
            company: this.profile.company.value,
            notificationType: this.selectedNotificationType
        };
        // Call the update api method
        ApiDriver.User.update(data.id, JSON.stringify(data)).then(response => {
            let that = this;
            // Clear any field errors
            this.clearErrors();
            // Handle the response
            HttpResponse.then(response, data => {
                // If it was a success, return to the profile page
                router.push("/users/" + data.data + "/view");
            }, (status, errors) => {
                // Otherwise, handle errors
                that.handleErrors(errors);
            }
          );
        }).catch(errors => {
            // Handle an erroneous API call
            let message = "An error occurred when updating this user's information"
            HttpResponse.generalError(this, message, true);
        });
    },
    handleErrors(errors) {
        // Populate the field error messages
        for (var field in errors) {
            let message = errors[field][0];

            if (field === "FIRST_NAME") {
                CustomErrorHandler.populateError(this.profile.firstName, message);
            } else if (field === "LAST_NAME") {
                CustomErrorHandler.populateError(this.profile.lastName, message);
            }
        }
    },
    clearErrors() {
        // Clear the errors
        CustomErrorHandler.clearError(this.profile.firstName);
        CustomErrorHandler.clearError(this.profile.lastName);
    }
  },
  components: {
    FormConfirmation,
    NavigationBar,
    Loading
  },
  mounted() {
      // Retrieve the information when the DOM is loaded
      this.retrieveInformation();
      this.$store.commit("updateInfo", {page: "Edit Profile", info: "Fill out the form below to edit the information for\n your user profile."})
  }
};
</script>

<style scoped>
</style>
