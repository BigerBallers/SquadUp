import React, { Component } from 'react';
import './Add_Event_Style.css';
import DateTimePicker from 'react-datetime-picker'
import Link from "gatsby-link";

class Add_Event extends Component {
  constructor(props) { //constructor of props and states
    super(props);
    
    this.state = { 
      event_name: '',
      start: '2018-01-01T08:30',
      end: '2018-01-01T08:30',
      sport: '',
      max_people: 0,
      description: '',
    }

    //bind the functions
    this.handleSubmit= this.handleSubmit.bind(this); 
    this.handleSports=this.handleSports.bind(this);
    this.handleDescription=this.handleDescription.bind(this);
    this.handleStartTime=this.handleStartTime.bind(this);
    this.handleEndTime=this.handleEndTime.bind(this);
  }

  componentDidMount() {
    var user = sessionStorage.getItem('account');
    user = JSON.parse(user);
    console.log('user: ', user);
  }

  sendEventData(){

    var user = sessionStorage.getItem('account');
    user = JSON.parse(user);

    console.log(user);

    var data = {
      name: this.state.event_name,
      park_id: '5b561fcb33132e4076c2957c', //sessionStorage.getItem('park_id'),
      start: this.state.start,
      end: this.state.end,
      sport: this.state.sport,
      description: this.state.description,
      host: String(user.id),
      max_people: this.state.max_people
    }

    fetch('http://localhost:8080/events/addEvent', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      // after the event has been added to db, the event should be added to user list
      if (response.status == 'failed') {
      //cannot add event to database
      }
      else {
        //update the user attending event list
        this.updateUserEvents(response.newEvent._id);
        // update the park event list
        this.updateParkEvents(response.newEvent._id);
      }
    })
    .catch(error => console.log('parsing failed', error))
  }


  updateParkEvents(eventId) {
    var parkId = '5b4e7650ce6a3177c05e4143'; // meder park

    var data = {
      parkId: parkId,
      eventId: eventId
    }
    fetch('http://localhost:8080/parks/addEventPark', {
      method: 'post',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log('Cannot update park event list. parsing failed', error))
  }


updateUserEvents(eventId) {
  console.log('adding event to user list');
  var user = sessionStorage.getItem('account');
  user = JSON.parse(user);
  
  var data = {
    userId: user.id,
    eventId: eventId
  };

  console.log(data);

  fetch('http://localhost:8080/users/addEventById', {
    method: 'POST',
    dataType: 'json',
          headers: {
            'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem('token')
          },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(response => {
    if (response.status == 'success')
      console.log('event added to users event List')
      console.log('response: ', response)
  })
}
  

  //functions/methods that receive inputs
  handleEventNameChange(event){
    this.setState({
    	event_name: event.target.value
    })
  }
  handleStartTime(event){
  	this.setState({
  		start: event.target.value
  	})
  }
  handleEndTime(event){
  	this.setState({
  		end: event.target.value
  	})
  }
  handleSports(event){
    this.setState({
    	sport: event.target.value
    })
  }
  handleMaxPeople(event){
    this.setState({
      max_people: event.target.value
    })
  }
  handleDescription(event){
    this.setState({
    	description: event.target.value
    })
  }

  handleSubmit(event){

  this.sendEventData();
    const {event_name, start, end, sport, max_people, description}=this.state

    alert("Event Name: "+this.state.event_name
      +"\nStart Time: "+this.state.start
      +"\nEnd Time: "+this.state.end
      +"\nSports: "+this.state.sport
      +"\nMax People: "+this.state.max_people
      +"\nYou are all set!\n ");
    //here an alert window is popped up
  }

  render(){
    const {event_name, start, end, sport, max_people, description}=this.state
    const enabled= 
      event_name.length > 0 &&
      start.length>0 && 
      end.length>0 &&
      sport.length &&
      max_people>0 &&
      max_people%1==0 &&
      description.length>0; //unable the sumbit button when no input, or max people
                            //is not valid

    return (
      <body>

      <div className="eventTotal">
        
        <div className="MyHeader">
          <h2>Add Event</h2>
            
        </div>

        <div className="event_forms">
        	<div className="EventName">
            	Event Name
          	</div>
          	<div className="event_name_field">
             	<input value={this.state.park_name} 
             	onChange={this.handleEventNameChange.bind(this)} 
             	placeholder="e.g. 5v5 Basketball" 
             	style={{width: "100%", height:"100%"}}
             	required />
            </div>

            <div className="start_time">
              Start Time:
              <input id="event_start" 
              type="datetime-local" 
              name="startdate" 
              value={this.state.start}
              onChange={this.handleStartTime} />
            </div>

            <div className="end_time">
              End Time:
            	 <input id="event_end" 
              type="datetime-local" 
              name="enddate" 
              value={this.state.end}
              onChange={this.handleEndTime} />
            </div>


          <div className="event_picker">
            <select value={this.state.selector} onChange={this.handleSports} style={{width: "45%", height:"100%"}}> 
              <option value="" disabled selected>Sport?</option>
              <option value="Basketball">Basketball</option>
              <option value="Soccer">Soccer</option>
              <option value="Frisbee">Frisbee</option>
              <option value="Football">Football</option>
              <option value="Baseball">Baseball</option>
            </select>

            <input 
              type="number"
              value={this.state.max_people} 
              onChange={this.handleMaxPeople.bind(this)} 
              placeholder="Max People?" 
              style={{width: "45%", height:"100%"}}
              required />
          </div>
          <div className="event_description">
            <textarea 
            rows="6"
            cols="53"
            value={this.state.park_description}
            onChange={this.handleDescription.bind(this)}
            placeholder="Tell us something about the event!" 
            required />
          </div>
          <div className="event-submit-button">
            <button onClick={this.handleSubmit} disabled={!enabled}>Submit</button>
          </div>
        </div>
      </div>
      </body>
      );
  }
}

export default Add_Event;