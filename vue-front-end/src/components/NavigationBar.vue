<template>
<div>
    <v-toolbar class="bar-style" id="titleBar">
      <v-toolbar-side-icon @click="showDrawer=!showDrawer"></v-toolbar-side-icon>    
      <v-toolbar-title class="title-style" @click="homeRedirect">YCAS Radio Telescope</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn @click="viewProfile">Profile</v-btn>
          <v-btn @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- Define drawer menu and populate it with items-->
    <v-navigation-drawer :temporary=true :floating=true :hide-overlay=true style="max-height:300px; position:absolute;" v-model="showDrawer">
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
import ApiDriver from '../ApiDriver'
export default {
    name: 'NavigationBar',
    data() {
        return {
            showDrawer: false,
            items: [
              { title: 'Scheduling Calendar', icon: 'dashboard', path: '/scheduler' },
              { title: 'Administration', path: '/admin' },
              { title: 'Public Appointments', path: '/appointments/public' },
              { title: 'Completed Appointments', path: '/users/' + this.$store.state.currentUserId + '/appointments/completed' },
              { title: 'Future Appointments', path: '/users/' + this.$store.state.currentUserId + '/appointments/future' },
            ]
        }
    },
    methods: {
        homeRedirect(){
            if (this.$store.state.currentUserId){
                router.push('/home')
            }
            else{
                router.push('/')
            }
        },
        submit() {
            ApiDriver.login(this.data);
        },
        viewProfile() {
            router.push('/users/' + this.$store.state.currentUserId + '/view')
        },
        logout() {
            ApiDriver.logout();
            this.$store.commit("logout");
            router.push('/');
        }
    },
    mounted() {
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
