<template>
<div>
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
            <div>
              <div class="headline">Buzzfeed loves our telescope!</div>
              <span class="grey--text">Featured in top 10 radio telescopes</span>
            </div>
          </v-card-title>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
  
          <v-slide-y-transition>
            <v-card-text v-show="show">
              I hope that one day my software gets featured on buzzfeed, that's how i'll know i made it.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
    </v-parallax>
</div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import ApiDriver from "../ApiDriver";
import router from '../router';
import httpResponse from '../utils/httpResponse';
export default {
  name: "AuthenticatedHome",
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
      ApiDriver.Auth().then((response) => {
        httpResponse.then(response, (data) => {
          this.$store.commit("login", data.data);
        console.log(this.$store.state);
        }, (status, errors) => {
          router.push('/')
        })
      });
    }
  },
  mounted() {
    this.handleLoggedIn();
  }
};
</script>

<style scoped>
.nav-style {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>