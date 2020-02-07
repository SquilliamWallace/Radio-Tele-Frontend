<template>
<div id="parallax-wrap">
    <v-parallax style = "height:80%;" src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
    <v-spacer></v-spacer>
    
    <v-img src="https://media.istockphoto.com/photos/telescope-picture-id512605413?k=6&m=512605413&s=612x612&w=0&h=3qyaXj4JJOAY1hjNszpp5SCQFY3SUldFzervpQWz0gQ=" height="100px">
    
    </v-img>
        <v-layout align-center>
            <v-card>
            <v-card-title primary-title>
                <div style="padding: 25px;">
                <div class="headline">Welcome to the York County Astronomical Society Radio Telescope! LANDING PAGE!</div>
                <v-card-text class="grey--text">The York County Astronomical Society, Inc, is a non-profit organization dedicated to the advancement of the science of astronomy.

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
                <v-card-text class="grey--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rutrum tellus pellentesque eu tincidunt. Habitant morbi tristique senectus et 
                netus et malesuada. Arcu vitae elementum curabitur vitae. Turpis tincidunt id aliquet risus. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Id neque aliquam vestibulum morbi 
                blandit cursus risus. Maecenas ultricies mi eget mauris pharetra et ultrices. Placerat orci nulla pellentesque dignissim. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.

                Euismod in pellentesque massa placerat duis ultricies lacus sed. Ut tellus elementum sagittis vitae et leo. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Rhoncus aenean vel 
                elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Aliquam malesuada bibendum arcu vitae elementum. Laoreet id donec ultrices tincidunt arcu non sodales neque. Sociis natoque penatibus 
                et magnis dis. In nisl nisi scelerisque eu ultrices. Maecenas accumsan lacus vel facilisis volutpat. Massa id neque aliquam vestibulum. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper 
                velit. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Neque aliquam vestibulum morbi blandit cursus.

                Sociis natoque penatibus et magnis. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Pharetra sit amet aliquam id 
                diam maecenas ultricies. Vitae tortor condimentum lacinia quis vel. Eget est lorem ipsum dolor sit amet consectetur adipiscing. Massa sed elementum tempus egestas sed sed. Sed faucibus turpis in eu. 
                Et malesuada fames ac turpis egestas sed. Est ullamcorper eget nulla facilisi etiam dignissim diam. Est ullamcorper eget nulla facilisi etiam dignissim. Ac turpis egestas maecenas pharetra convallis. 
                Dictum non consectetur a erat nam at. Lectus vestibulum mattis ullamcorper velit sed ullamcorper. Cras pulvinar mattis nunc sed blandit libero volutpat sed. Cursus metus aliquam eleifend mi in. 
                Cras semper auctor neque vitae tempus quam pellentesque. Et magnis dis parturient montes nascetur ridiculus mus mauris vitae. Aenean euismod elementum nisi quis eleifend quam adipiscing.

                Congue mauris rhoncus aenean vel elit. Suscipit tellus mauris a diam maecenas sed. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Dui ut ornare lectus sit amet est placerat. 
                Pulvinar proin gravida hendrerit lectus. Malesuada fames ac turpis egestas maecenas. Pellentesque nec nam aliquam sem et tortor. Ut placerat orci nulla pellentesque dignissim enim sit. Diam quis enim 
                lobortis scelerisque fermentum dui faucibus. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Tempor nec feugiat nisl pretium fusce id velit ut. Libero nunc consequat interdum varius 
                sit amet mattis vulputate enim. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Tellus pellentesque eu 
                tincidunt tortor aliquam nulla facilisi. Massa sapien faucibus et molestie ac feugiat sed.

                Sed faucibus turpis in eu mi. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Dignissim suspendisse in est ante in nibh mauris. Tristique risus nec feugiat in fermentum posuere 
                urna. Non arcu risus quis varius quam quisque id. Nam at lectus urna duis. Nulla malesuada pellentesque elit eget gravida cum sociis. Nisi porta lorem mollis aliquam ut porttitor. Nam at lectus urna duis 
                convallis convallis tellus. Quisque egestas diam in arcu cursus. Molestie at elementum eu facilisis sed odio morbi. Consequat id porta nibh venenatis cras sed.

                </v-card-text>
                <v-flex>
                    <v-btn large block color="deep-purple" @click="submit">LOGIN</v-btn>
                </v-flex>
                </div>
            </v-card-title>
            </v-card>
        </v-layout>
    </v-parallax>
</div>
</template>

<script>
import ApiDriver from "../ApiDriver";
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import { error } from 'util';
export default {
  title: "Radio Telescope 1.1.0",
  name: "LandingPage",
  data() {
    return {
      show: false
    };
  },
  components: {
      
  },
  methods: {
      submit() {
          router.push("/login");
      }
  },
  mounted() {
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