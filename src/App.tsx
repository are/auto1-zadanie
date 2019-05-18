import { css, Global, jsx } from '@emotion/core'
import { Router } from '@reach/router'
import { Fragment } from 'react'

import { MerchantListView } from './views/merchantList/MerchantListView'
import { globalStyles } from './App.styles'

export const App = () => {
    return (
        <Fragment>
            <Global styles={globalStyles} />
            <Router>
                <MerchantListView path="/" />
            </Router>
        </Fragment>
    )
}
