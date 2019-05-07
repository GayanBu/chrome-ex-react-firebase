import React from 'react';
import Router from 'route-lite';
import Navigation from '../Navigation';
import LandingPage from '../Landing'
import { withAuthentication } from '../Session';

const App = () => (
    <div className="App">
        <div className="container">
            <Navigation />
        </div>

        <Router>
            <div><LandingPage /></div>
        </Router>
    </div >
);
export default withAuthentication(App);