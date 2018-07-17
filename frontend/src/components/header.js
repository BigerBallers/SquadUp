import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'blue',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
    <div>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      </div>
        <div style={{margin: '-35px', float: 'right'}}>
            {sessionStorage.getItem("loggedIn") === 'true' ? (
                <div><Link to="/">Logout</Link></div>
            ):(null)}
        </div>
    </div>
    </div>
)


export default Header
