import React, { Component } from 'react';
import './Add_Park_Style.css';
import Link from "gatsby-link";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDAqgkDUgbqZuBZbDXkiaXubQWvdV3gYZg");  
Geocode.enableDebug();

class Add_Park extends Component {
  constructor(props) { //constructor of props and states
    super(props);
    
    this.state = { //three fields for add parK: name, locaiton and sport
      park_name: '',
      park_location: '',
      selector: [],
      park_description: '',
    }
    this.handleSubmit= this.handleSubmit.bind(this); 
    this.handleSports=this.handleSports.bind(this);
    this.handleDescription=this.handleDescription.bind(this);

  }

  sendParkData(data){
    fetch('http://localhost:8080/parks/addPark', {
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
    })
    .catch(error => console.log('parsing failed', error))
  }
  

  //functions/methods that receive inputs

  handleParknameChange(event){
    this.setState({
      park_name: event.target.value
    })
  }
  handleLocationChange(event){
    this.setState({
      park_location: event.target.value
    })
  }
  handleSports(selector){
    this.setState({
      selector: selector.target.value
    })
  }
  handleDescription(event){
    console.log("description: ", event);
    this.setState({
      park_description: event.target.value
    })
  }
  handleSubmit(event){

    const {park_name, park_location, selector, park_description}=this.state

    // alert("Park Name: "+this.state.park_name
    //   +"\nPark Location: "+this.state.park_location
    //   +"\nSports: "+this.state.selector+
    //   "\nYou are all set!\n ");
    //here an alert window is popped up

    this.convertGeo(this.state.park_location);   
 
  }

  convertGeo(input){
    var geo;
    Geocode.fromAddress(input).then(
      response => {

        const { lat, lng } = response.results[0].geometry.location;
        geo = [lng, lat];
        console.log(geo);
        var data = {
        name: this.state.park_name,
        address: this.state.park_location,
        description: this.state.park_description,
        sports:[this.state.selector],
        geo: geo
      };
      
      console.log('data: ', data);
      this.sendParkData(data);
      return geo;

      },
      error => {
        console.error(error);
        alert("Not Valid Address!");
        return [];
      }
    );
  }


  render(){
    const {park_name, park_location, selector, park_description}=this.state
    const enabled= 
      park_name.length > 0 &&
      park_location.length>0 && 
      selector.length>0; //unable the sumbit button when no input

    return (
      <body>

      <div className="total">
        
        <div className="MyHeader">
          <h2>Add Park</h2>
            
        </div>

        <div className="forms">
          <div className="ParkName">
            Park Name
          </div>
          <div className="decoration"></div>
            <div className="name_field">
              <input value={this.state.park_name} 
              onChange={this.handleParknameChange.bind(this)} 
              placeholder="e.g. Rucker Park" 
              style={{width: "100%", height:"100%"}}
              required />
            </div>

          <div className="LocationName">
            Park Location
          </div>

            <div className="location_field">
              <input value={this.state.park_location}
              onChange={this.handleLocationChange.bind(this)}
              placeholder="e.g. 5th Avenue"
              style={{width: "100%", height:"100%"}} required />
            </div>
          <div className="picker">
            <select value={this.state.selector} onChange={this.handleSports} style={{width: "100%", height:"100%"}}> 
              <option value="" disabled selected>Sport?</option>
              <option value="Basketball">Basketball</option>
              <option value="Soccer">Soccer</option>
              <option value="Frisbee">Frisbee</option>
              <option value="Football">Football</option>
              <option value="Baseball">Baseball</option>
            </select>
          </div>
          <div className="description">
            <textarea 
            rows="6"
            cols="53"
            value={this.state.park_description}
            onChange={this.handleDescription.bind(this)}
            placeholder="Tell us something about the park!" 
            required />
          </div>
          <div className="submit-button">
            <button onClick={this.handleSubmit} disabled={!enabled}>Submit</button>
          </div>
        </div>
      </div>
      </body>
      );
  }
}

export default Add_Park;