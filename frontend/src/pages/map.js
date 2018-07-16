import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Link from 'gatsby-link';
import image from '../images/pin.png';



const AnyReactComponent = ({ text, id }) => <div style={{width:'80px', height:'auto'}}>
<img src={image} style={{float:'left', width:'25px'}}></img>
  <Link to='/game_info'>
    {text}
    </Link>
</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 36.9741,
      lng: -122.0308
    },
    zoom: 13
  };


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBgne_-KxLx1Sbd2CHtT7EklGSPAyjXH5I' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        <AnyReactComponent
          lat={36.9741}
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
