import React, { Component } from 'react';
import './profile_css.css';


class profilePage extends Component{

    constructor(props) {
        super(props);

        var user = sessionStorage.getItem('account');

        console.log(user);
        user = JSON.parse(user);
        if(user != null) {
            var full_name = user.googleProvider.name;
            var profile_image = user.googleProvider.profilePic;
            
            console.log(user);
            console.log(profile_image);
        }


        this.state = {
            person: {
                name: full_name,
                biography: 'some text here',
            },
            image: profile_image,

        };
    }
    render() {
        return(
            <div className="App">
                <Image src={this.state.image} />
                <Profile person={this.state.person}/>
            </div>
        );
    }
}


function Image(props){
    return (
        <img src={props.src} id="account_picture" />

    );
}


function Profile(props){
    return (
        <div className="Profile">
            <h1 className="Name">{props.person.name}</h1>
            <p className="Bio">{props.person.biography}</p>
        </div>
    );
}


export default profilePage;