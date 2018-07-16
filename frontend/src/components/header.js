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
        <div style={{width: 'auto',height: 'auto', fontSize: 'xx-small', border: 'solid 1px'}}>
            {sessionStorage.getItem("loggedIn") === 'true' ? (
                <h1>{sessionStorage.getItem('token')}</h1>
            ):(null)}
        </div>
    </div>
  </div>
)


export default Header
