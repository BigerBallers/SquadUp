import React from 'react'
import Link from 'gatsby-link'
import Header from '../components/header'
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const SecondPage = compose(
  /*withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    /*googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBgne_-KxLx1Sbd2CHtT7EklGSPAyjXH5I&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%`, width: '50%'}} />
  }),
  withScriptjs,
  withGoogleMap*/
)(props => (
  <div>
  <Header isAuth={true} />
    <h1>Hi from Events</h1>
    <p>Welcome to the Event Page</p>
    <Link to="/map">Go to map</Link>

  </div>
));


export default SecondPage
