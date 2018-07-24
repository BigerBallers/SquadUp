import React, { Component } from 'react';
import image from '../images/park.jpg';
import GoogleMapReact from 'google-map-react';
import pin from '../images/pin.png';
import Link from 'gatsby-link';





const EventComponent = ({evnt}) => (
  <div style={{padding:'10px',margin:'auto',border:'1px solid black',color:'black',background:'white', width:'90%', height:'auto'}}
  >
  <Link to='/event_page' onClick={(e) => sendEventInfo(evnt, e)}>
  {evnt.name} <br/>
  </Link>
  <div style={{fontSize: '14px',fontStyle:'italic'}}>Starts at {evnt.start}</div>
  </div>
)

const AnyReactComponent = ({ text }) => <div style={{width:'80px', height:'auto'}}>
<img src={pin} style={{float:'left', width:'25px'}}></img>
  <div>
    {text}
    </div>
</div>;

function sendEventInfo(evnt, e){
  sessionStorage.setItem('event', JSON.stringify(evnt))
}

class ParkPage extends Component {

  static defaultProps = {
    parkInfo: {},
    eventsAtPark: [],
    isNull: true,
    center: {},
    zoom: 16
  };

  constructor(props) { //constructor of props and states
    super(props)
    this.state = {
      parkInfo: JSON.parse(sessionStorage.getItem('park')),
      eventsAtPark: [],
      isNull: true,
      center: {
      },
      zoom:16
    }

    this.getParkInfo=this.getParkInfo.bind(this);
    this.getEventsByID=this.getEventsByID.bind(this);
    this.setCenter=this.setCenter.bind(this);
    this.getParkInfo()
    this.setCenter()
    this.getEventsByID(this.state.parkInfo.event_id)
    //this.getFollwedParks();
  }

  setCenter(){
  }

  getParkInfo(){
    console.log(this.state.parkInfo);
  }

  getEventsByID(arrayOfIDs){
    console.log('ids: ', arrayOfIDs)

    var url = new URL('http://localhost:8080/events/getMultipleEventsById');
    var params = {eventIds: arrayOfIDs};
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
      console.log('response: ', response);
      if(response != []){
          console.log('array isnt empty')
          this.setState({
            isNull: false
          })
          this.setState({
            eventsAtPark: response
          })
          }
      })
    .catch(error => console.log('parsing failed. Error: ', error))
  }


  getFollwedParks() {
    var user = sessionStorage.getItem('account');
    user = JSON.parse(user);
    console.log('user: ', user);
    var arrayOfIDs = user.followedParks;
    console.log('arry of ids: ', arrayOfIDs);
    var url = new URL('http://localhost:8080/parks/getMultipleParksbyId');
    var params = {parkIds: arrayOfIDs};
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
      console.log('list of followed parks: ', response);   
    })
    .catch(error => console.log('parsing failed. Error: ', error))
  }  


  render() {
    const addComponent = this.state.isNull ? (
         <div style={{paddingTop:'50px', textAlign: 'center'}}>NO EVENTS AVAILABILE</div>
      ) : (
         this.state.eventsAtPark.map((item) =>
        (<EventComponent evnt={item}/>))
      )

    return (
      <div style={{ color:'white'}}>
      <img src={image} style={{display:'block',margin:'auto', marginBotton:'20px',width:'150px', borderRadius:'200px'}}></img>

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
          marginTop: '10px'
        }}>
          {this.state.parkInfo.name}
        </div>
        <div style={{marginTop:'10px', width:'49%', float:'right'}}>
            {addComponent}
        </div>
        <div style={{marginTop:'10px', color:'black', height: '45vh', width: '49%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBgne_-KxLx1Sbd2CHtT7EklGSPAyjXH5I' }}
          center={{lat: this.state.parkInfo.geo[1], lng: this.state.parkInfo.geo[0]}}
          zoom={this.state.zoom}
          >
          <AnyReactComponent
            lat={this.state.parkInfo.geo[1]}
            lng={this.state.parkInfo.geo[0]}
            text={this.state.parkInfo.name}
            />
        </GoogleMapReact>
      </div>
      </div>
    )
  }

}
export default ParkPage;
