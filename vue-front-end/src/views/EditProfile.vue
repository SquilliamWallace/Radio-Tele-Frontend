<template>
    <div>
        <navigation-bar></navigation-bar>
        <v-container style="{ padding:'50px' }">
            <v-card flat>
                <v-form>
                    <v-container grid-list-xl fluid>
                        <v-flex xs12>
                            <v-text-field
                                v-model="profile.firstName.value"
                                label="First Name"
                                :error=profile.firstName.hasError
                                :error-messages=profile.firstName.errorMessage
                                required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="profile.lastName.value"
                                label="Last Name"
                                :error=profile.lastName.hasError
                                :error-messages=profile.lastName.errorMessage
                                required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="profile.email.value"
                                label="Email Address"
                                :error=profile.email.hasError
                                :error-messages=profile.email.errorMessage
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
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="profile.company.value"
                                :error=profile.company.hasError
                                :error-messages=profile.company.errorMessage
                                label="Company Affiliation (Optional)">
                            </v-text-field>
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
    <form-confirmation :confirmation="confirmModal"></form-confirmation>
    </div>    
</template>

<script>
import router from "../router";
import NavigationBar from "../components/NavigationBar.vue";
import FormConfirmation from "../components/FormConfirmation";
import ApiDriver from "../ApiDriver";
import httpResponse from "../utils/httpResponse";
import CustomErrorHandler from "../utils/customErrorHandler";

export default {
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
        email: {
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
        }
      },
      confirmModal: false
    };
  },
  methods: {
    cancelEdit() {
      this.confirmModal = !this.confirmModal;
    },
    populateData(data) {
      this.profile.firstName.value = data.firstName;
      this.profile.lastName.value = data.lastName;
      this.profile.email.value = data.email;
      this.profile.phone.value = data.phoneNumber;
      this.profile.company.value = data.company;
    },
    retrieveInformation() {
      let that = this;

      if (!this.$route.params.userId) {
        router.push("/");
      } else {
        ApiDriver.User.get(this.$route.params.userId)
        .then(response => {
            httpResponse.then(
              response,
              data => {
                  that.populateData(data.data);
              },
              (status, errors) => {
                if (parseInt(status) === 403) {
                  alert("Access Denied");
                  if (that.$store.state.currentUserId) {
                    router.push("/authHome");
                  } else {
                    router.push("/");
                  }
                } else {
                    handleErrors(errors);
                }
              }
            );
          })
          .catch(errors => {
            alert("An error occurred loading this user's information");
            console.log(errors);
          });
      }
    },
    updateInformation() {
      let data = {
        id: this.$store.state.currentUserId,
        firstName: this.profile.firstName.value,
        lastName: this.profile.lastName.value,
        email: this.profile.email.value,
        phoneNumber: this.profile.phone.value,
        company: this.profile.company.value
      };

      ApiDriver.User.update(data.id, JSON.stringify(data)).then(response => {
        let that = this;
          httpResponse.then(response, function(data) {
              router.push("/users/" + data.data + "/view");
          }, function(status, errors) {
              that.handleErrors(errors);
            }
          );
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    handleErrors(errors) {
      for (var field in errors) {
        let message = errors[field][0];

        if (field === "FIRST_NAME") {
          CustomErrorHandler.populateError(this.profile.firstName, message);
        } else if (field === "LAST_NAME") {
          CustomErrorHandler.populateError(this.profile.lastName, message);
        } else if (field === "EMAIL") {
          CustomErrorHandler.populateError(this.profile.email, message);
        }
      }
    },
    clearErrors() {
      CustomErrorHandler.clearError(this.profile.firstName);
      CustomErrorHandler.clearError(this.profile.lastName);
      CustomErrorHandler.clearError(this.profile.email);
    }
  },
  components: {
    FormConfirmation,
    NavigationBar
  },
  mounted() {
    this.retrieveInformation();
  }
};
</script>

<style scoped>
</style>
