import React, { Component } from 'react';
import './profile_css.css';


class profilePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: sessionStorage.getItem('account'),
                biography: '26 year old Designer / Developer living in Stockholm. Originally from Oxford, England. Love to make stuff.',
            },
            image: 'http://static1.squarespace.com/static/55acc005e4b098e615cd80e2/t/57b057398419c2c454f09924/1471025851733/',

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
        <div className="Image" style={{backgroundImage: 'url(' + props.src + ')'}}></div>
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