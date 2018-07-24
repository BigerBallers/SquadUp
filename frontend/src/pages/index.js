/* copied code from internet that made a basic button and calls the backend to verify/save user data*/

import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';
import Link from "gatsby-link";
import { Redirect } from 'react-router-dom';
import './index.css';

//import logo from './logo.svg';
//import './App.css';


//Current page = current url
var currentPage = window.location.href;

//Listen for changes
setInterval(function(){
    if (currentPage != window.location.href){

        //Page has changed, set new page as 'current'
        currentPage = window.location.href;

        //Reload page
        window.location.reload();
    }
}, 500);

class IndexPage extends Component {


  constructor() {
      console.log("in constructer for index");
      console.log("Logged In? " + sessionStorage.getItem('loggedIn'));
      super();
      this.state = {isAuthenticated: false, user: null, token: ''};
      sessionStorage.setItem('token', null);
      sessionStorage.setItem('account', null);
      sessionStorage.setItem('loggedIn', 'false');
  }

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null});
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('account', null);
    sessionStorage.setItem('loggedIn', 'false');
  };

  onFailure = (error) => {
    console.log(error);
    alert(error);
  }

  //part of fetching
  componentDidMount(){
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
        console.log(user.googleProvider)

        if (token) {
          // should globally save the users access token and account info
          this.setState({isAuthenticated: true, user, token});
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('account', JSON.stringify(user));
          sessionStorage.setItem('loggedIn', 'true');
        }
      });
    })
  };


  render() {

    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <div>
<<<<<<< HEAD
          <Redirect to="/profile_page/"></Redirect>
=======
            <Redirect to="/page-2/"></Redirect>
>>>>>>> e468678e2066797116cea93699b361b44b9a16f5
          </div>
        </div>
      ) :
      (
      <div className="landingPageElement">
        <div className="bigTitle">
          A revolutionary way to play sports
        </div>
        <div className="loginButton">
          <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Google Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}

          />
        </div>

      </div>
      );

    return (
      <div className="App">
        {content} {console.log(sessionStorage.getItem("token"))}
      </div>

    );
  }
}


export default IndexPage
