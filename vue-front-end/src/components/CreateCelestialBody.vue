<template dark>
    <v-dialog v-model="celestialBodyForm" persistent max-width="600px">
      <v-btn slot="activator" dark icon class="mt-3 " ><v-icon>add_circle_outline</v-icon></v-btn>

      <v-card>
        <v-container align-content-center>
            <span  class="headline">Celestial Body</span>

            <v-container fluid>
                    <v-text-field
                        v-model="form.name.value"
                        label="Name"
                        :error=form.name.hasError
                        :error-messages=form.name.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.name}}</span> -->
                    <v-text-field
                        v-model="form.declination.value"
                        label="Declination"
                        type="number"
                        :rules="[rules.numRequired]"
                        :error=form.declination.hasError
                        :error-messages=form.declination.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.dec}}</span> -->
                    <v-text-field
                        v-model="form.hours.value"
                        label="Hours"
                        type="number"
                        :rules="[rules.rightAscHours]"
                        :error=form.hours.hasError
                        :error-messages=form.hours.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.hour}}</span> -->
                    <v-text-field
                        v-model="form.minutes.value"
                        label="Minutes"
                        type="number"
                        :rules="[rules.rightAscMinutes]"
                        :error=form.minutes.hasError
                        :error-messages=form.minutes.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.min}}</span> -->
                    <v-text-field
                        v-model="form.seconds.value"
                        label="Seconds"
                        type="number"
                        :rules="[rules.rightAscSeconds]"
                        :error=form.seconds.hasError
                        :error-messages=form.seconds.errorMessage
                    ></v-text-field>
                    <!-- <span style="color:red;font-size:12px">{{formErrors.sec}}</span> -->
                    <v-container>
                    <v-btn @click="cancel" color="Red" dark >Cancel</v-btn>
                    <v-btn @click="updateOrCreate" color="Green" dark >Submit</v-btn>
                    </v-container>
                </v-container>

        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
import { error } from 'util';
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import ApiDriver from "../ApiDriver";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import CurrentUserValidation from  '../utils/CurrentUserValidation';

export default {
    props:['updateFormVals','isUpdate','updateFormVals'],
    watch: {
        //monitors the update prop. In parent, update is toggled when
        //the user clicks on a celestial body in the table
        isUpdate: function(){
                this.celestialBodyForm = true
                this.form.name.value = this.updateFormVals.name
                this.form.declination.value = this.updateFormVals.dec
                this.form.hours.value = this.updateFormVals.hour
                this.form.minutes.value = this.updateFormVals.min
                this.form.seconds.value = this.updateFormVals.sec
                this.useUpdateCall = true
        }
    },
    name: 'CreateCelestialBody',
    data() {
        return {
            form: {
                name: {
                   value: "",
                   hasError: false,
                   errorMsg: ""
               },
               hours:{
                   value: '',
                   hasError: false,
                   errorMsg: ""
               },
               minutes:{
                   value: '',
                   hasError: false,
                   errorMsg: ""
               },
               seconds:{
                   value: '',
                   hasError: false,
                   errorMsg: ""
               },
               declination:{
                   value: '',
                   hasError: false,
                   errorMsg: ""
               }
            },
            celestialBodyForm: false,
            useUpdateCall: false,
            rules:{
                rightAscHours: val => (val && val.toString().length > 0 && val < 24 && val >= 0) || 'Must be between 0 and 23 hours',
                rightAscMinutes: val => (val && val.toString().length > 0 && val < 60 && val >= 0) || 'Must be between 0 and 59 minutes',
                rightAscSeconds: val => (val && val.toString().length > 0 && val < 60 && val >= 0) || 'Must be between 0 and 59 seconds',
                numRequired: val => (val && val.toString().length > 0 && val <=90 && val >= -90) || 'Must be between 90 and -90'
            },
            
            
        }
    },
    methods: {
        updateOrCreate(){
            if(this.useUpdateCall === true){
                this.update()
            }else{
                this.create()
            }
        },
        update(){
            console.log("Updateing Celestial Body")
            let data = JSON.stringify({
                name: this.form.name.value,
                hours: this.form.hours.value,
                minutes: this.form.minutes.value,
                seconds: this.form.seconds.value,
                declination: this.form.declination.value
            })
            console.log("about to call api")
            console.log("the form id is: "+this.updateFormVals.id)
            ApiDriver.CelestialBodies.updateCB(this.updateFormVals.id, data).then((response) => {
                console.log("update if " + this.updateFormVals.id)
                let that = this;
               HttpResponse.then(response, data => {
                    //this.$store.commit("loading", false);
                    console.log(response)
                    if(data.statusCode === "200"){
                        this.celestialBodyForm = false
                        this.resetForm()
                        this.sendValues()
                    }
                },(status, errors) => {
                    //Populates error message for form, clears form if no errors are fixed
                    if(errors.DECLINATION){
                        this.form.declination.hasError = true
                        for(var index in errors.DECLINATION){
                            this.form.declination.errorMsg = this.form.declination.errorMsg + errors.DECLINATION[index] + "\n"
                        }
                    } else{this.form.declination.errorMsg = ""}
                    if(errors.HOURS){
                        this.form.hours.hasError = true
                        for(var index in errors.HOURS){
                            this.form.hours.errorMsg = this.form.hours.errorMsg + errors.HOURS[index] + "\n"
                        }
                    } else{this.form.hours.errorMsg = ""}
                    if(errors.MINUTES){
                        this.form.minutes.hasError = true
                        for(var index in errors.MINUTES){
                            this.form.minutes.errorMsg = this.form.minutes.errorMsg + errors.MINUTES[index] + "\n"
                        }
                    } else{this.form.minutes.errorMsg = ""}
                    if(errors.SECONDS){
                        this.form.seconds.hasError = true
                        for(var index in errors.SECONDS){
                            this.form.seconds.errorMsg = this.form.seconds.errorMsg + errors.SECONDS[index] + "\n"
                        }
                    } else{this.form.seconds.errorMsg = ""}
                    if(errors.NAME){
                        this.form.name.hasError = true
                        for(var index in errors.NAME){
                            this.form.name.errorMsg = this.form.name.errorMsg + errors.NAME[index] + "\n"
                        }
                    } else{this.form.name.errorMsg = ""}
                    console.log(errors)
                    that.handleErrors(errors)
                }) 
            }).catch((error) => {
                console.log(error)
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when updating the celestial body<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
            });
            this.useUpdateCall = false
        },
        create(){
            console.log("Creating Celestial Body")
            let data = JSON.stringify({
                name: this.form.name.value,
                hours: this.form.hours.value,
                minutes: this.form.minutes.value,
                seconds: this.form.seconds.value,
                declination: this.form.declination.value
            })

            ApiDriver.CelestialBodies.createCB(data).then((response) => {
                let that = this;
               HttpResponse.then(response, data => {
                    //this.$store.commit("loading", false);
                    console.log(response)
                    if(data.statusCode === "200"){
                        this.celestialBodyForm = false
                        this.resetForm()
                        this.sendValues()
                    }
                },(status, errors) => {
                    //Populates error message for form, clears form if no errors are fixed
                    if(errors.DECLINATION){
                        this.form.declination.hasError = true
                        for(var index in errors.DECLINATION){
                            this.form.declination.errorMsg = this.form.declination.errorMsg + errors.DECLINATION[index] + "\n"
                        }
                    } else{this.form.declination.errorMsg = ""}
                    if(errors.HOURS){
                        this.form.hours.hasError = true
                        for(var index in errors.HOURS){
                            this.form.hours.errorMsg = this.form.hours.errorMsg + errors.HOURS[index] + "\n"
                        }
                    } else{this.form.hours.errorMsg = ""}
                    if(errors.MINUTES){
                        this.form.minutes.hasError = true
                        for(var index in errors.MINUTES){
                            this.form.minutes.errorMsg = this.form.minutes.errorMsg + errors.MINUTES[index] + "\n"
                        }
                    } else{this.form.minutes.errorMsg = ""}
                    if(errors.SECONDS){
                        this.form.seconds.hasError = true
                        for(var index in errors.SECONDS){
                            this.form.seconds.errorMsg = this.form.seconds.errorMsg + errors.SECONDS[index] + "\n"
                        }
                    } else{this.form.seconds.errorMsg = ""}
                    if(errors.NAME){
                        this.form.name.hasError = true
                        for(var index in errors.NAME){
                            this.form.name.errorMsg = this.form.name.errorMsg + errors.NAME[index] + "\n"
                        }
                    } else{this.form.name.errorMsg = ""}
                    console.log(errors)
                    that.handleErrors(errors)
                }) 
            }).catch((error) => {
                console.log(error)
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when creating the celestial body<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
            });
        },
        handleErrors(errors) {
          // Populate the field error messages
          for (var field in errors) {
              let message = errors[field][0];

              if (field === "NAME") {
                  CustomErrorHandler.populateError(this.form.name, message);
              } else if (field === "HOURS") {
                  CustomErrorHandler.populateError(this.form.hours, message);
              } else if (field === "MINUTES") {
                  CustomErrorHandler.populateError(this.form.minutes, message);
              } else if (field === "SECONDS") {
                  CustomErrorHandler.populateError(this.form.seconds, message);
              }else if (field === "DECLINATION") {
                  CustomErrorHandler.populateError(this.form.declination, message);
            }  
          }
        },
        sendValues:function(){
            this.$emit('sendValues',this.form)
            
        },
        resetForm:function(){
            CustomErrorHandler.clearError(this.form.name);
            CustomErrorHandler.clearError(this.form.declination);
            CustomErrorHandler.clearError(this.form.hours);
            CustomErrorHandler.clearError(this.form.minutes);
            CustomErrorHandler.clearError(this.form.seconds);

            this.form.name.value = ""
            this.form.declination.value = ""
            this.form.hours.value = ""
            this.form.minutes.value = ""
            this.form.seconds.value = ""
        },
      cancel() {
          this.celestialBodyForm = false
          this.resetForm()
      }
    }
}
</script>

<style scoped>

</style>