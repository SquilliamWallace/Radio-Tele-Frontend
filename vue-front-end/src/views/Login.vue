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
                        <v-text-field name="email" v-model="data.username" label="Email" required v-on:keyup.enter="submit"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field name="password" v-model="data.password" label="Password" type="password" required v-on:keyup.enter="submit"></v-text-field>
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
    </v-parallax>
</div>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'
import ApiDriver from '../ApiDriver'
import router from '../router'
import CurrentUserValidation from '../utils/CurrentUserValidation'
export default {
    name: "Login",
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
        router.push('/users/register');
      },
    }
}
</script>

<style scoped>

</style>