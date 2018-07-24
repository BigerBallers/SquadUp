import React, { Component } from 'react';
import './event_page.css';
import Link from "gatsby-link";
import Geocode from "react-geocode";

class View_Event extends Component {

  static defaultProps = {
    
  };

  constructor(props) { //constructor of props and states
    super(props);

    this.printLog=this.printLog.bind(this);
    this.printLog()
  }

  printLog(){
    console.log('PRINTING LOg')
    console.log(sessionStorage.getItem('event'))
  }


  render(){

    return (
      <div>
      {this.state}
      </div>
      );
  }
}

export default View_Event;
