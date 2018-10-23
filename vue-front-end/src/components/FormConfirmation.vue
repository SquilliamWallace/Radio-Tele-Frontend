<template>
    <v-dialog class="confirmation-modal" width="50%" dark :value="value" @input="$emit('input')" persistent>
        <v-card>
            <v-card-title class="headline">Are you sure you wish to cancel?</v-card-title>
            <v-card-text>If you cancel, you will lose all progress on this form and will have to fill it out again.</v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="goBack">Yes</v-btn>
                <v-btn color="red darken-1" @click.native="toggleModal">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import router from '../router'
export default {
    name: "FormConfirmation",
    props: {
        value: false
    },
    methods: {
        goBack() {
            router.go(-1);
        },
        toggleModal() {
            this.confirmation = !this.confirmation
            this.$emit('input');
        }
    }
}
</script>

<style scoped>
.confirmation-modal {
    width: 50%
}
</style>
