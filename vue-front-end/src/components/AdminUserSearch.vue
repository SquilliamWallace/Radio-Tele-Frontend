<template dark>
    <v-dialog v-model="advSearch" persistent max-width="600px">
      <v-btn slot="activator" class="mt-3" dark>Adv. Search</v-btn>

      <v-card>
        <v-container align-content-center>
            <span  class="headline">Advanced User Search</span>
        </v-container>
        <v-card-text>
          <v-container grid-list-md>
              <v-layout row>
              <v-flex xs6>
                <v-container fluid>
                    <v-checkbox label="First "></v-checkbox>
                    <v-checkbox label="Last Name"></v-checkbox>
                    <v-checkbox label="Email"></v-checkbox>
                    <v-checkbox label="Company"></v-checkbox>
                </v-container>
            </v-flex>
             <v-flex xs6>
                <v-container fluid>
                    <v-text-field
                        label="Search"
                    ></v-text-field> 
                </v-container>
                <v-container>
                    <v-btn @click="advSearch=false" color="Red" dark >Cancel</v-btn>
                    <v-btn color="Green" dark >Search</v-btn>
                </v-container>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import { error } from 'util';
import router from '../router';
import HttpResponse from '../utils/HttpResponse';
import ApiDriver from "../ApiDriver";

export default {
    data() {
        return {
           advSearch: false, 
        }
    },

    props: {
        
    },

    methods: {
        

    }
}
</script>

<style scoped>

</style>