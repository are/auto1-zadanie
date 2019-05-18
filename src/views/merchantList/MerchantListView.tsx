import { jsx } from '@emotion/core'
import { connect } from 'react-redux'

import { State } from 'src/reducer'
import { Merchant } from 'src/types'

type MerchantListViewOwnProps = {
    path: string
}

type MerchantListViewStateProps = {
    merchants: Array<Merchant>
}

type MerchantListViewProps = MerchantListViewStateProps & MerchantListViewOwnProps

export const MerchantListViewComponent = ({ path, merchants }: MerchantListViewProps) => {
    return <div />
}

export const MerchantListView = connect((state: State) => ({
    merchants: state.merchantList.merchants,
}))(MerchantListViewComponent)
