import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './AllProducts'
import {Route, Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>

      <AllProducts />

      {isAdmin ? (
        <Link to="/admin/products">
          <h2>See All Products</h2>
        </Link>
      ) : null}

      {isAdmin ? (
        <Link to="/admin/users">
          <h2>See All Users</h2>
        </Link>
      ) : null}
      <Route component={AllProducts} />


    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
