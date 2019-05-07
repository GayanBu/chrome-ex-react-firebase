import React from 'react'
import { AuthUserContext} from '../Session';
import  withAuthorization  from '../Session/withAuthorization';

import PasswordForgetForm from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage)
