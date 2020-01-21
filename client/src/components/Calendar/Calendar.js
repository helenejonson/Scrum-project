//import React from 'react'
import listPlugin from '@fullcalendar/list';

import * as React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import '../../css/Calendar.css';
import { createHashHistory } from 'history';
import './main.scss'
import NavbarMainPage from "../Navbar/NavbarMainPage";
import {eventService} from "../../service/EventService";
import {confirmAlert} from "react-confirm-alert";
import Footer from "../Footer/Footer";
import {auth, authenticate} from "../../service/UserService";
import Navbar from "../Navbar/Navbar";

const history = createHashHistory();

export default class Calendar extends React.Component {
    check;
    size;

    constructor(props) {
        super(props);
        this.state = {
            events: [
                {id: 1, title: "one", date: "2020-01-21"},{id: 2, title: "to", date: "2020-01-22"},{id: 3, title: "Tre", date: "2020-01-23"}
            ],
            width: 0, 
            height: 0

        }

    }


    componentDidMount() {
        authenticate();
        if (auth.authenticated) {
            console.log("Er logget inn");
            this.check = true;
        }else{

            this.check = false;
            console.log("Er ikke logget inn");
        }
        let list = [];
        eventService.getAllActive().then(events => {
            events.map(item => list.push({id: item.event_id, title: item.name, date: this.formatDate(item.date)}))
            console.log(list);
            this.setState({
                    events: list
                }
            )}).catch(error => console.error(error.message));
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        console.log(this.state.width);
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    formatDate(backendDate) {
        let tempDate = backendDate;
        let year = tempDate.slice(0, 4);
        let month = tempDate.slice(5, 7);
        let date = tempDate.slice(8, 10);
        let hours = tempDate.slice(11, 13);

        let thisDate = new Date(year + "-" + month + "-" +date +" " + hours +":00:00");
        thisDate.setHours(thisDate.getHours()+1);


        year = thisDate.getFullYear();
        month = thisDate.getMonth()+1;
        if(month < 10) month = "0" + month;
        date = thisDate.getDate();
        if(date < 10) date = "0" + date;

        return year + "-" + month + "-" + date;
    }

    render() {
        this.size = window.innerWidth;
        let myEvents = this.state.events;
        let def;
        if(this.size > 800){
            def = "dayGridMonth";
        }else{
            def = "listWeek";
        }

        if(this.check){
            return (
                <div>
                    <Navbar/>
                    <div id="CalendarShowDiv">
                        <FullCalendar
                            id="fullCalendar"
                            defaultView={def}
                            plugins={[listPlugin , dayGridPlugin, interactionPlugin]}
                            header={{
                                left: 'prev,next today',
                                center: 'title',
                                right: ''
                            }}
                            eventLimit={true}
                            events={myEvents}
                            eventClick={function (calEvent) {
                                confirmAlert({
                                    title: calEvent.event._def.title,
                                    buttons: [
                                        {
                                            label: 'Se arrangement',
                                            onClick: () => history.push("/event/public/" + calEvent.event._def.publicId)
                                        },
                                        {
                                            label: 'Se redigerbart arrangement',
                                            onClick: () => history.push("/event/" + calEvent.event._def.publicId)
                                        },
                                        {
                                            label: 'Avslutt'
                                        }
                                    ]
                                });
                            }}
                        />
                    </div>
                    <Footer/>
                </div>
            )
        }else{
            return(
            <div>
                <NavbarMainPage/>
                <div id="CalendarShowDiv">
                    <FullCalendar
                        id="fullCalendar"
                        defaultView={def}
                        plugins={[listPlugin , dayGridPlugin, interactionPlugin]}
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: ''
                        }}
                        eventLimit={true}
                        events={myEvents}
                        eventClick={function (calEvent) {
                            confirmAlert({
                                title: calEvent.event._def.title,
                                buttons: [
                                    {
                                        label: 'Se arrangement',
                                        onClick: () => history.push("/event/public/" + calEvent.event._def.publicId)
                                    },
                                    {
                                        label: 'Avslutt'
                                    }
                                ]
                            });
                        }}
                    />
                </div>
                <Footer/>
            </div>
            )
        }
    }
}


