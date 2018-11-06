<template>
    <div>
        <v-progress-circular
            class="circle-style"
            indeterminate
            color="primary"
        ></v-progress-circular>
        <h3 style="color:white;">Loading...</h3>
    </div>    
</template>

<script>
export default {
    name: "Loading"
}
</script>

<style scoped>
.circle-style{
    margin: 1rem;
}
</style>
