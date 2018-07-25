import React from 'react'
import Link from 'gatsby-link'
import image from '../images/logo.png';

import '../layouts/index.css';


const Header = ({ siteTitle }) => 
(
  <div
    style={{
      background: '#60737B',
      marginBottom: '1.45rem',
    }}
  >
  <div
      style={{
      margin: '0 auto',
      maxWidth: 960,
      height: '100px',
      padding: '1.45rem 1.0875rem',
      }}
  >
    <div>
        <Link
          to="/page-2">
          <img src={image} style={{float:'left', width:'200px', margin: '-20px'}}></img>
        </Link>
    </div>

      <div style={{float: 'right', padding:10}}>
          {sessionStorage.getItem("loggedIn") === 'true' ? 
          (
            <div id="parent">
                <div id="div3"><Link to="/">Logout</Link></div>
            </div>
          ):(null)}
      </div>

      <div style={{float: 'right', padding:10}}>
          {sessionStorage.getItem("loggedIn") === 'true' ? 
          (
            <div id="parent">
                <div id="div2"><Link to="/map/">Search</Link></div>
            </div>
          ):(null)}
      </div>

      <div style={{float: 'right', padding:10}}>
        {sessionStorage.getItem("loggedIn") === 'true' ? 
        (
          <div id="parent">
              <div id="div4"><Link to="/Add_Event">Add Event</Link></div>
          </div>
        ):(null)}
      </div>

      <div style={{float: 'right', padding:10}}>
        {sessionStorage.getItem("loggedIn") === 'true' ? 
        (
          <div id="parent">
              <div id="div4"><Link to="/Add_Park">Add Park</Link></div>
          </div>
        ):(null)}
      </div>

      <div style={{float: 'right', padding:10}}>
          {sessionStorage.getItem("loggedIn") === 'true' ? 
          (
            <div id="parent">
                <div id="div1"><Link to="/page-2">Home</Link></div>
            </div>
          ):(null)}
      </div>



    </div>
    </div>
)


export default Header