import React from 'react'
import {connect} from 'react-redux'
import {fetchCheckout} from '../store/checkout'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  componentDidMount() {
    // this.props.loadCheckout()
    console.log(this.props.checkout)
    const {user, loadCheckout} = this.props
    const isGuest = !user.id

    if (!isGuest) {
      loadCheckout(user.id)
    } else {
      loadCheckout(JSON.parse(window.localStorage.getItem('cart')) || {})
    }
  }

  render() {
    const {user, cart} = this.props

    const guestOrUser = () => {
      if (Object.keys(user).length === 0) {
        return 'Guest'
      } else {
        return `${user.firstName} ${user.lastName}`
      }
    }

    return (
      <div>
        <h1>Confirm your details before submitting</h1>
        <h2>{guestOrUser()}</h2>
        <h3>Current Order:</h3>
        <table>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          <tbody>
            {cart.map(product => (
              <tr key={product.id} id="checkoutitem">
                <td>
                  <img src={product.imageUrl} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.quantity || product.orderDetail.quantity}</td>
                <td>{product.totalPrice || product.orderDetail.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Total</h4>
        <h3>
          {user.id
            ? cart.reduce((total, curr) => {
                return total + parseInt(curr.orderDetail.totalPrice * 100)
              }, 0) / 100
            : cart.reduce((total, curr) => {
                return total + parseInt(curr.totalPrice * 100)
              }, 0) / 100}
        </h3>
        <button onClick={() => window.localStorage.removeItem('cart')}>
          <Link to="/confirmation">Submit Order</Link>
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadCheckout: userOrCart => dispatch(fetchCheckout(userOrCart))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
