<template dark>
    <v-dialog dark hide-overlay :value="value" @input="$emit('input')" persistent width="50%">
            <v-card flat>
                <v-card-title class="headline">Choose Telescope</v-card-title>
                <v-form ref="form" @submit.prevent="submit" refs="form">
                <v-container grid-list-xl fluid>
                    <v-flex xs12 sm6>
                        <v-select
                        v-model="telescopeName"
                        :items="telescopes"
                        color="blue darken-2"
                        label="Telescope"
                        required
                        ></v-select>
                    </v-flex>
                </v-container>
                <v-card-actions>
                    <v-btn
                    flat
                    color="primary"
                    type="submit"
                    >Submit</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        name: 'Telescope'
        return {
            telescopes: [
                "John Rudy Park",
                "Scale Model",
                "Virtual"
            ],
            telescopeName: ""
        }
    },
    props: {
        eventObj: {},
        value: false
    },
    methods: {
        submit() {
            var telescopeId = this.telescopes.indexOf(this.telescopeName) + 1
            this.$emit("chosen", telescopeId)
            this.$emit('input')
        }
    }
}
</script>

<style scoped>

</style>
