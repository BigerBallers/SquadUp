import React, { Component } from 'react';
import './Add_Park_Style.css';
import Link from "gatsby-link";
import Geocode from "react-geocode";
import Select from "react-select";
import { Redirect } from 'react-router-dom';

//Geocode instructions
Geocode.setApiKey("AIzaSyDAqgkDUgbqZuBZbDXkiaXubQWvdV3gYZg");  
Geocode.enableDebug();

class Add_Park extends Component {

  //constructor of props and states
  constructor(props) { 
    super(props);
    
    //fields for add parK: name, locaiton, sport and description
    //also initialize the flag that determine whether form is submitted
    this.state = { 
      park_name: '',
      park_location: '',
      selector: [],
      park_description: '',
    }

    //binding the methods
    this.handleSubmit= this.handleSubmit.bind(this); 
    this.handleSports=this.handleSports.bind(this);
    this.handleDescription=this.handleDescription.bind(this);
    
    if (sessionStorage.getItem("loggedIn")=="false"){
      window.location.assign("http://localhost:8000");
    }

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
  

  //functions/methods that receive inputs and set the inputs to values
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
    this.setState({selector})

  }
  handleDescription(event){
    this.setState({
      park_description: event.target.value
    })
  }

  handleSubmit(event){

    const {park_name, park_location, selector, park_description}=this.state;

    //the empty sports list waited to receive values of selected sports
    var sportResult= []; 

    //push only the values of sports to list
    for (var i=0; i<this.state.selector.length;i++){
      sportResult.push(this.state.selector[i].value); 
    }

    this.convertGeo(this.state.park_location);   
     //here an alert window is popped up
    alert("Park Name: "+this.state.park_name
      +"\nPark Location: "+this.state.park_location
      +"\nSports: "+sportResult+
      "\nYou are all set!\n ");
    
    //redirects the page when it's submitted
    window.location.assign("http://localhost:8000/profile_page/");

  }

  convertGeo(input){ //Coverts address information to geographic informations
    var geo;
    Geocode.fromAddress(input).then(
      response => {

        //due to the time for sending data to google's Geo API is delayed that
        //codes after this will be executed first before getting the geographic
        //informations, we have to put in the informations to these attributes
        //in this function while execution so when the information comes back,
        //it would get the informations on time without distrubing other attributes
        

        const { lat, lng } = response.results[0].geometry.location;
        geo = [lng, lat];
        console.log(geo);
        var sports = [];
        for (var i=0;i< this.state.selector.length;i++){
          sports.push(this.state.selector[i].value);
        }
        var data = {
        name: this.state.park_name,
        address: this.state.park_location,
        description: this.state.park_description,
        sports: sports,
        geo: geo
      };
      
      console.log('data: ', data); //print out data informations in console
      this.sendParkData(data);
      return geo;

      },
      error => {
        console.error(error); //print out error pessage
        alert("Not Valid Address!"); //alert pop up when address is not valid
        return [];
      }
    );

    
  }


  render(){

    //set the variables to its states for changes that are going to be made later
    const {park_name, park_location, selector, park_description}=this.state
    
    //unable the sumbit button when no input
    const enabled= 
      park_name.length > 0 &&
      park_location.length>0 && 
      selector.length>0; 

    //options for sports
    const options = [
      {value: "Basketball", label: 'Basketball'},
      {value: "Soccer", label: 'Soccer'},
      {value: "Football", label: "Football"},
      {value: "Frisbee", label: "Frisbee"}
    ]

    return(
      <div className="total">
        
        <div className="MyHeader">
          <h2>Add Park</h2>
            
        </div>

        <div className="Parkform">

          <div className="ParkName">
            Park Name
          </div>

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
              style={{width: "100%", height:"100%"}} 
              required />
          </div>

          <div className="picker">
            <Select options={options} 
            value={selector} 
            onChange={this.handleSports}
            style={{width: "100%", height:"100%"}} 
            isMulti /> 
          </div>

          <div className="ParkDescription">
            <textarea 
            rows="6"
            cols="53"
            value={this.state.park_description}
            onChange={this.handleDescription.bind(this)}
            placeholder="Tell us something about the park!" 
            required />
          </div>

          <div className="submit-button">
            <button onClick={this.handleSubmit} 
            disabled={!enabled}>
              Submit
            </button>
          </div>

        </div>
      </div>
      );
  }
}

export default Add_Park;