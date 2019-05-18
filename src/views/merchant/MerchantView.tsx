import { jsx } from '@emotion/core'
import { Router, RouteComponentProps } from '@reach/router'
import { connect } from 'react-redux'
import { useEffect } from 'react'

import { AppState, Merchant } from 'src/types'
import { containerStyles, headerStyles } from './MerchantView.styles'
import { fetchMerchants } from '../merchantList/MerchantListView.actions'

type MerchantViewOwnProps = {}

type MerchantViewRouterProps = RouteComponentProps<{ merchantId: string }>

type MerchantViewStateProps = {
    merchant: Merchant
}

type MerchantViewDispatchProps = {
    fetchMerchants: () => void
}

type MerchantViewProps = MerchantViewOwnProps &
    MerchantViewRouterProps &
    MerchantViewStateProps &
    MerchantViewDispatchProps

export const MerchantViewComponent = ({ merchant, fetchMerchants }: MerchantViewProps) => {
    useEffect(() => {
        if (!merchant) {
            fetchMerchants()
        }
    }, [merchant])

    if (!merchant) {
        return <div css={containerStyles}>Loading...</div>
    }

    return (
        <div css={containerStyles}>
            <div css={headerStyles}>
                <img src={merchant.avatarUrl} />
                <h3>
                    {merchant.firstname} {merchant.lastname}
                </h3>
            </div>
            <div>
                <p>email: {merchant.email}</p>
                <p>phone: {merchant.phone}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppState, ownProps: MerchantViewRouterProps) => ({
    merchant: state.merchantList.merchants.find(({ id }) => id === ownProps.merchantId),
})

const mapDispatchToProps = {
    fetchMerchants,
}

export const MerchantView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MerchantViewComponent)
