import axios from 'axios'

/**I
 * ACTION TYPES
 */

const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = []

/**
 * ACTION CREATORS
 */

export const updateUser = user => {
  return {
    type: UPDATE_USER,
    user
  }
}

/**
 * THUNK CREATORS
 */

export const fetchUpdateUser = user => {
  return async dispatch => {
    const {data} = await axios.put(`/api/users/${user.id}`, user)
    dispatch(updateUser(data))
  }
}

/**
 * REDUCER
 */
export default function usersReducer(state = defaultUser, action) {
  switch (action.type) {
    case UPDATE_USER:
      return state.map(user => {
        return user.id === action.user.id ? action.user : user
      })
    default:
      return state
  }
}
