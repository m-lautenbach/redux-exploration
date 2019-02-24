import { USER_NAVIGATION } from './actionTypes'
import locationToPersistable from '../locationToPersistable'

const userNavigation = ({ getState, dispatch }) => {
  window.onpopstate = () =>
    dispatch({
      type: USER_NAVIGATION,
      payload: {
        newLocation: locationToPersistable(window.location),
      },
    })

  return next => action => next(action)
}

export default [userNavigation]
