import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>
    	<i>
    		A revolutionary way to play to play sports
    	</i>
    </h1>
    <Link to="/page-2/"><p>Go to page 2</p></Link>
	<Link to="/event_page/"><p>Go to Events</p></Link>
    <Link to="/App/"><p>Go to Login</p></Link>
  </div>
)

export default IndexPage
