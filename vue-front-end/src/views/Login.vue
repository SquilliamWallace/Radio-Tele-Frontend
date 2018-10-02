<template>
    <div id = "login"> 
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
    </div>
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
        width: 400px;
    }
</style>