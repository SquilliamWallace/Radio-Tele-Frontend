<template>
  <v-dialog dark :value="value" persistent max-width="600px">
    <v-card>
      <v-container align-content-center>
        <span class="headline">Update Users Allotted Time</span>

        <v-container row fluid>
          <!-- <span style="color:red;font-size:12px">{{formErrors.name}}</span> -->
          <v-text-field v-model="hours" label="Hours" type="number"></v-text-field>
          <v-container>
            <v-btn @click="cancel" color="Red">Cancel</v-btn>
            <v-btn @click="submit" color="Green">Submit</v-btn>
          </v-container>
        </v-container>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import router from "../../router";
import FormConfirmation from "../../components/utility/FormConfirmation";
import ApiDriver from "../../ApiDriver";
import HttpResponse from "../../utils/HttpResponse";
import CustomErrorHandler from "../../utils/CustomErrorHandler";
import CurrentUserValidation from "../../utils/CurrentUserValidation";
import Loading from "../../components/utility/Loading";

export default {
  props: {
    value: false,
    user: Number
  },
  watch: {},
  name: "UpdateAllottedTime",
  data() {
    return {
      //form values
      hours: Number,
      miliseconds: Number,

      rules:{
      }
    };
  },
  methods: {
    clearForm() {
      this.hours = "";
    },
    cancel() {
      this.clearForm();
      this.$emit("cancel", false);
      this.$emit("input");
    },
    submit() {
      // One hour is equal to 3600000 ms
      // converting hours to ms
      this.time = this.hours * 3600000;
      console.log(this.time)

      ApiDriver.User.changeAllottedTime(this.user, this.time)
        .then(response => {
          HttpResponse.then(
            response,
            data => {
              this.$swal({
                title: '<span style="color:#f0ead6">Success!<span>',
                html:
                  '<span style="color:#f0ead6">Allotted time successfully updated<span>',
                type: "success",
                background: "#302f2f"
              }).then(response => {
                // Clear out the modal's information
                this.cancel();
              });
            },
            (status, errors) => {}
          );
        })
        .catch(error => {
          console.log(error);
          this.$swal({
            title: '<span style="color:#f0ead6">Error!<span>',
            html:
              '<span style="color:#f0ead6">An error occurred when setting user allotted<span>',
            type: "error",
            background: "#302f2f"
          }).then(response => {
            CurrentUserValidation.validateCurrentUser(this.$store);
          });
        });
    }
  }
};
</script>

<style scoped>
</style>