import { jsx } from '@emotion/core'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from './configureStore'
import { App } from './App'

const store = configureStore()

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
)
