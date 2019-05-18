import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'

import { reducer, State } from './reducer'

export const configureStore = (preloadedState: Partial<State> = {}) => {
    const composeEnhancers = composeWithDevTools({ name: 'AUTO1-zadanie' })

    return createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(reduxThunk)))
}
