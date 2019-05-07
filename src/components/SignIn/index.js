import React, { Component } from 'react';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase/context';
import { goTo } from 'route-lite';
import HomePage from '../Home';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
);

class TestButton extends Component {
  onSubmit = event => {
    event.preventDefault();
    // chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    //   function (tab) {
    //     chrome.tabs.sendMessage(tab[0].id, { method: "getSelection" },
    //       function (response) {
          
    //         console.log(response.data);
    //       });
    //   });

  };
  render() {
    return (
      <div>
        {/* <form onSubmit={this.onSubmit}>
          <button type="submit">Test Button</button>
          {error && <p>{error.message}</p>}
        </form> */}
      </div>
    )
  }
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        goTo(HomePage, null);
      })
      .catch(error => {
        this.setState({ error });
      });


  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  onSubmit = event => {
    event.preventDefault();
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {},
          });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        goTo(HomePage, null);
      })
      .catch(error => {
        this.setState({ error });
      });

  };
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


const SignInForm = withFirebase(SignInFormBase);

const SignInGoogle = withFirebase(SignInGoogleBase);

export default SignInPage;

export { SignInForm, SignInGoogle };