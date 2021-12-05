<template>
    <v-app>
        
        
        <!-- 
            linked component: NavigationBar.vue
            Display Nav Bar at top of Page 
        -->
        <navigation-bar></navigation-bar>
        
        
        <!-- 
            linked component: ChooseTelescope.vue
            If variable tele is true, display modal to choose which tele to grab information for
            If variable tele is false, dont display modal
            @chosen, is what is used to call changeTelescope method from inside the modal screen
        -->
        <choose-telescope ref="choose" v-model="tele" @chosen="changeTelescope"></choose-telescope>
        
        
        <!-- 
            If store variable lodaing is true
                display the nice loading screen
            Else 
                display content of page
        -->
        <loading v-show="$store.state.isLoading"></loading>
        
        <v-app v-show="!$store.state.isLoading" light>
            
            <!-- 
                Display the name of the telescope at the top of the page
                Display Large text to make sure viewer is aware of which tele they are looking at
            -->
            <h1 justify-center>{{ telescopeName }}</h1>
            
            
            <!-- 
                Button to toggle boolean to display the choose telescope modal.
            -->
            <v-btn dark v-show="!this.tele" v-on:click="toggleChooseTelescope" ripple>Change Telescope</v-btn>
            <v-btn dark v-show="!this.tele" @click="createEvent">Schedule Appointment</v-btn>
            
            
            <!-- 
                linked component: FullCalendar.vue (found in node_modules)
                Vue Full Calendar Docs: https://fullcalendar.io/docs
                Because we are importing the full-calendar node module We have to add the appropriate parameters to the call
                to allow us to change the config of the default callendar.
                @event-created="createDragEvent" {
                    whenever an event is created by dragging and dropping on the calendar, call the method createDragEvent
                }
                @event-selected="openEvent" {
                    this says that whenever an event is clicked, call the openEvent method
                }
                :events="events" {
                    this binds the events to display on the node module calendar to the events listed in this.events on this page.
                }
                :header="header" {
                    allows us to set our own custom header for the callendar view, instead of using the default config.
                    look at header: in the data() section to see what is being bound here.
                }
                @view-render="changedViews" {
                    this says that whenever the view changes in the calendar, call the method changedViews()
                }
                id="calendar" {
                    this allows us to call the calendar by id and get information about it inside of our methods.
                }
            -->
            <full-calendar @change-telescope="toggleChooseTelescope" @event-created="createDragEvent" @event-selected="openEvent" :events="events" :header="header" @view-render="changedViews" id="calendar"></full-calendar>
            
            <v-layout justify-center>
                <!-- 
                    linked component: Appointment.vue
                    
                    :dragEvent="event" {
                        :dragEvent is a prop in Appointment, and "event" is passed to the Appointment
                        to handle auto populating the form on the create-appointment modal. Only used
                    }
                    :telescopeName="telescopeName" {
                        :telescopeName is a prop in Appointment, and the value
                        in the local telescopeName data object is passed to it
                    }
                    v-model="openCreateModal" {
                        this.openCreateModal: boolean
                        displays modal only if openCreateModal is set to true
                    }
                    @created-event="createdEvent" {
                        allows for the modal to call the method createdEvent() with the function this.$emit("created-event")
                    }
                    close-modal="openCreateModal = false" {
                        sets this.openCreateModel to false, to make the modal not display
                    }
                -->
                <create-appointment :dragEvent="event" :telescopeName="telescopeName" v-model="openCreateModal" @request-appointment="requestAppointment" @created-event="createdEvent" v-on:close-modal="openCreateModal = false"></create-appointment>

                <!-- 
                    linked component: RequestAppointment.vue
                    
                    :Appointment="requestApt"
                        Appointment is a prop in the component RequestAppointment
                        requestApt is the Obj being passed in to the prop
                    v-model="openRequestModal"
                        Boolean check to display the modal or not
                    
                    v-on:close-modal="openRequestModal = false"
                        if the modal is closed, set the boolean variable openRequestModal back to false
                -->
                <request-appointment :Appointment="requestApt" v-model="openRequestModal" v-on:close-modal="openRequestModal = false"></request-appointment>
            </v-layout>
        </v-app>

        <!-- 
            linked component: PrivateEvent.vue
            Whenever a user clicks on a private event that they do not have access to
            this modal will pop up.
        -->
        <private-event v-model="privateEventModal"></private-event>
    </v-app>
</template>

<script type="application/javascript">
import {FullCalendar} from 'vue-full-calendar'
import NavigationBar from '../../components/utility/NavigationBar.vue'
import router from '../../router'
import moment from 'moment'
import CreateAppointment from '../../components/appointment/Appointment.vue'
import ApiDriver from '../../ApiDriver'
import HttpResponse from '../../utils/HttpResponse'
import CurrentUserValidation from '../../utils/CurrentUserValidation'
import $ from 'jquery'
import PrivateEvent from "../../components/appointment/PrivateEvent"
import Loading from "../../components/utility/Loading"
import ChooseTelescope from "../../components/appointment/ChooseTelescope"
import RequestAppointment from "../../components/appointment/RequestAppointment"

export default {
    title: "Radio Telescope 1.1.0",
    name: 'Scheduler',
        data() {
        return {
            // Set default variables for page here
            events: [],
            event: {},
            requestApt: {},
            openCreateModal: false,
            openRequestModal: false,
            privateEventModal: false,
            tele: true,
            telescopeId: "",
            telescopes: [
                "John C. Rudy County Park", 
                "Scale Model",
                "Virtual"
            ],
            telescopeName: '',

            /* 
                This is the header bound to the FullCalendar.vue component
                info for header input: https://fullcalendar.io/docs/header
            */
            header: {
                left:   'prev,next today',
                center: 'title',
                right:  'month,agendaWeek,agendaDay'
            }
            /*
            This is to add a custom button to calendar menu bar.
            Currently unable to actually implement as the calendar is a node imported and so cannot call any function on the page with this.<function name>()
            Leaving the set up for it in if just in case it becomes useful in the future.
            Will have to add 
            :customButtons="customButtons" 
            into the <full-calendar></full-calendar> in the template section as well
            EXAMPLE HEADER TO DISPLAY CUSTOM BUTTON
            header: {
                left:   'prev,next changeTele today',
                center: 'title',
                right:  'month,agendaWeek,agendaDay'
            },
            customButtons: {
                changeTele: {
                    text: "Change Telescope",
                    click: function() {
                        
                    },
                    id: "changeTele"
                }
            }
            */
        }
    },
    // These are the components used in the rendering.
    components: {
        FullCalendar,
        NavigationBar,
        CreateAppointment,
        PrivateEvent,
        Loading,
        ChooseTelescope,
        RequestAppointment
    },
    // Functions used on this page, called by other functions or called by components loaded on page
    methods: {
        // This method is called whenever someone clicks an event on the calendar
        openEvent(event) {
            // If event is public redirect to event view page
            if (event.public) {
                router.push('/appointments/' + event.id + "/view" )
            
            // If event is private; check if viewer is admin, or event owner
            // If so take to event view page
            } else if (this.$store.state.isAdmin || (this.$store.state.currentUserId == event.userId)){
                router.push('/appointments/' + event.id + "/view" )
            // If event is private and viwer not admin or owner: display Private Event modal
            } else {
                this.privateEventModal = true;
            }
        },
        
        // This method is called when the Schedule Appointment button is pressed
        createEvent: function(Obj) {
            // Reset the event to avoid errors when multiple appointments are made in a single session
            this.event = {};

            // Display the create-appointment modal
            this.openCreateModal = true;
        },

        // This method is called when a drag and drop event is created
        createDragEvent: function(Obj) {
            // this.event is the obj that is passes to the CreateEvent Modal, so set its variables based on the Obj form calendar
            this.event.allDay = Obj.allDay

            // Properly format the time and date before we pass it to the create-modal
            this.event.startTime = moment(Obj.start).format('HH:mm');
            this.event.startDate = moment(Obj.start).format('YYYY-MM-DD')
            this.event.endTime = moment(Obj.end).subtract(1, 'minute').format('HH:mm'); // Subtract 1 minute to avoid overlapping
            this.event.endDate = moment(Obj.end).format('YYYY-MM-DD')

            // Set openCreateModal to true so that Appointment.vue component displays
            this.openCreateModal = true;
        },

        // This method is called from inside the Appointment.vue modal if an appointment request to be scheduled 
        // comes back with an ALLOTTED_TIME error. 
        // Passes the obj of the appointment trying to be made into the RequestAppointment.vue modal
        requestAppointment: function(Obj) {
            this.requestApt = Obj
            this.openRequestModal = true
        },
        // Toggles this.tele to display and close the ChooseTelescope.vue component
        toggleChooseTelescope() {
            this.tele = !this.tele
        },
        // This is the method used to add the newly created event to the calendar without
        // having to recall the back-end system to retrieve all the data over again.
        // This method is called from withing the Appointment.vue compnonet
        createdEvent: function(data, id) {
            // Because this can only be called from the viewer creating an event
            // set the event to display as the viewers event; with appropriate data displaying
            var event = {
                title: "Your Observation",
                backgroundColor: "green",
                id: id,
                end: new Date(data.endTime),
                public: data.isPublic,
                secondary: data.isSecondary,
                start: new Date(data.startTime),
                telescopeId: data.telescopeId,
                userId: data.userId,
                editable: false,
                draggable: false
            }
            
            // This checks that the viewer scheduled the event for the telescope they are looking at currently
            // If so add it to the this.events to be displayed; Else do nothing
            if (this.telescopeId == event.telescopeId){
                this.events.push(event)
            }
        },
        // Helper function to make sure we do not duplicate any events in this.events when populating data
        clearEvents: function() {
            this.events.length = 0
        },
        // This method is called anytime the view of the calendar changes
        changedViews: function() {
            // If the telescopeId is set, that means a viewer is looking for data on that telescope
            // Call funciton populateDataBetweenData(this.telescopeId) to get the data they are wanting to display
            // Else they have not selected any telescope and do not try grabbing data from a null reference
            if( this.telescopeId != "") {
                this.populateDataBetweenDates(this.telescopeId, false)
            }
        },
        /*
            This is a the function called when submit is called on choose-telescope modal
            It passes an empty array to overwrite the current this.events array to be empty.
            Then calls populateDataBetweenDates() to repopulate the data for the new telescope view
        */
        changeTelescope: function(telescopeId, array) {
            this.events = array
            this.populateDataBetweenDates(telescopeId, true)
        },
        // This method is what is used to populate the data on the calendar
        /*
            This method does as its names, grabs the data of event for between two dates
            The dates it grabs between is set by the calendar view,
                So if you are in month view, it grabs a month of data at a time, 
                If you are in week view it grabs just a weeks worth of data, 
                If day view, only one days worth of data
            When the calendar view changes (I.E. someone moves forward to the next month/week/day)
            This function is called again to get the new data to display between the new dates.
            Pros:
                Less bulk of data being sent back from the back end. Quick load times
            Cons:
                Fetching data from back end each time the view changes for each user. 
                If moved forward one week then backwards one week, it calls fetch data each change. No Cache implemented at this time.
                    Cache can be usefull but also prove a problem due to if a new event was scheduled, it wouldnt populate if using a cache. 
        */
        populateDataBetweenDates: function(id, initial) {
            // call helper function
            this.clearEvents()
            
            // Get the view of the calendar, so we know what dates to grab data between
            var calendar = $('#calendar')
            var vue = $('#calendar').fullCalendar('getView')
            // Set the data to send to the back end.
            /*
                id is the telescopeID
                vue.start is a moment Object of the first date viewable in the view
                vue.end is a moment Object of the last date viewable in the view
            */
            //updated how time is being formatted, split on "T"
            var startTime = new Date(vue.start).toISOString();
            var endTime = new Date(vue.end).toISOString();
            let startTimeIndexOfT = startTime.indexOf("T");
            let endTimeIndexOfT = endTime.indexOf("T");
            let data = {
                telescopeId: id,
                startTime: startTime.substring(0, startTimeIndexOfT),
                endTime: endTime.substring(0, endTimeIndexOfT)
            }
            // Set the $store variable loading to true to display loading screen, as we call the backend and wait for response
            this.$store.commit("loading", true)
            // This sets the telescopeId of the page to the id. Used for initializing the data of this.telescopeId when they first choose a telescope to view
            // is setting itself to itself if populateDataBetweenDates() is called from changedViews()
            this.telescopeId = id
            // Get the name of the telescope based on the telescopeId, to display at top of page
            this.telescopeName = this.telescopes[id-1] + " Radio Telescope"
            // Call back-end Api with data set above.
            ApiDriver.Appointment.listAppointmentsBetweenDates(data).then((response) => {
                HttpResponse.then(response, (data) => {
                        // For each event sent back from back-end
                        for (var index in response.data.data) {
                            // Set elemt to equal the event data
                            var element = response.data.data[index]
                            var backgroundColor= "";
                            var title = "";
                            
                            // If you are the owner of the event display "Your Observation" as title and make background color Green
                            if (element.userId == this.$store.state.currentUserId) {
                                if(element.priority == "Secondary") {
                                    title = "Your Secondary Observation";
                                } else {
                                    title = "Your Observation";
                                }
                                backgroundColor = "green";
                            }
                            // If the appointment is secondary, set it to purple! 
                            else if (element.priority == "Secondary") {
                                title = "Secondary Observation";
                                backgroundColor = "purple";
                            }
                            // If you are not the owner, and it is a public event: set background color to default and the title to the name of the owner
                            else if (element.public) {
                                backgroundColor = "";
                                title = element.userFirstName + " " + element.userLastName;
                            } 
                            // If private event set background color to black
                                // If viewer is an admin, still display the owner information of the event
                                // Else set the title to "Private Observation"
                            else {
                                backgroundColor = "black";
                                if (this.$store.state.isAdmin) {
                                    title = element.userFirstName + " " + element.userLastName;
                                } else {
                                    title = "Private Observation"
                                }
                            }

                            // console.log(element);
                            
                            // Set an eventData object with appropriate fields for calendar
                            var eventData = {
                                title: title,
                                start: new Date(element.startTime),
                                end: new Date(element.endTime),
                                backgroundColor: backgroundColor,
                                id: element.id,
                                telescopeId: element.telescopeId,
                                userId: element.userId,
                                public: element.public,
                                editable: false,
                                draggable: false
                            }
                            
                            // Push the event to this.events to be rendered.
                            if(element.priority == "Secondary" && !this.$store.state.isAdmin) {

                            } else {
                                this.events.push(eventData);
                            }
                            
                        }
                        // Set the $store.loading to false to switch back to displaying content of page.
                        this.$store.commit("loading", false);
                        /*
                            THIS IS A PATCH WORK TO GET THE INTIAL LOADING OF EVENTS TO DISPLAY CORRECTLY
                            Will need to figure out why the initial call doesnt function the same as every
                            other call and fix the root reason later. But this will force the calendar to 
                            render all events on the initial page.
                        */
                        if (initial) {
                            for (event in this.events) {
                                calendar.fullCalendar('renderEvent', this.events[event])
                            }
                        } 
                    }, (status, errors) => {
                        // If there were errors in the back end call display an error pop up
                        if (parseInt(status) === 403) {
                            this.$swal({
                            title: '<span style="color:#f0ead6">Error!</span>',
                            html: '<span style="color:#f0ead6">Access Denied</span>',
                            type: 'error',
                            background: '#302f2f'
                        }).then(response => {
                            // If there was an error, verify that User has not tried changing this.$store by validation
                            CurrentUserValidation.validateCurrentUser(this.$store);
                        });
                        }
                        // Set Loading to false, to not leave loading screen up
                        this.$store.commit("loading", false);
                    })
            });
            
        }
    },
    mounted: function() {
        this.$store.commit("updateInfo", {page: "Scheduling Calendar", info: "Select a telescope with which you would like to schedule\n an appointment. Click the 'Schedule Appointment' button at\n the top of the page to schedule time with the currently\n selected telescope. The arrows in the top-left can be used to\n change between months/weeks/days, and the buttons in\n the top right will change the current view of the\n calendar."})
    }
}
</script>


<style scoped>
.loading-dialog {
   background-color: #303030; 
}
/* 
    Set the padding of top left and right to 2% so calendar isnt right up against edge of browser.
*/
#calendar {
    padding: 2% 2% 0% 2%;
}
</style>