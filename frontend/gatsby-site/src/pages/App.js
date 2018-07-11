/* copied code from internet that made a basic button and calls the backend to verify/save user data*/

import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';
import Link from "gatsby-link";

import logo from './logo.svg';
import './App.css';

class App extends Component {


  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
  }

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  onFailure = (error) => {
    console.log(error);
    alert(error);
  }

  // calls backend and sends google response ie email and account number
  googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:8080/users/auth/google', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.setState({isAuthenticated: true, user, token})
        }
      });
    })
  };

  render() {



    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
        </div>
          <div>
            <button onClick={this.logout} className="button">
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <div>
          <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
      );

    return (
      <div className="App">
        {content} {<Link to="/">Go back to the homepage</Link>}
      </div>

    );
  }
}

export default App

