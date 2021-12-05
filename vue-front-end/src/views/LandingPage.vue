<template>
<div>
    <v-img height="300px"  src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
        <v-layout row>
          <v-flex>
            <v-img height="300px" position="left" style="opacity:.25" src="http://www.astroyork.com/img/YCAS2018b.jpg" contain="true"></v-img>
          </v-flex>
          <v-flex>
            <v-img height="300px" position="right" style="opacity:.25" src="http://www.astroyork.com/img/YCAS2018b.jpg" contain="true"></v-img>
          </v-flex>
        </v-layout>
    </v-img>
        <v-layout align-center>
            <v-card>
            <v-card-title primary-title>
                <div style="padding: 25px;">
                <div class="headline">Welcome to the York County Astronomical Society Radio Telescope!</div>
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
                  <!--  
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
                convallis convallis tellus. Quisque egestas diam in arcu cursus. Molestie at elementum eu facilisis sed odio morbi. Consequat id porta nibh venenatis cras sed. -->
                </v-card-text>

                <v-flex>
                    <v-btn large block color="deep-purple" @click="submit">LOGIN</v-btn>
                </v-flex>

                <v-card>
                  <div style="padding: 25px;">
                    <div class="headline">Here are some pictures of various aspects of the radio telescope </div>
                  </div>
                </v-card>
                
              <v-container grid text-xs-center>
                <v-layout row>
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="http://www.astroyork.com/img/JS/9.jpg" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           YCAS member Jim Smailing has taken some excellent pictures of the eclipsing Moon. 
                           These pictures were taken with the combination of a Motorola E5 plus cellphone, 
                           a Vankey cellphone telescope adapter mount, and an Orion ultrascopic 5mm eyepiece 
                           all attached to an Orion Skywatcher 120 f/8 acromatic refractor on an EG-3 equatorial 
                           mount with an Orion EQ-3M single axis drive. The first six photos were taken with a #15 
                           yellow glass filter attached to the eyepiece.
                          </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnIpIFMmJvFvQUv6wWmBCxdFFBVdC2SjBgR0lTJwFp-QJBi6Mr" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                          </v-card-text>
                      </v-card>
                    </v-flex>  
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="http://www.astroyork.com/img/JS/11.jpg" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           YCAS member Jim Smailing has taken some excellent pictures of the eclipsing Moon. 
                           These pictures were taken with the combination of a Motorola E5 plus cellphone, 
                           a Vankey cellphone telescope adapter mount, and an Orion ultrascopic 5mm eyepiece 
                           all attached to an Orion Skywatcher 120 f/8 acromatic refractor on an EG-3 equatorial 
                           mount with an Orion EQ-3M single axis drive. The first six photos were taken with a #15 
                           yellow glass filter attached to the eyepiece.
                          </v-card-text>
                      </v-card>
                    </v-flex>   
                </v-layout>
                <v-layout row>
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                          </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="https://ycas.github.io/img/Observatory.jpg" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           This is the York County Astronomical Society Observatory. This is the York County Astronomical Society Observatory. 
                           This is the York County Astronomical Society Observatory. This is the York County Astronomical Society Observatory. 
                           This is the York County Astronomical Society Observatory. This is the York County Astronomical Society Observatory. 
                          </v-card-text>
                      </v-card>
                    </v-flex>  
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="https://cdn7.allevents.in/banners/118f95d0-4a3b-11ea-be32-af02df26b8fe-rimg-w525-h350-gmir.jpg?v=1581142815" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                          </v-card-text>
                      </v-card>
                    </v-flex>   
                </v-layout>
                <v-layout row>
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="http://www.astroyork.com/img/JS/10.jpg" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           This is the York County Astronomical Society Observatory. This is the York County Astronomical Society Observatory. 
                           This is the York County Astronomical Society Observatory. This is the York County Astronomical Society Observatory. 
                           This is the York County Astronomical Society Observatory. This is the York County Astronomical Society Observatory. 
                          </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="https://pxl-ycpedu.terminalfour.net/518x345/prod01/www.ycp.edu/htdocs-media-only/media/york-website/engineering-and-computer-science/facilities/Engineering-FacilityKinsley2013-YCP1.jpg" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           This is the Kinsley Engineering Center. This is the Kinsley Engineering Center. This is the Kinsley Engineering Center. 
                           This is the Kinsley Engineering Center. This is the Kinsley Engineering Center. This is the Kinsley Engineering Center.
                           This is the Kinsley Engineering Center. This is the Kinsley Engineering Center. This is the Kinsley Engineering Center.
                          </v-card-text>
                      </v-card>
                    </v-flex>  
                    <v-flex>
                      <v-card dark class="ma-1 pa-2" hover="true" ripple="true" max-width="600px">
                          <v-img height="500px" src="https://media.istockphoto.com/photos/telescope-picture-id512605413?k=6&m=512605413&s=612x612&w=0&h=3qyaXj4JJOAY1hjNszpp5SCQFY3SUldFzervpQWz0gQ=" contain="true"></v-img>
                          <v-card-text class="grey--text">
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                           This is a placeholder image. This is a placeholder image. This is a placeholder image.
                           This is a placeholder image. This is a placeholder image. This is a placeholder image. 
                          </v-card-text>
                      </v-card>
                    </v-flex>   
                </v-layout>
              </v-container>

              </div>
            </v-card-title>
            <v-footer padless height="40px" fixed="true">
                <v-card-text class="grey--text">
                  York County Astronomical Society
                </v-card-text>
            </v-footer>
            </v-card>
        </v-layout>
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