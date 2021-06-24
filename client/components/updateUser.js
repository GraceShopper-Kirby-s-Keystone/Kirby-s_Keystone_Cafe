import React from 'react'
import {fetchUpdateUser} from '../store/users'
import {connect} from 'react-redux'

export class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        address: this.props.user.address,
        email: this.props.user.email,
        password: this.props.user.password
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        address: this.props.user.address,
        email: this.props.user.email,
        password: this.props.user.password
      })
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit() {
    await this.props.fetchUpdateUser({
      ...this.props.user,
      ...this.state
    })
  }
  render() {
    return (
      <div className="signupContainer">
        <div className="sectionHeader">
          <h1>Update Profile</h1>
        </div>

        <section className="formAndBtns">
          <div>
            <form className="signupForm" onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="firstName">
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="lastName">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <div>
                {' '}
                <label htmlFor="address">
                  Address:
                  <input
                    type="text"
                    name="address"
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="email">
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="password">
                  Password:
                  <input
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <input type="submit" value="Submit" />
            </form>
          </div>
        </section>
      </div>
    )
  }
}
const mapState = state => {
  return {user: state.user}
}
const mapDispatch = dispatch => {
  return {
    fetchUpdateUser: state => {
      return dispatch(fetchUpdateUser(state))
    }
  }
}

export default connect(mapState, mapDispatch)(UpdateUser)
