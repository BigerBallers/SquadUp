import React, { Component } from 'react';
import './event_page.css';
import Link from "gatsby-link";
import Geocode from "react-geocode";

class View_Event extends Component {
  constructor(props) { //constructor of props and states
    super(props);

    this.printLog=this.printLog.bind(this);
    this.printLog()
  }

  printLog(){
    console.log('PRINTING LOg')
    console.log(sessionStorage.getItem('event'))
  }

  //part of fetching
  componentDidMount(){
    this.fetchData();
  }

   //fetches park data from db. should not work at first because no access token
  fetchData(){
    fetch('http://localhost:8080/events', {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log('parsing failed', error))
  }


  render(){

    return (
      <body>

        <div className="centered-container">

          <div className="title">
            3v3 Tournament
          </div>

          <div className="category">
            <h3>Basketball</h3>
          </div>

          <div className="host-card">
            <div className="host-card-title">
              <h3> Hosted by: </h3>
            </div>
            <div className="host-card-pic">
              <img src="test.jpg" alt="test"/>
            </div>
            <div className="host-card-name">
              <h4> Zahir Yahya </h4>
            </div>
          </div>

          <h3>Location:</h3>
          <p>Random Park
            <br />
            555 Somthing st,
            Santa Cruz CA
          </p>

          <h3>Date: </h3>
          <p>July 5th<br />
          Start: 5:00pm End: 6:00pm</p>

           <div className="description">
            <h3>Description: </h3>
            <p>Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla
            </p>
        </div>

        <h3>Attending (3 out of 12): </h3>

        <div>
          <ul>
            <li>Person 1</li>
            <li>Person 2</li>
            <li>Person 3</li>
          </ul>
        </div>

        <button type="button">Join!</button>

        </div>

      </body>
      );
  }
}

export default View_Event;
