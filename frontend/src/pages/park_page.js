import React, { Component } from 'react';
import image from '../images/park.jpg';
import GoogleMapReact from 'google-map-react';
import pin from '../images/pin.png';
import Link from 'gatsby-link';


//  - Will display each event associated for the current park -
//  This const will take in the entire event object
//  It will create a link for each event, and the link will open up a new page
//  When a new page is open, it'll call sendEventInfo() passing in the event object
const EventComponent = ({evnt}) => (
  <div style={{borderRadius:'5px',padding:'10px',margin:'auto',marginBottom:'3px',border:'1px solid black',color:'black',background:'white', width:'90%', height:'auto'}}
  >
  <Link to='/event_page' onClick={(e) => sendEventInfo(evnt, e)}>
  {evnt.name} <br/>
  </Link>
  <div style={{fontSize: '14px',fontStyle:'italic'}}>Starts at {evnt.start}</div>
  </div>
)

//  This const will take in the name of the park, and it will display a pin
//  on the Google Map
const AnyReactComponent = ({ text }) => <div style={{width:'80px', height:'auto'}}>
<img src={pin} style={{float:'left', width:'25px'}}></img>
  <div>
    {text}
    </div>
</div>;


//  send the event object to the sessionStorage() in order to save the currently
//  clicked event info
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

    if (this.state.parkInfo == null) {
      window.location.assign("http://localhost:8000/404")
    }

    this.getParkInfo=this.getParkInfo.bind(this);
    this.getEventsByID=this.getEventsByID.bind(this);
    this.setCenter=this.setCenter.bind(this);
    this.getParkInfo()
    this.setCenter()
    this.getEventsByID(this.state.parkInfo.event_id)
  }

  setCenter(){
  }

  getParkInfo(){
    console.log(this.state.parkInfo);
  }

//  Send in a list of event ID's, to return a list of corresponding
//  Event objects
//  This will pull from the MongoDB database
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


  render() {

    //  If there are no events to display, the code will render a message
    //  that says No events available
    //  Else, create an EventComponent for each event available
    const addComponent = this.state.isNull ? (
         <div style={{paddingTop:'50px', textAlign: 'center'}}>NO EVENTS AVAILABILE</div>
      ) : (
         this.state.eventsAtPark.map((item) =>
        (<EventComponent evnt={item}/>))
      )

    // Return a list of sports that correspond to the current selected park
    const getSports = this.state.parkInfo.sports.map((item) => (
        <div style={{ width:'25%', background:'white', color:'black', borderRadius:'8px', float:'left', margin:'2px'}}>
        {item}
        </div>
    ))

    return (
      <div style={{ color:'white'}}>
        <div style={{marginTop:'10px', width:'49%', float:'right', overflowY:'auto'}}>
          <div style={{marginBottom:'10px',fontWeight:'bold',textAlign:'center', fontSize:'25px'}}>
          Events
          </div>
              {addComponent}
        </div>
        <div style={{marginTop:'10px', color:'black', height: '450px', width: '49%',overflowY:'auto'}}>

        <img src={image} style={{display:'block',margin:'auto', marginBotton:'20px',width:'100px', borderRadius:'200px'}}></img>

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
            lineHeight: '1',
          }}>
            {this.state.parkInfo.name}
          </div>
        <div style={{color:'white', width:'100%', height:'80%', position:'relative'}}>
          <div style={{marginTop:'10px',fontStyle:'bold',fontSize:'20px',textAlign:'center'}}> Address
          </div>
          <div style={{fontStyle:'normal', textAlign:'center', marginBottom:'20px'}}>
          {this.state.parkInfo.address}
          </div>
          <hr style={{background:'white'}}/>
          <div style={{marginTop:'10px',fontStyle:'bold',fontSize:'20px',textAlign:'center'}}> Description
          </div>
          <div style={{fontStyle:'normal', textAlign:'center', marginBottom:'20px'}}>
          {this.state.parkInfo.description}
          </div>
          <hr style={{background:'white'}}/>
          <div style={{fontStyle:'bold',fontSize:'20px',textAlign:'center'}}> Sports
          </div>
          <div style={{fontStyle:'normal', textAlign:'center', width: '100%',height:'80px', display:'inline-block', marginTop:'8px', padding:'10px 10px'}}>
          {getSports}
          </div>
          <hr style={{background:'white'}}/>
        </div>
        <div style={{height:'200px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBgne_-KxLx1Sbd2CHtT7EklGSPAyjXH5I' }}
          center={{lat: this.state.parkInfo.geo[1], lng: this.state.parkInfo.geo[0]}}
          zoom={this.state.zoom}
          gestureHandling={'cooperative'}
          >
          <AnyReactComponent
            lat={this.state.parkInfo.geo[1]}
            lng={this.state.parkInfo.geo[0]}
            text={this.state.parkInfo.name}
            />
        </GoogleMapReact>
        </div>

      </div>
       <div className="goToAddEvent"
       style={{marginLeft:'10px', textAlign: 'center'}}>
        <Link to="/Add_Event/">
        <button style={{marginTop: "20px", height: "40px",border: "2px solid black", borderRadius:'8px'}}>
        Add An Event
        </button>
        </Link>
        </div>
      </div>
    )
  }

}
export default ParkPage;
