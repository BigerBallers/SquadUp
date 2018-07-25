import React, { Component } from 'react';
import './profile.css';
import { Redirect } from 'react-router-dom'


class profilePage extends Component{

    constructor(props) {
        super(props);

        //check if user is logged in: if not, go back to homepage
        if (sessionStorage.getItem("loggedIn")=="false"){
          window.location.assign("http://localhost:8000");
        }

        // Grabs a Stringify version of user account information from Google.
        var user = sessionStorage.getItem('account');

        // Creates a JSON object called user.
        user = JSON.parse(user);
        // This checks to see if you are retrieving data from the DB.
        // if so, it will wait for the data to be pulled  to render.
        if(user != null) {
            //console.log(user);
            var full_name = user.googleProvider.name;
            var profile_image = user.googleProvider.profilePic;
            var event_list = user.events;
            var favorite_parks = user.followedParks;

            // Calls the back end to retrieve the event list and park list by ID.
            this.getEventsByID(event_list);
            this.getFollwedParks();
        }

        this.state = {
            person: {
                name: full_name,
                event_column: null,
                park_column: favorite_parks
            },
            image: profile_image,
            event_col: [],
            parks_col: []
        };
    }

    // Function to fetch events by ID. Pass in an object of ID's.
    getEventsByID(arrayOfIDs){
        //console.log('ids: ', arrayOfIDs)

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
            console.log('events: ', response);
            this.setState( {
                event_col: response,
            });
        })
        .catch(error => console.log('parsing failed. Error: ', error))
    }


    // Function to fetch the followed parks by the user. Uses the current person logged in.
    getFollwedParks() {
        var user = sessionStorage.getItem('account');
        user = JSON.parse(user);
        //console.log('user: ', user);
        var arrayOfIDs = user.followedParks;
        //console.log('arry of ids: ', arrayOfIDs);
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
                console.log('parks list: ', response);
                this.setState({
                    parks_col: response,
                });
            })
            .catch(error => console.log('parsing failed. Error: ', error))
    }

    render() {

        // catches if the person coming here isn't logged in.
        if(sessionStorage.getItem('loggedIn' === 'false')){
            <Redirect to="/"></Redirect>
        }

        // container for all the event items.
        const eventElement = this.state.event_col.map((x) => (
            <PrintEventName name={x}/>
        ))

        // container for all the park items.
        const parkElement = this.state.parks_col.map((x) => (
            <PrintParkName name = {x}/>
        ))

        return(
            <div className="App">
                <Image src={this.state.image} />
                <Profile person={this.state.person}/>
                <div style={{width:'50%', height:'550px',alignContent: 'flex-end'}}>
                    <div style={{textAlign: 'center', color: 'white', fontSize: '34px',paddingBottom: '10px'}}>
                        My Events
                    </div>
                    <div className="Profile">
                        {eventElement}
                    </div>
                </div>

                <div style={{width:'50%', height:'550px', alignContent: 'flex-start'}}>
                    <div style={{textAlign: 'center', color: 'white', fontSize: '34px',paddingBottom: '10px'}}>
                        Favorite Parks
                    </div>
                    <div className="Profile">
                        {parkElement}
                    </div>
                </div>
            </div>
        );
    }
}

const PrintEventName = ({name}) => (
    <div style={{background:'white', color:'black', borderRadius:'5px', margin:'2px', paddingTop: '18px'}}>
        Event Name: {name.name}<br />Sport: {name.sport}<br /> Time: {name.start}<br /> Description: {name.description}<br /><br />
    </div>
)


const PrintParkName = ({name}) => (
    <div style={{background:'white', color:'black', borderRadius:'5px', margin:'2px', paddingTop: '18px'}}>
        Park Name: {name.name}<br />Sports: {name.sports}<br />Address: {name.address}<br /><br />
    </div>
)


function Image(props){
    return (
        <img src={props.src} id="account_picture" />
    );
}


function Profile(props){
    return (
        <div className="Profile">
            <h1 className="Name">{props.person.name}</h1>
        </div>
    );
}



export default profilePage;