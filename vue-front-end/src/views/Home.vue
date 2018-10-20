<template>
<div>
    <v-parallax style = "height:100%;" src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
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
                        <v-text-field name="email" v-model="data.username" label="Email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field name="password" v-model="data.password" label="Password" type="password" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <div>Don't have an account?</div>
                        <a @click="registerRedirect">Register Here!</a>
                    </v-flex>      
                    </v-layout>
                </v-container>
                <v-btn color="white" flat @click="submit">Login</v-btn>
            </v-form> 
        </v-card-text>
    </v-flex>
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
import NavigationBar from '../components/NavigationBar.vue'
import ApiDriver from '../ApiDriver'
import router from '../router'
export default {
    name: "Home",
    data () {
        return {
            show: false,
            data: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
      submit() {
        ApiDriver.User.login(this.data);
      },
      registerRedirect(){
        router.push('/register');
      },
    }
}
</script>

<style scoped>

</style>