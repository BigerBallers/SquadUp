import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Link from 'gatsby-link';
import image from '../images/pin.png';
import {geolocated} from 'react-geolocated';


const AnyReactComponent = ({ text, park }) => <div style={{width:'80px', height:'auto'}}>
<img src={image} style={{float:'left', width:'25px'}}></img>
  <Link to='/park_page' onClick={(e) => sendParkInfo(park, e)}>
    {text}
    </Link>
</div>;

const ListPark = ({name, address, park}) => (
  <div style={{padding:'10px',margin:'auto',border:'1px solid black',color:'black',background:'white', width:'90%', height:'auto'}}
  >
  <Link to='/park_page' onClick={(e) => sendParkInfo(park, e)}>
  {name} <br/>
  {address}
  </Link>
  </div>
)


function sendParkInfo(park, e) {
  sessionStorage.setItem('park', JSON.stringify(park));
}

class SimpleMap extends Component {
   static defaultProps = {
     center: {
       lat: 37.061093,
       lng: -97.038053
     },
     zoom: 13,
     currentPins: []
};

  constructor(props) { //constructor of props and states
    super(props);

    this.state = { //three fields for add parK: name, locaiton and sport
      center: {
      lat: 37.061093,
      lng: -97.038053
      },
      zoom: 4,
      currentPins: []
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
      var category = "Soccer"; // needs to be the category the user selects
      var filteredParks = this.filterCategory(response, category);
      this.setState({currentPins: filteredParks})
      console.log('current pins: ', this.state.currentPins)
    })
    /*  this.setState({currentPins: response})
      console.log(this.state.currentPins)
    })*/
    .catch(error => console.log('parsing failed', error))
  }


  // filters the parks by category
  filterCategory(parks, category) {
    if (category == "")
      return parks;

    var filteredParks = [];
    for (var i = 0; i < parks.length; i++) {
      if (parks[i].sports.find(function(sport) {
        return sport == category;
      }))
        filteredParks.push(parks[i]);
      }
      console.log("filtered parks: ", filteredParks);
      return filteredParks;
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

  render() {
    const addComponent = this.state.currentPins.map((item) =>
    <AnyReactComponent lat={item.geo[1]} lng={item.geo[0]} park={item} text={item.name}/>)

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
