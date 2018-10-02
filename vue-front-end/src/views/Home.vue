<template>
<div>
    <v-parallax style = "height:100%;" src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
    <v-toolbar style="width:100%;">
          <v-menu
            v-model="menuShow"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x>
            <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
            <v-card>
            <v-list>
                <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img src="https://i.kym-cdn.com/entries/icons/original/000/009/803/spongebob-squarepants-patrick-spongebob-patrick-star-background-225039.jpg" alt="Patrick">
                </v-list-tile-avatar>
    
                <v-list-tile-content>
                    <v-list-tile-title>Patrick Star</v-list-tile-title>
                    <v-list-tile-sub-title>Founder of the Big Rock Club</v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>

                <v-spacer></v-spacer>
                <v-subheader inset>Navigation</v-subheader>
                <v-divider inset></v-divider>

                <v-list-tile-content style="padding-left: 10px;">
                    <v-list-tile-title>Link 1</v-list-tile-title>
                    <v-list-tile-sub-title>This will be a link</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-content style="padding-left: 10px;">
                    <v-list-tile-title>Link 2</v-list-tile-title>
                    <v-list-tile-sub-title>This, too, will be a link</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-content style="padding-left: 10px;">
                    <v-list-tile-title>Link 3</v-list-tile-title>
                    <v-list-tile-sub-title>And this also</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        </v-menu>
      <v-toolbar-title>YCAS Radio Telescope</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/login" flat>Login</v-btn>
        <v-btn to="/register">Register</v-btn>
        <v-btn to="/profile">Profile</v-btn>
      </v-toolbar-items>
    </v-toolbar>
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
export default {
    name: "Home",
    data() {
        return {
            menuShow: false,
            show: false
        }
    },
    methods: {
    }
}
</script>

<style scoped>

</style>

