<template>
    <v-app>
        <v-container style="{ padding:'50px' }">
            <v-card flat>
                <v-form>
                    <v-container grid-list-xl fluid>
                        <v-flex xs12 sm6>
                            <v-text-field
                                v-model="profile.firstName"
                                label="First Name"
                                required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                v-model="profile.lastName"
                                label="Last Name"
                                required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                v-model="profile.email"
                                label="Email Address"
                                required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                v-model="profile.phone"
                                label="Phone Number (Optional)">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                v-model="profile.company"
                                label="Company Affiliation (Optional)">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                v-model="profile.type"
                                :items="types"
                                label="User Type"
                                required>
                            </v-select>
                        </v-flex>
                    </v-container>
                    <v-card-actions>
                        <v-btn @click="cancelEdit">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit">Save</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import router from '../router';
export default {
    name: 'EditProfile',
    data() {
        return {
            profile: {
                firstName: "Patrick",
                lastName: "Star",
                email: "patStar@gmail.com",
                phone: "717-887-4339",
                company: "Crusty Crab",
                type: "Student"
            },
            types: ['Guest', 'Member', 'Student', 'Researcher'],
        }
    },
    methods: {
        cancelEdit() {
            router.go(-1);
        }
    }
}
</script>

<style scoped>

</style>
