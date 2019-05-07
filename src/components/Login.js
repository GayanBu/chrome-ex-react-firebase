import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //   email: "",
        //   password: ""
        // };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }
    onGoogleAuth() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // [START_EXCLUDE]
                document.getElementById('quickstart-button').textContent = 'Sign out';
                document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
                // [END_EXCLUDE]
            } else {
                // Let's try to get a Google auth token programmatically.
                // [START_EXCLUDE]
                document.getElementById('quickstart-button').textContent = 'Sign-in with Google';
                document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                document.getElementById('quickstart-account-details').textContent = 'null';
                // [END_EXCLUDE]
            }
            document.getElementById('quickstart-button').disabled = false;
        });
        // [END authstatelistener]

        document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);
    }

    render() {
        const config = {
            apiKey: 'AIzaSyDRwtblx__0b_Jx_lApsXqlDEfU8IEeHGM',
            databaseURL: 'https://smart-highlighter.firebaseio.com',
            storageBucket: 'smart-highlighter.appspot.com'
        };
        firebase.initializeApp(config);
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    {/* <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          > }
            Login
    </Button>*/}
                    <Button
                        block
                        bsSize="large"
                        onClick={this.onGoogleAuth()}>
                        Google Authenticaation
          </Button>
                </form>
            </div>
        );
    }
}
