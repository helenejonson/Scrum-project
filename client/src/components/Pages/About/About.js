import React, {Component} from 'react';

import Footer from '../../Footer/Footer'
import NavbarMainPage from '../../Navbar/NavbarMainPage'
import NavBar from "../../Navbar/Navbar";
import '../../../css/About.css'
import {auth, authenticate} from "../../../service/UserService";


// About, will be called by the "om" link in the footer

class About extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        authenticate();
        console.log(auth.authenticated);
        if (auth.authenticated) {
            this.setState({
                loggedIn : true
            })
        }
    }

    render() {
        return (
            <div class="pageSetup">
                {this.state.loggedIn === true ? <NavBar />: <NavbarMainPage />}
                <div id='AboutMain'>
                    <h3>Harmoni</h3>
                    <p id="aboutText">
                        Harmoni er en webaplikasjon som har til formål å forenkle informasjonsdeling for dem som arrangerer arrangementer. Systemet er koblet
                        opp mot en database som gjør at alle arrangører får samme oppdaterte informasjon til enhver tid og hvor som helst med nett. Både på PC og mobil.
                        Kos deg med oversikt og kommunikasjon.
                    </p>

                    <div id="links">
                        <h4>Følg oss:</h4>
                        <div id="link">
                            <a id="logos" href="https://www.sukkerhuset.no/">
                                <img alt="Sukkerhuset" src="https://uploads-ssl.webflow.com/5de46d09d41c9b2ee3cf98ab/5de78539524e509d2af37698_favicon-new.png"
                                     width="30" height="30"/>
                            </a>
                        </div>
                        <div id="link">
                            <a id="logos" href="https://www.facebook.com/Sukkerhuset/">
                                <img alt="Facebook logo" src="https://www.facebook.com/images/fb_icon_325x325.png"
                                     width="30" height="30"/>
                            </a>
                        </div>
                        <div id="link">
                            <a id="logos" href="https://www.instagram.com/sukkerhuset/">
                                <img alt="Istagram logo" src="http://vollgard.no/wp-content/uploads/2016/02/instagram-logo-vector-png-7-300x294.png"
                                     width="30" height="30"/>
                            </a>
                        </div>
                    </div>

                    <div id="aboutEventViewMap">
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe width="500" height="500" id="gmap_canvas"
                                        src={"https://maps.google.com/maps?q=sukkerhuset%2C%20Trondheim&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                                        frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                                <a href="https://www.embedgooglemap.net/blog/nordvpn-coupon-code/"></a>
                            </div>
                        </div>
                    </div>
                </div>



                <Footer/>
            </div>
        );
    }
}

export default About;