import { withCallbacks } from 'redux-signalr'
import userSessionSlice from './state'
import User from '../../interfaces/Users/User'

export const userSessionCallbacks = withCallbacks()
    .add('CurrentUserChanged', (user: User) => dispatch => {
        console.log('CurrentUserChanged', JSON.stringify(user))
        dispatch(userSessionSlice.actions.currentUserChanged(user))
    })
    .callbackMap