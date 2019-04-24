<template>
<div id="parallax-wrap">
    <v-parallax style = "height:100%;" src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
    <navigation-bar class="nav-style"></navigation-bar>
    <v-spacer></v-spacer>
    <v-card>
          <v-img
            src="https://media.istockphoto.com/photos/telescope-picture-id512605413?k=6&m=512605413&s=612x612&w=0&h=3qyaXj4JJOAY1hjNszpp5SCQFY3SUldFzervpQWz0gQ="
            height="200px"
          >
          </v-img>
  
          <v-card-title primary-title>
            <div style="padding: 25px;">
              <div class="headline">Welcome to the York County Astronomical Society Radio Telescope!</div>
              <v-card-text class="grey--text">The York Country Astronomical Society, Inc, is a non-profit organization dedicated to the advancement of the science of astronomy.

              The York County Astronomical Society was started in 1989, and currently has about 30 members in 4 counties in Pennsylvania.

              The Society also has special programs to showcase eclipses, meteor showers, comets, and other special events.

              The Society operates the York Learning Center Planetarium bringing astronomy to the public, presenting astronomical shows and related astronomy programs of the night sky.

              The Society hosts numerous groups for private star parties, from Boy and Girl Scout troops, church groups, school classes, and company groups. We also hold two Introduction to Astronomy classes each year.

              The Society owns 6 optical telescopes:

              An 18” Dobsonian,
              a 14” Dobsonian and a 12” Computerized GoTo Telescope,
              a 10” SCT Telescope,
              a 4.5” Newtonian Telescope,
              and a 4” Astro-Physics Refractor Telescope
              </v-card-text>
            </div>
          </v-card-title>
        </v-card>
    </v-parallax>
</div>
</template>

<script>
import NavigationBar from "../components/utility/NavigationBar.vue";
import ApiDriver from "../ApiDriver";
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import { error } from 'util';
export default {
  title: "Radio Telescope 1.1.0",
  name: "Home",
  data() {
    return {
      show: false
    };
  },
  components: {
    NavigationBar
  },
  methods: {
      handleLoggedIn() {
        // Call the auth api endpoint so we can populate
        // the Vue store with user information
        ApiDriver.Auth.User(this.$store.state.token).then((response) => {
          HttpResponse.then(response, (data) => {
            // Commit the data to the store and update the vue app
            this.$store.commit("login", data.data);
            this.$forceUpdate();
          }, (status, errors) => {
            // Handle if the user logging in has an inactive/disabled account
            this.handleAccountDisabled(errors)
          })
        });
      },
      handleAccountDisabled(errors) {
        let message = "";

        // There will only ever be one error in this scenario
        for (var index in errors) {
          message = errors[index][0]
        }

        // Display the error message in an alert
        this.$swal({
          title: '<span style="color:#f0ead6">Error!</span>',
          html: '<span style="color:#f0ead6">' + message + '</span>',
          type: 'error',
          background: '#302f2f'
        }).then(response => {
            router.push('/')
        });
      }
  },
  mounted() {
    // Handle the log in when the DOM is loaded
    this.handleLoggedIn();
    this.$store.commit("updateInfo", {page: "Home", info: "Welcome to the York County Astronomical Society\n Radio Telescope application!"})
  }
};
</script>

<style scoped>
#parallax-wrap {
  height: 100%
}

.nav-style {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>