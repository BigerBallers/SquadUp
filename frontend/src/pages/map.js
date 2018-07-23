import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Link from 'gatsby-link';
import image from '../images/pin.png';
import {geolocated} from 'react-geolocated';



const AnyReactComponent = ({ text, id }) => <div style={{width:'80px', height:'auto'}}>
<img src={image} style={{float:'left', width:'25px'}}></img>
  <Link to='/game_info'>
    {text}
    </Link>
</div>;

class SimpleMap extends Component {
   static defaultProps = {
     center: {
       lat: 37.061093,
       lng: -97.038053
     },
     zoom: 13
   };

  constructor(props) { //constructor of props and states
    super(props);

    this.state = { //three fields for add parK: name, locaiton and sport
      center: {
      lat: 37.061093,
      lng: -97.038053
      },
      zoom: 4
    }

    this.getLocation=this.getLocation.bind(this);
    this.success=this.success.bind(this);
    this.requestLocation=this.requestLocation.bind(this);

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
    consolelog('searching parks in radius: ', radius);
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
      console.log(response);
    })
    .catch(error => console.log('parsing failed', error))
  }


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
      timeout: 10000,
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

    }

    // upon error, do this
    error(err){
      // return the error message
      console.log("Error: ", err);
    } 

/* if there is a change in coord, the map will update */
  _onChange = ({center, zoom}) => {
    this.setState({
      center: center,
      zoom: zoom,      
    });
  }


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          onChange={this._onChange}
          bootstrapURLKeys={{ key: 'AIzaSyBgne_-KxLx1Sbd2CHtT7EklGSPAyjXH5I' }}
          center={this.state.center}
          zoom={this.state.zoom}
        >
        <AnyReactComponent
          lat={36.97}
          lng={-122.0308}
          id={0}
          text={'Soccer Game'}
        />
        <AnyReactComponent
          lat= {36.974660}
          lng= {-122.054377}
          id={0}
          text={'Basketball Game'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
