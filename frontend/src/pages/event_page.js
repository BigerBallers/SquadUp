import React, { Component } from 'react';
import './event_page.css';
import Link from "gatsby-link";
import Geocode from "react-geocode";

class View_Event extends Component 
{
    static defaultProps = 
    {
      eventInfo: {},
      guests: []
    };


  //constructor of props and states
  constructor(props) 
  { 
    
    super(props);

    this.state = 
    {
      eventInfo: JSON.parse(sessionStorage.getItem('event')),
      parkInfo: JSON.parse(sessionStorage.getItem('park')),
      guests: []
    }

    this.getEventInfo=this.getEventInfo.bind(this);
    this.getEventInfo();

    this.getParkInfo=this.getParkInfo.bind(this);
    this.getParkInfo();

    this.addEventToUserList=this.addEventToUserList.bind(this);

    this.addUserToEventList=this.addUserToEventList.bind(this);

    this.gethostData(this.state.eventInfo.host_id);

    this.getAttendingUsers(this.state.eventInfo.attending)

  }

  getEventInfo()
  {
    console.log(this.state.eventInfo);
  }

  getParkInfo()
  {
    console.log(this.state.parkInfo);
  }



  getAttendingUsers(userIDs){
    console.log(userIDs)
    var url = new URL('http://localhost:8080/users/getMultipleUsersById');
    var params = {userIds: userIDs};
    url.search = new URLSearchParams(params)
    fetch(url, {
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
      console.log('Attending Users List: ', response);
      // parse response for user names
      var guests = [];
      if (response.length > 0) {
        for (var i = 0; i < response.length; i++) {
          guests.push(response[i].googleProvider.name);
        }
      }
      this.setState
      (
        {guests: guests}

      )
    })
    .catch(error => console.log('parsing failed', error))
  }

  gethostData(host_id) {
    console.log(host_id)
    var url = new URL('http://localhost:8080/users/getUserById');
    var params = {userId: host_id};
    url.search = new URLSearchParams(params)
    fetch(url, {
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
      console.log('host: ', response);
      this.setState
      (
        {host: response.googleProvider.name}

      )
      this.setState
      (
        {pic: response.googleProvider.profilePic}
      )
    })
    .catch(error => console.log('parsing failed', error))
  }


  addEventToUserList()
  {
    var user = sessionStorage.getItem('account');
    user = JSON.parse(user);

    var event = sessionStorage.getItem('event');
    event = JSON.parse(event);

    var data = {eventId: event._id, userId: user.id}

    fetch('http://localhost:8080/users/addEventById', {
      method: 'post',
      dataType: 'json',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(response => {
    console.log('response: ', response);
    })
    .catch(error => console.log('parsing failed', error))
  }


  addUserToEventList()
  {
    var user = sessionStorage.getItem('account');
    user = JSON.parse(user);

    var event = sessionStorage.getItem('event');
    event = JSON.parse(event);

    var data = {eventId: event._id, userId: user.id}

    fetch('http://localhost:8080/events/joinEvent', {
      method: 'post',
      dataType: 'json',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(response => {
    console.log('response: ', response);
    })
    .catch(error => console.log('parsing failed', error))
  }
  
  


  joinEvent()
  {
    var user = sessionStorage.getItem('account');
    user = JSON.parse(user);

    var event = sessionStorage.getItem('event');
    event = JSON.parse(event);

    var data = {eventId: event._id, userId: user.id}

    console.log(event.attending)

    for (var i = 0; i < event.attending.length; i++)
    {
      if(event.attending[i] == user.id || user.events[i] == event._id)
      {
        alert("You are already attending this event!")
        return
      }
    }

    fetch('http://localhost:8080/users/addEventById', {
      method: 'post',
      dataType: 'json',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(response => {
    console.log('response: ', response);
    })
    .catch(error => console.log('parsing failed', error))

    fetch('http://localhost:8080/events/joinEvent', {
      method: 'post',
      dataType: 'json',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(response => {
    console.log('response: ', response);
    })
    .catch(error => console.log('parsing failed', error))

    //change to profile page
    window.location.assign("http://localhost:8000/page-2/")
  }




  render()
  {
    const listGuests = this.state.guests.map((person) => <ListEachGuest person={person}/>)


    return (
      <body>

        <div className="centered-container">

          <div className="title">
            {this.state.eventInfo.name}  
          </div>

          <h3> Hosted by: </h3>
          <img src={this.state.pic} alt="Profile Picture"/>
          <p>{this.state.host}</p>

          <h3>Category:</h3>
          <p>{this.state.eventInfo.sport}</p>

          <h3>Location:</h3>
          <p>{this.state.parkInfo.address}</p>

          <h3>Date: </h3>
          <p>Start: {this.state.eventInfo.start}</p>
          <p>End: {this.state.eventInfo.end}</p>

          <h3>Description: </h3>
          <p>{this.state.eventInfo.description}</p>

        <h3>Attending ({this.state.guests.length} of {this.state.eventInfo.max_people}): </h3>
        <div>
          <ul>
            {listGuests}
          </ul>
        </div>

        <button type="button" onClick= {this.joinEvent}>Join!</button>

        </div>

      </body>
      );
  }
}

const ListEachGuest = ({person}) => 
(
    <li>{person}</li>

)

export default View_Event;