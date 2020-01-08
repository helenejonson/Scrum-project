import React, {Component} from 'react';
import "../../css/Login_Form.css";
import {UserService} from "../../services/UserService.js"

class Login_Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            pw: ""
        }
    }


    // Submitting the values in state to a validate function to check if email/pw are valid.
    // If so, send the user to the home page/overview page.
    submit = (e) => {
        /*if(UserService.validate(this.state.email, this.state.pw)){

        }*/
        console.log("yo");
    }


    // Runs every time input-fields are updated. Updates the state with the most current values.
    updateInputValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        });
        //console.log(this.state);
    }

    render(){

        return(
            <form>
                <h1 id="login-title">Innlogging</h1>
                <div class="form-group" id="email-input-container">
                    <label for="email-input">E-post adresse</label>
                    <input type="email" class="form-control" id="email-input" placeholder="Skriv inn e-post" name="email" onChange={this.updateInputValue} />
                </div>
                <div class="form-group" id="password-input-container">
                    <label for="password-input">Passord</label>
                    <input type="password" class="form-control" id="password-input" placeholder="Skriv inn passord" name="pw" onChange={this.updateInputValue} />
                </div>
                <button type="button" class="btn btn-primary" id="login-button" onClick={this.submit}>Logg inn</button>
            </form>
        )
    }
}

export default Login_Form;