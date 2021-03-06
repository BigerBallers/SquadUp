import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Link from 'gatsby-link';
import image from '../images/pin.png';
import {geolocated} from 'react-geolocated';
import Select from "react-select";

//  - Will display pins on Google Maps -
//  This const will take in 2 args, the name of the park and the entire park object
//  It will create a link for each park, and the link will open up a new page
//  When a new page is open, it'll call sendParkInfo() passing in the park object
const AnyReactComponent = ({ text, park }) => <div style={{width:'80px', height:'auto'}}>
<img src={image} style={{float:'left', width:'25px'}}></img>
  <Link to='/park_page' onClick={(e) => sendParkInfo(park, e)}>
    {text}
    </Link>
</div>;

//  - Will display each park on the list of parks -
//  This const will take in 3 args, the name of the park and the entire park object
//  It will create a link for each park, and the link will open up a new page
//  When a new page is open, it'll call sendParkInfo() passing in the park object
const ListPark = ({name, address, park}) => (
  <div style={{borderRadius:'5px',padding:'10px',margin:'auto',marginBottom:'3px',border:'1px solid black',color:'black',background:'white', width:'90%', height:'auto'}}
  >
  <Link to='/park_page' onClick={(e) => sendParkInfo(park, e)}>
  {name} <br/>
  </Link>
  {address}
  </div>
)

//  Put the park object into the global sessionStorage ***
//  Allows the system to store the currently clicked park
function sendParkInfo(park, e) {
  sessionStorage.setItem('park', JSON.stringify(park));
}

class SimpleMap extends Component {

// Set a list of default properties
   static defaultProps = {
     center: {
       lat: 37.061093,
       lng: -97.038053
     },
     zoom: 13,
     currentPins: [],
     sportSelector: "",
     radiusSelector: ""
   };

  constructor(props) { //constructor of props and states
    super(props);

    this.state = { //initialize all states
      center: {
      lat: 37.061093,
      lng: -97.038053
      },
      zoom: 4,
      currentPins: [],
      sportSelector: "",
      radiusSelector: ""
    }

    //check if user is logged in: if not, go back to homepage
    if (sessionStorage.getItem("loggedIn")=="false"){
      window.location.assign("http://localhost:8000");
    }

    this.getLocation=this.getLocation.bind(this);
    this.success=this.success.bind(this);
    this.requestLocation=this.requestLocation.bind(this);
    this.handleSports=this.handleSports.bind(this);
    this.handleRadius=this.handleRadius.bind(this);

  }

  //part of fetching
  componentDidMount(){
    this.getLocation();
  }

  handleSeach() {
    // only can be clicked if radius is given
    // as of know the radius is default
    this.searchParkInRadius(this.state.center, 10);
  }

  // for now the variables are constants.
  // Want to let the user decide radius
  // and let google get the current location of user
  // also want to seach by gategory
  searchParkInRadius(center, radius){
    console.log(typeof radius)
    console.log('searching parks in radius: ', radius);
    var lng = center.lng;
    var lat = center.lat;
    var url = new URL('http://localhost:8080/parks/getParksInRadius');
    var params = {lat: lat, lng: lng, radius: radius}; // or:
    url.search = new URLSearchParams(params)
    fetch(url, {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      },
    })
    .then(response => response.json())
    .then(response => {
      //console.log(response[0]);
      this.setState({currentPins: response})
      //this.state.currentPins.map()
      console.log('current pins: ', this.state.currentPins)
      var category = ""; // needs to be the category the user selects
//      console.log('current pins: ', this.state.currentPins)
    })
    /*  this.setState({currentPins: response})
      console.log(this.state.currentPins)
    })*/
    .catch(error => console.log('parsing failed', error))
  }


  // filters the parks by category
  filterCategory(parks, category) {
    var filteredParks = [];
    if (category == ""){
      console.log('empty')
      filteredParks = parks
    }
    else{
      for (var i = 0; i < parks.length; i++) {
        if (parks[i].sports.find(function(sport) {
          return sport == category;
        }))
          filteredParks.push(parks[i]);
        }
        console.log("filtered parks: ", filteredParks);
      }
      return filteredParks;
  }

// Get the current location of user
  getLocation(){
    var msg;
    /**
    first, test for feature support
    **/
    if('geolocation' in navigator){
      // geolocation is supported :)
      this.requestLocation();
    }else{
      // no geolocation :(
      msg = "Sorry, looks like your browser doesn't support geolocation";
      console.log(msg); // output error message
    }
  } // end getLocation()

/***
  requestLocation() returns a message, either the users coordinates, or an error message
  **/
  requestLocation(){
    /**
    getCurrentPosition() below accepts 3 arguments:
    a success callback (required), an error callback  (optional), and a set of options (optional)
    **/

    var options = {
      // enableHighAccuracy = should the device take extra time or power to return a really accurate result, or should it give you the quick (but less accurate) answer?
      enableHighAccuracy: false,
      // timeout = how long does the device have, in milliseconds to return a result?
      timeout: 100000,
      // maximumAge = maximum age for a possible previously-cached position. 0 = must return the current position, not a prior cached position
      maximumAge: 0
    };

    // call getCurrentPosition()
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);

  } // end requestLocation();


// upon success, do this
    success(pos){
      // get longitude and latitude from the position object passed in
      var lng = pos.coords.longitude;
      var lat = pos.coords.latitude;
      var center = {
        lat: lat,
        lng: lng
      };
      // and presto, we have the device's location!
      console.log('your coord: ', center);
      this.setState({ center: center});
      this.setState({ zoom: 13});
      this.handleSeach();
    }

    // upon error, do this
    error(err){
      // return the error message
      console.log("Error: ", err);
    }

/* if there is a change in coord, the map will update */
  _onChange = ({center, zoom, pins}) => {
    this.setState({
      center: center,
      zoom: zoom
    });
  }

// when sport is selected, run this function, which will get a list
// of filtered parks based on the category
  handleSports(sportSelector){
    //console.log('sports selector',sportSelector.target.value)
  //  this.setState({sportSelector: sportSelector.target.value})
    var filteredParks = this.filterCategory(this.state.currentPins, sportSelector.target.value)
    //console.log(filteredParks)
    this.setState({currentPins: filteredParks})
  }

// when radius is selected, run this function, which will set the state
// of the search radius, and will call the searchParkInRadius() function
  handleRadius(radiusSelector){
    //console.log('input radiusSelector', radiusSelector.target.value)
    this.setState({radiusSelector: radiusSelector.target.value})
    //console.log('this state radius ',this.state.radiusSelector)
    var rad = this.state.radiusSelector
    this.searchParkInRadius(this.state.center, parseInt(radiusSelector.target.value));
  }

  render() {

//  iterate through the list of each park
//  create a new AnyReactComponent for each park to create a pin
    const addComponent = this.state.currentPins.map((item) =>
    <AnyReactComponent lat={item.geo[1]} lng={item.geo[0]} park={item} text={item.name}/>)

//  iterate through the list of park to display the list of parks on the side
    const listParks = this.state.currentPins.map((item) => (
      <ListPark name={item.name} address={item.address} park={item}/>
    ))

    return (
      // Important! Always set the container height explicitly
      <div>
        <div style={{
          color: 'black',
          background:'white',
          fontWeight:'bold',
          fontSize:'38px',
          padding:'10px',
          borderRadius:'25px',
          width: '400px',
          textAlign: 'center',
          margin:'auto',
          marginTop: '10px',
          marginBottom:'15px'
        }}>
          Search
        </div>
        <div style={{margin:'0px auto',marginBottom:'100px'}}>
          <div style={{float:'left',fontSize:'20px',fontSize:'smaller',width:'50%'}}>
          <div style={{textAlign:'center',color:'white'}}>Filter By Sport</div>
            <select onChange={this.handleSports} style={{width:'150px', height:'30px', marginLeft:'34%',marginBottom:'20px'}}>
              <option value="" selected></option>
              <option value="Basketball">Basketball</option>
              <option value="Soccer">Soccer</option>
              <option value="Frisbee">Frisbee</option>
              <option value="Football">Football</option>
              <option value="Baseball">Baseball</option>
            </select>
          </div>
          <div style={{float:'left',fontSize:'20px', fontSize:'smaller',width:'50%'}}>
          <div style={{textAlign:'center',color:'white'}}>Search Radius (miles)</div>
            <select onChange={this.handleRadius} style={{width:'150px', height:'30px', marginLeft:'34%',marginBottom:'20px'}}>
              <option value="" disabled selected></option>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      <div style={{color: 'white', height:'71vh', width:'49%', float:'right', overflowY:'auto' }}>
        <div style={{marginBottom:'10px',fontWeight:'bold',textAlign:'center', fontSize:'25px'}}>
        Parks Near You
        </div>
        {listParks}
      </div>
      <div style={{ height: '71vh', width: '49%' }}>
        <GoogleMapReact
          onChange={this._onChange}
          bootstrapURLKeys={{ key: 'AIzaSyBgne_-KxLx1Sbd2CHtT7EklGSPAyjXH5I' }}
          center={this.state.center}
          zoom={this.state.zoom}
          pins={this.state.currentPins}
          >
          {addComponent}
        </GoogleMapReact>
      </div>
      </div>
    );
  }
}

export default SimpleMap;
