import React from 'react';
import { Link } from 'route-lite';
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
//import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link component={LandingPage} componentProps={{}}>Landing</Link>
    </li>
    <li>
      <Link component={HomePage} componentProps={{}}>Home</Link>
    </li>
    <li>
      <Link component={AccountPage} componentProps={{}}>Account</Link>
    </li>
    <li>
      <Link component={AdminPage} >Admin</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link component={SignInPage} componentProps={{}}>Sign In</Link>
    </li>
    <li>
      <Link component={LandingPage} componentProps={{}}>Landing</Link>
    </li>
  </ul>
);

export default Navigation;