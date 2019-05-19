import { jsx } from '@emotion/core'
import { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { navigate, RouteComponentProps, Link } from '@reach/router'

import { State } from 'src/reducer'
import { Merchant } from 'src/types'
import { fetchMerchants } from './MerchantListView.actions'
import { PaginatedList } from 'src/components/PaginatedList/PaginatedList'
import {
    listElementStyles,
    avatarStyles,
    spacerStyles,
    premiumLabelStyles,
    containerStyles,
    addMerchantStyles,
} from './MerchantListView.styles'

type MerchantListViewOwnProps = {}

type MerchantListViewRouterProps = RouteComponentProps<{ pageId }>

type MerchantListViewStateProps = {
    merchants: Array<Merchant>
    isFetching: boolean
}

type MerchantListViewDispatchProps = {
    fetchMerchants: () => void
}

type MerchantListViewProps = MerchantListViewStateProps &
    MerchantListViewOwnProps &
    MerchantListViewDispatchProps &
    MerchantListViewRouterProps

export const ListElement = (row: Merchant, handleClick: (row: Merchant) => void) => {
    return (
        <div key={row.id} css={listElementStyles} onClick={() => handleClick(row)}>
            <img css={avatarStyles} src={row.avatarUrl} />
            <span>
                {row.firstname} {row.lastname}
            </span>
            <span css={spacerStyles} />
            <span>
                {row.hasPremium && <span css={premiumLabelStyles}>Premium</span>}
                {row.bids.length} bids
            </span>
        </div>
    )
}

export const MerchantListViewComponent = ({ merchants, pageId, fetchMerchants, isFetching }: MerchantListViewProps) => {
    const rowsPerPage = 10
    const currentPage = isNaN(Number(pageId)) ? 0 : Number(pageId)

    const handlePreviousPageClick = useCallback((currentPage: number) => {
        if (currentPage > 0) {
            navigate(`/page/${currentPage - 1}`)
        }
    }, [])

    const handleNextPageClick = useCallback(
        (currentPage: number) => {
            if (currentPage < Math.ceil(merchants.length / rowsPerPage)) {
                navigate(`/page/${currentPage + 1}`)
            }
        },
        [merchants],
    )

    const handleRowClick = useCallback((row: Merchant) => {
        navigate(`/merchant/${row.id}`)
    }, [])

    useEffect(() => {
        fetchMerchants()
    }, [])

    return (
        <div css={containerStyles}>
            <div css={addMerchantStyles}>
                <Link to="/add-merchant">Add merchant</Link>
            </div>
            {!isFetching ? (
                <PaginatedList<Merchant>
                    rows={merchants}
                    rowsPerPage={rowsPerPage}
                    pageNumber={currentPage}
                    onPreviousPageClick={handlePreviousPageClick}
                    onNextPageClick={handleNextPageClick}
                    onRowClick={handleRowClick}
                    renderRow={ListElement}
                />
            ) : (
                'Loading...'
            )}
        </div>
    )
}

const mapStateToProps = (state: State) => ({
    merchants: state.merchantList.merchants,
    isFetching: state.merchantList.fetchingAll,
})

const mapDispatchToProps = {
    fetchMerchants,
}

export const MerchantListView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MerchantListViewComponent)
