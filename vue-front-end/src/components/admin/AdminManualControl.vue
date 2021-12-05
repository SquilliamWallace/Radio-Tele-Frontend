<template>
  <div>
    <loading v-if="$store.state.isLoading"></loading>
    <div v-if="!$store.state.isLoading">
      <v-card flat>
        <v-card-title class="headline">Manual Control</v-card-title>
        <v-container grid-list-xs fluid>
          <v-layout wrap>
            <!-- Text Fields (for numbers) -->
            <!-- Right Asc Hours -->
            <v-flex xs6 sm4>
              <v-text-field
                v-model="rightAscHours"
                :disabled="!(mode === 'Right Ascension and Declination')"
                :validate-on-blur="true"
                color="blue darken-2"
                :rules="[rules.rightAscHours]"
                label="Right Ascension Hours"
                type="number"
                class="number"
              ></v-text-field>
            </v-flex>
            <!-- Right Asc Minutes -->
            <v-flex xs6 sm4>
              <v-text-field
                v-model="rightAscMinutes"
                :disabled="!(mode === 'Right Ascension and Declination')"
                :validate-on-blur="true"
                color="blue darken-2"
                :rules="[rules.rightAscMinutes]"
                label="Right Ascension Minutes"
                type="number"
                class="number"
              ></v-text-field>
            </v-flex>
            <!-- Declination -->
            <v-flex xs6 sm4>
              <v-text-field
                v-model="declination"
                :disabled="!(mode === 'Right Ascension and Declination')"
                :validate-on-blur="true"
                color="blue darken-2"
                :rules="[rules.declination]"
                label="Declination"
                type="number"
                class="number"
              ></v-text-field>
            </v-flex>
            <!-- Azimuth -->
            <v-flex xs6 sm4>
              <v-text-field
                v-model="azimuth"
                :disabled="!(mode === 'Azimuth and Elevation')"
                :validate-on-blur="true"
                color="blue darken-2"
                :rules="[rules.azimuth]"
                label="Azimuth"
                type="number"
                class="number"
              ></v-text-field>
            </v-flex>
            <!-- Elevation -->
            <v-flex xs6 sm4>
              <v-text-field
                v-model="elevation"
                :disabled="!(mode === 'Azimuth and Elevation')"
                :validate-on-blur="true"
                color="blue darken-2"
                :rules="[rules.elevation]"
                label="Elevation"
                type="number"
                class="number"
              ></v-text-field>
            </v-flex>

            <!-- Jog Delta -->
            <v-flex xs6 sm4>
              <v-text-field
                v-model="jogDelta"
                :disabled="mode == null"
                :validate-on-blur="true"
                color="blue darken-2"
                label="Jog Speed"
                type="number"
                class="number"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-checkbox v-model="jogSubmits" color="green" label="Send Command on Jog"></v-checkbox>
            </v-flex>
          </v-layout>
          <!-- Button to update from fields -->
          <v-card-actions>
            <v-btn color="red darken-1" @click="submit(2)">STOP</v-btn>
            <v-btn flat @click="submit(0)">Send Command</v-btn>
            <v-btn flat @click="submit(1)">Send Script</v-btn>
            <v-btn flat @click="clearForm">Clear Form</v-btn>
          </v-card-actions>
            <!-- Dropdown to select update mode -->
                <v-flex xs6 sm4>
                    <v-select v-model="mode" :items="modes" color="blue darken-2" label="Mode" required></v-select>
                </v-flex>
                <v-flex xs6 sm4>
                    <v-select v-model="selectedScript" :items="scripts" color="blue darken-2" label="Script" required></v-select>
                </v-flex>
              <v-text-field
                v-model="middlemanReply"
                :disabled="true"
                :validate-on-blur="true"
                color="blue darken-2"
                label="Response"
              ></v-text-field>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import router from "../../router";
import ApiDriver from "../../ApiDriver";
import HttpResponse from "../../utils/HttpResponse";
import CurrentUserValidation from "../../utils/CurrentUserValidation";
import Loading from "../../components/utility/Loading";
// import VueSocketIO from 'vue-socket.io';
// import io from 'socket.io';

export default {
  name: "ManualControl",
  data() {
    return {
      rightAscHours: null,
      rightAscMinutes: null,
      declination: null,

      azimuth: null,
      elevation: null,

      jogDelta: 1,
      jogSubmits: false,

      mode: null,

      modes: [
        "Right Ascension and Declination",
        "Azimuth and Elevation"
      ],

      selectedScript: null,

      scripts: [
          "Stow", // SCRIPT: STOW
          "Snow Dump", // SCRIPT: DUMP
          "Full Elevation Move", // SCRIPT: FULL_EV
          "Full 360 Move, Clockwise", // SCRIPT: CLOCK
          "Full 360 Move, Counterclockwise", // SCRIPT: COUNTER
          "Calibration" // SCRIPT: CALIBRATE
          /* "Track Two Points",
          "Hit Hard Stops", 
          "Hit Limit Switches",
          "Hit Two Limit Switches at Once",
          "Return from Beyond Limit Switch",
          "Return from Hard Stop" */
      ],

      middlemanReply: "You have not sent a message to the middleman service yet.",

      rules: {
        rightAscHours: val =>
          (val && val.toString().length > 0 && val < 24 && val >= 0) ||
          "Must be between 0 and 23 hours",
        rightAscMinutes: val =>
          (val && val.toString().length > 0 && val < 60 && val >= 0) ||
          "Must be between 0 and 59 minutes",
        declination: val =>
          (val && val.toString().length > 0 && val >= 0 && val < 360) ||
          "Must be between 0 and 360",
        numRequired: val =>
          (val && val.toString().length > 0 && val <= 90 && val >= -90) ||
          "Must be between 90 and -90",
        azimuth: val =>
          (val && val.toString().length > 0 && val >= 0 && val < 360) ||
          "Must be between 0 and 360",
        elevation: val =>
          (val && val.toString().length > 0 && val >= 0 && val <= 90) ||
          "Must be between 0 and 90"
      }
    };
  }, 
  methods: {
    clearForm() {
        (this.rightAscHours = null),
        (this.rightAscMinutes = null),
        (this.declination = null),
        (this.azimuth = null),
        (this.elevation = null),
        (this.mode = null);

        this.selectedScript = null;

        this.jogSubmits = false;
        this.jogDelta = 1;

        this.middlemanReply = "You have not sent a message to the middleman service yet.";
    }, /*
    updateRightAsc() {
      if (this.mode === "Right Ascension by Decimal Value") {
        var totalMinutes = this.rightAscDecimal * 4;
        this.rightAscHours = (totalMinutes - (totalMinutes % 60)) / 60;
        this.rightAscMinutes = totalMinutes % 60;
      } else if (this.mode === "Right Ascension and Declination") {
        this.rightAscDecimal =
          this.rightAscHours * 15 + this.rightAscMinutes * 0.25;
      }
    }, */
    update(val) {
      if (val == 0) {
        this.submit();
      } else if (val == 1) {
        // Right Asc Neg
        if (this.mode === "Right Ascension and Declination") {
          this.rightAscMinutes =
            parseInt(this.rightAscMinutes) - parseFloat(this.jogDelta);
          if (this.rightAscMinutes < 0) {
            this.rightAscHours = parseInt(this.rightAscHours) - 1;
            this.rightAscMinutes = parseInt(this.rightAscMinutes) + 60;
          }
        }
      } else if (val == 2) {
        // Declination Pos
        if (this.mode === "Right Ascension and Declination") {
          this.declination =
            parseFloat(this.declination) + parseFloat(this.jogDelta);
        }
      } else if (val == 3) {
        // Declination Neg
        if (this.mode === "Right Ascension and Declination") {
          this.declination =
            parseFloat(this.declination) - parseFloat(this.jogDelta);
        }
      } else if (val == 4) {
        // Right Asc Pos
        if (this.mode === "Right Ascension and Declination") {
          this.rightAscMinutes =
            parseInt(this.rightAscMinutes) + parseFloat(this.jogDelta);
          if (this.rightAscMinutes >= 60) {
            this.rightAscHours =
              parseInt(this.rightAscHours) + 1;
            this.rightAscMinutes = parseInt(this.rightAscMinutes) - 60;
          }
        }
      } else if (val == 5) {
        // Azimuth Neg
        if (this.mode === "Azimuth and Elevation") {
          this.azimuth = parseFloat(this.azimuth) - parseFloat(this.jogDelta);
        }
      } else if (val == 6) {
        // Elevation Pos
        if (this.mode === "Azimuth and Elevation") {
          this.elevation = parseFloat(this.elevation) + parseFloat(this.jogDelta);
        }
      } else if (val == 7) {
        // Elevation Neg
        if (this.mode === "Azimuth and Elevation") {
          this.elevation = parseFloat(this.elevation) - parseFloat(this.jogDelta);
        }
      } else if (val == 8) {
        // Azimuth Pos
        if (this.mode === "Azimuth and Elevation") {
          this.azimuth = parseFloat(this.azimuth) + parseFloat(this.jogDelta);
        }
      }
      // this.updateRightAsc();

      if (val != 0 && this.jogSubmits) {
        this.submit(0);
      }
    },
    submit(val) {
      // This method will use a TCP client to send commands to the telescope.
      console.log("Submit Reached! Val = " + val);

      if(val == 0 || val == 1 || val == 2) {
        var selectedCommand = "";
        if(val == 0) {
            // COORDS
            if(this.mode === "Right Ascension and Declination") {
              if(this.rightAscHours >= 0 && this.rightAscHours < 24 && this.rightAscMinutes >= 0 && this.rightAscMinutes < 60 && this.declination >= -90 && this.declination <= 90) {
                console.log("Valid Right Asc and Declination Jog Move input! Submitting: " + this.rightAscHours + " " + this.rightAscMinutes + " " + this.declination);
                selectedCommand = "HOURS " + this.rightAscHours + " MINUTES " + this.rightAscMinutes + " DECLINATION " + this.declination; // TODO: get final format
              }
            } else if(this.mode === "Azimuth and Elevation") {
              if(this.azimuth >= 0 && this.azimuth < 360 && this.elevation >= 0 && this.elevation <= 90) {
                console.log("Valid Azimuth and Elavation Jog Move input! Submitting: " + this.azimuth + " " + this.elevation );
                selectedCommand = "1.0|ORIENTATION_MOVE| AZ " + this.azimuth + "| EL " + this.elevation + "| TIME"; // TODO: get final format
                ApiDriver.webSocket(selectedCommand);
              }            
            }
        } else if (val == 1) {
            // SCRIPTS
            if(this.selectedScript != null){
              if(this.selectedScript == "Stow") {
                selectedCommand = "1.0 | SCRIPT | STOW | TIME";
              } else if (this.selectedScript == "Snow Dump") {
                selectedCommand = "1.0 | SCRIPT | DUMP | TIME";
              } else if (this.selectedScript == "Full Elevation Move") {
                selectedCommand = "1.0 | SCRIPT | FULL_EV | TIME";
              } else if (this.selectedScript == "Full 360 Move, Clockwise") {
                selectedCommand = "1.0 | SCRIPT | FULL_CLOCK | TIME";
              } else if (this.selectedScript == "Full 360 Move, Counterclockwise") {
                selectedCommand = "1.0 | SCRIPT | FULL_COUNTER | TIME";
              } else if (this.selectedScript == "Calibration") {
                selectedCommand = "1.0 | SCRIPT | CALIBRATE | TIME";
              }
              ApiDriver.webSocket(selectedCommand);
              console.log("Script Submit! submitting... " + this.selectedScript);
            }
        } else if (val == 2) {
          selectedCommand = "1.0 | STOP_RT | TIME";
          console.log("STOP TELESCOPE! submitting... " + selectedCommand);
        }
        let data = {
          command: selectedCommand
        };
        var call = ApiDriver.middlemanConnection(data);
        call.then(response => {
          console.log(response);
          this.middlemanReply = response.data;
        }).catch(error => {
          console.log(error);
          this.middlemanReply = "Something went wrong! Oh no!";
        });
      }


    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped>
</style>