import { css, Global, jsx } from '@emotion/core'
import { Router } from '@reach/router'
import { Fragment } from 'react'

import { MerchantListView } from './views/merchantList/MerchantListView'
import { globalStyles, containerStyles } from './App.styles'

export const App = () => {
    return (
        <div css={containerStyles}>
            <Global styles={globalStyles} />
            <Router>
                <MerchantListView path="/" />
            </Router>
        </div>
    )
}
