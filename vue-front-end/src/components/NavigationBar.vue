<template>
<div>
    <v-toolbar class="bar-style">
      <v-toolbar-side-icon @click="showDrawer=!showDrawer"></v-toolbar-side-icon>    
      <v-toolbar-title class="title-style" @click="homeRedirect">YCAS Radio Telescope</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/login" flat>Login</v-btn>
        <v-btn to="/register">Register</v-btn>
        <v-btn to="/profile">Profile</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer hide-overlay="true" style="max-height:200px;" v-model="showDrawer">
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
        }
    },
    methods:{
        homeRedirect(){
            router.push('/home');
        }
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
