/* copied code from internet that made a basic button and calls the backend to verify/save user data*/

import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
    // create a global state called cookie that keep track if user session
  }

  logout = () => {
   /* 
    this.setState({isAuthenticated: false, token: '', user: null})
    var headers = {
      Access_token: this.state.token
    };
    axios.get({url: 'http://localhost:8080/users/test', headers: headers, withCredentials: false // default
    }).then(r=> {
      console.log(r.data);
    })
    */
    this.getData();

  };

  getData = () => {
    
    const headers = new Headers();
    headers.append("Access_token", this.state.token);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

var url = new URL('http://localhost:8080/users/test')

var params = {lat:35.696233, long:139.570431} // to pass parameters when doing fetch req

url.search = new URLSearchParams(params)

    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      dataType: 'json',
      headers: {
        'Authorization': this.state.token, 
        'Content-Type': 'x-auth-token',
        'Accept': 'application/json',
        'x-access-token': this.state.token,
      },
    };
    fetch(url, options)
    .then(r => r.json())
    .then(r => {
      console.log(r);
    })
    .catch(error => console.log('parsing failed', error))
    
/*
    const tokenBlob = new Blob([JSON.stringify({access_token: this.state.token}, null, 2)], {type : 'application/json'});
    console.log('token: ', this.state.token);
        console.log('user: ', this.state.user);

    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:8080/users/test', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.setState({isAuthenticated: true, user: user, token: user.googleProvider.token})
        }
      });
    })
  */
  }

  onFailure = (error) => {
    console.log(error);
    alert(error);
  }

  // calls backend and sends google response ie email and account number
  googleResponse = (response) => {
    console.log('access token', response.accessToken);
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    console.log('blob: ', this.state.token);
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
          console.log('jwt token: ', token);
          this.setState({isAuthenticated: true, user: user, token: token})
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
        {content}
      </div>
    );
  }
}

export default App;
