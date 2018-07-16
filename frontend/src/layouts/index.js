import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

//this header here imports the blue SquadUp bar feature
import Header from '../components/header'

import './index.css'

//The Header tag inside Layout puts that bar feature to every page
//And when it set the margin, width and paddings below, it sets for all
//pages, so I am not entirely sure what else does this page do
//So if deleting the header, the maxWidth and padding below, the Add-Park
//page will be good to go (I think).
//Comment by Philip, July 14
const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
	  user={sessionStorage.getItem("token")}
	  logoutButton={data.site.siteMetadata.logoutButton}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />

    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title,
        user,
        logoutButton,
      }
    }
  }
`