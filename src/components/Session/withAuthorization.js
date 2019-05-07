import React from 'react';
import { withFirebase } from '../Firebase/context';
import { SignInForm } from '../SignIn';
import { goTo } from 'route-lite';
import AuthUserContext from './context';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            goTo(SignInForm, null);
          }
        },
      );
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return withFirebase(WithAuthorization);

};

export default withAuthorization;