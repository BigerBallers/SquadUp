import React from 'react'
import Link from 'gatsby-link'
import image from '../images/logo.png';

import '../layouts/index.css';

//Styling the headers, including the buttons, also deciding
//whether users are logged in, and if they are not, button
//won't be visible
const Header = ({ siteTitle }) => 
(
  <div
    style={{
    background: '#60737B',
    marginBottom: '1.45rem',
    }}>

    <div
      style={{
      margin: '0 auto',
      maxWidth: 960,
      height: '100px',
      padding: '1.45rem 1.0875rem',
      }}>

      <div>
        <Link to="/page-2">

          <img src={image} 
          style={{float:'left', 
          width:'200px', 
          margin: '-20px'}}>
          </img>

        </Link>
      </div>

      <div style={{float: 'right', padding:10}}>
          {sessionStorage.getItem("loggedIn") === 'true' ? 
          (
            <div id="parent">

                <div id="div3">

                  <Link to="/">

                    <button 
                    style={{borderRadius: "8px", 
                    border: "2px solid black", 
                    backgroundColor: "white"}}>
                      Logout
                    </button>

                  </Link>

                </div>

            </div>
          ):(null)}
      </div>

      <div style={{float: 'right', padding:10}}>
          {sessionStorage.getItem("loggedIn") === 'true' ? 
          (
            <div id="parent">
                <div id="div2">

                  <Link to="/map/">

                    <button 
                    style={{borderRadius: "8px", 
                    border: "2px solid black", 
                    backgroundColor: "white"}}>
                      Search
                    </button>

                  </Link>

                </div>
            </div>
          ):(null)}
      </div>


      <div style={{float: 'right', padding:10}}>
          {sessionStorage.getItem("loggedIn") === 'true' ? 
          (
            <div id="parent">
                <div id="div1">

                  <Link to="/page-2">

                    <button 
                    style={{borderRadius: "8px", 
                    border: "2px solid black", 
                    backgroundColor: "white"}}>
                      Home
                    </button>

                  </Link>

                </div>
            </div>
          ):(null)}
      </div>



    </div>
  </div>
)


export default Header