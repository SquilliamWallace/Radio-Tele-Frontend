<template>
    <v-dialog class="alert-modal" width="50%" dark :value="value" persistent>
        <v-card>
            <v-card-title class="headline">This is a private event.</v-card-title>
            <v-card-text>You are not the event owner. The owner of this event has selected to make this private. Please select a public event that is blue, or select your own event.</v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" @click.native="toggleModal">Ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "PrivateEvent",
    props: {
        value: false
    },
    methods: {
        toggleModal() {
            this.confirmation = !this.confirmation
            this.$emit('input');
        }
    }
}
</script>

<style scoped>
.alert-modal {
    width: 50%
}
</style>
