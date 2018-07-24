import React, { Component } from 'react';
import './profile.css';


class profilePage extends Component{

    constructor(props) {
        super(props);
        var user = sessionStorage.getItem('account');

        //console.log(user);
        user = JSON.parse(user);

        if(user != null) {
            var full_name = user.googleProvider.name;
            var profile_image = user.googleProvider.profilePic;
            var event_list = user.events;
            var favorite_parks = user.followedParks[0];

            this.getEventsByID(event_list);
            //console.log(this.state.event_state);
            //event_list = this.state.event_state;
            //console.log('in user for loop:');

            console.log(user);
            //console.log(profile_image);
        }

        this.state = {
            person: {
                name: full_name,
                event_column: null,
                park_column: favorite_parks
            },
            image: profile_image,
            event_col: null

        };
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
                console.log('events: ', response);
                this.setState( {
                    event_col: response[0].name,
                });
            })
            .catch(error => console.log('parsing failed. Error: ', error))
    }


    render() {
        return(
            <div className="App">
                <Image src={this.state.image} />
                <Profile person={this.state.person}/>
                <Event event_col={this.state.event_col}/>
            </div>
        );
    }
}


function Image(props){
    return (
        <img src={props.src} id="account_picture" />

    );
}

function Event(props){
    return(
        <div className="Profile">
            <p className="Event_Col">{props.event_col}</p>
        </div>
    );
}

function Profile(props){
    return (
        <div className="Profile">
            <h1 className="Name">{props.person.name}</h1>
            <p className="Events">{props.person.event_column}</p>
            <p className="Favorites">{props.person.park_column}</p>
        </div>
    );
}

function PrintJSON(object){
    var tempObject = [];
    for (var i = 0; i < object.length(); i++){
        tempObject[i] = object[i]
    }
    return tempObject;
}


export default profilePage;