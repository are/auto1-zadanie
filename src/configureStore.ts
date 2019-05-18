import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { reducer } from './reducer'

export const configureStore = () => {
    const enhancers = []

    return createStore(reducer, devToolsEnhancer({ name: 'AUTO1-zadanie' }))
}
