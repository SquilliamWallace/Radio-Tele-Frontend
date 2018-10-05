<template>

<v-container id = "loginBox" class = "elevation-15">
    <v-toolbar>
        <v-toolbar-title id = "toolbar">YCAS Radio Telescope</v-toolbar-title>
    </v-toolbar>
    <div id = "login"> 
        <v-form>
            <v-flex>
                <v-text-field
                    label="Email"
                    color=white
                ></v-text-field>
            </v-flex>
            <v-flex>
                <v-text-field
                    label="Password"
                    color=white
                ></v-text-field>
            </v-flex>
        </v-form>
        <v-btn flat id = "loginButton">Login</v-btn>
    </div>
</v-container>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login(){

        }
    }
}
</script>

<style scoped>
    #login {
        align-content: center;
    }
    #loginBox {
        border:rgb(83, 83, 83), 0 px;
        margin-top: 200px;
        width: 400px;
        height: 300px;
        background-color: black;
        border: 1px solid white
    }
    #toolbar {
        padding-left: 4rem;
    }
    #loginButton{
        margin-top: 15px;
    }
</style>