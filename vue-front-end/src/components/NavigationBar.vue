<template>
<div>
    <v-toolbar class="bar-style" id="titleBar">
      <v-toolbar-side-icon @click="showDrawer=!showDrawer"></v-toolbar-side-icon>    
      <v-toolbar-title class="title-style" @click="homeRedirect">YCAS Radio Telescope</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click = "dialog = !dialog" flat>Log in</v-btn>
        <v-btn to="/profile">Profile</v-btn>
      </v-toolbar-items>
      <v-app>
           <v-dialog dark v-model = "dialog"  max-width="500px" max-height="100px">
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex width = "10px" xs12>
                        <v-card-text class = "headline">Login</v-card-text>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <div>Don't have an account?</div>
                  <a @click="registerRedirect">Register Here!</a>
              </v-flex>
              
            </v-layout>
          </v-container>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="white" flat @click="dialog = false">Login</v-btn>
        </v-card-actions>
        </v-card>
        </v-dialog>
      </v-app>
     
    </v-toolbar>
    <v-navigation-drawer :temporary=true :floating=true :hide-overlay=true style="max-height:200px; position:absolute;" v-model="showDrawer">
        <v-list>
            <v-list-tile v-for = "item in items"
            :key = "item.title"
            router
            :to = "item.path"
            color = "white">
                <v-list-tile-title color = "white">{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
import router from '../router';
export default {
    name: 'NavigationBar',
    data() {
        return {
            showDrawer: false,
            items: [
              { title: 'Scheduling Calendar', icon: 'dashboard', path: "/scheduler" }
            ],
            dialog: false
        }
    },
    methods:{
        homeRedirect(){
            router.push('/home');
        },
        registerRedirect(){
            router.push('/register');
        }
    },
    mounted: function () {
        var d = $('.v-navigation-drawer')
        d.css('top', document.getElementById('titleBar').offsetHeight)
    }
}
</script>

<style scoped>
.title-style{
    cursor: pointer;
}
.bar-style{
    width: 100%;
}
</style>
