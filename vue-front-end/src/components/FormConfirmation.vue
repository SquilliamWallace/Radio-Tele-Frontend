<template>
    <v-dialog max-width="250px" dark v-model="confirmation" persistent>
        <v-card>
            <v-card-title class="headline">Are you sure you wish to cancel?</v-card-title>
            <v-card-text>If you cancel, you will lose all progress on this form and will have to fill it out again.</v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" @click="toggleModal">No</v-btn>
                <v-btn color="green darken-1" @click="goBack">Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import router from '../router'
export default {
    name: "FormConfirmation",
    props: {
        confirmation: false
    },
    methods: {
        goBack() {
            router.go(-1);
        },
        toggleModal() {
            this.confirmation = !this.confirmation
        }
    }
}
</script>

<style scoped>

</style>
