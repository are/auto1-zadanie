import { css, Global, jsx } from '@emotion/core'
import { Router, Redirect } from '@reach/router'
import { Fragment } from 'react'

import { MerchantListView } from './views/merchantList/MerchantListView'
import { MerchantView } from './views/merchant/MerchantView'
import { globalStyles, containerStyles } from './App.styles'
import { AddMerchantView } from './views/addMerchant/AddMerchantView'

export const App = () => {
    return (
        <div css={containerStyles}>
            <Global styles={globalStyles} />
            <Router>
                <Redirect from="/" to="/page/0" />
                <MerchantListView path="/page/:pageId" />
                <MerchantView path="/merchant/:merchantId" />
                <AddMerchantView path="/add-merchant" />
            </Router>
        </div>
    )
}
