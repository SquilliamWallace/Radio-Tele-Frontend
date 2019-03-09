<template>
    <p>YEEEET</p>
</template>
<script>
import router from '../../router';
import ApiDriver from '../../ApiDriver';
import HttpResponse from '../../utils/HttpResponse';
import CurrentUserValidation from  '../../utils/CurrentUserValidation';
import Loading from "../../components/utility/Loading"
export default {
    name: 'CelestialBodies',
    data(){
        return{
            data: {
               
            },
            bodies: [],
           
        }
    },
    methods: {
        getCelestialBodies(){
             ApiDriver.CelestialBodies.getCBList(0,10).then((response) => {
                HttpResponse.then(response, data => {
                    console.log(data.data)
                    this.populateData(data.data)
                },(status, errors) => {})
             }).catch((error) => {
                 console.log(error)
                this.$swal({
                            title: '<span style="color:#f0ead6">Error!<span>',
                            html: '<span style="color:#f0ead6">An error occurred when loading the celestial bodies list<span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
            });
        },
        populateData(data){
            
            for (var index in data.content) {
                let body = data.content[index];
                this.bodies.push(body);
                //this.numPages = data.totalPages;
            }
            
        },
    },
    mounted: function(){
        this.getCelestialBodies();
    },
}
</script>
<style scoped>

</style>