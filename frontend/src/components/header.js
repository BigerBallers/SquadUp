import React from 'react'
import Link from 'gatsby-link'



const Header = ({ isAuth }) => (
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
        padding: '1.45rem 1.0875rem'
      }}
    >
    {isAuth ? (
      <h1 style={{margin: 0 }}>
        <Link
          to="/home"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
        SquadUp
        </Link>

        <ul>
          <li style={{fontSize : '15px', margin:13, float:'right'}}><Link to="/">Log Out</Link></li>
          <li style={{fontSize : '15px', margin:13, float:'right'}}><Link to="#">About</Link></li>
          <li style={{fontSize : '15px', margin:13, float:'right'}}><Link to="/Add_Park">Add Park</Link></li>
          <li style={{fontSize : '15px', margin:13, float:'right'}}><Link to="/home">Home</Link></li>
        </ul>
        </h1>
    ) : (
      <h1 style={{margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
        SquadUp
        </Link>
      </h1>
    )}
    </div>
  </div>
)


export default Header
