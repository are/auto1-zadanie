import { jsx } from '@emotion/core'
import { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'

import { State } from 'src/reducer'
import { Merchant } from 'src/types'
import { fetchMerchants } from './MerchantListView.actions'
import { PaginatedList } from 'src/components/PaginatedList/PaginatedList'
import { listElementStyles } from './MerchantListView.styles'

type MerchantListViewOwnProps = {
    path: string
}

type MerchantListViewStateProps = {
    merchants: Array<Merchant>
}

type MerchantListViewDispatchProps = {
    fetchMerchants: () => void
}

type MerchantListViewProps = MerchantListViewStateProps & MerchantListViewOwnProps & MerchantListViewDispatchProps

export const ListElement = ({ id, firstname }: Merchant) => {
    return (
        <div key={id} css={listElementStyles}>
            {firstname}
        </div>
    )
}

export const MerchantListViewComponent = ({ path, merchants, fetchMerchants }: MerchantListViewProps) => {
    const rowsPerPage = 10
    const [currentPage, setCurrentPage] = useState(0)

    const handlePreviousPageClick = useCallback((currentPage: number) => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }, [])

    const handleNextPageClick = useCallback(
        (currentPage: number) => {
            if (currentPage < Math.floor(merchants.length / rowsPerPage)) {
                setCurrentPage(currentPage + 1)
            }
        },
        [merchants],
    )

    const handlePageClick = useCallback((pageNumber: number) => {
        setCurrentPage(pageNumber)
    }, [])

    useEffect(() => {
        fetchMerchants()
    }, [])

    return (
        <PaginatedList<Merchant>
            rows={merchants}
            rowsPerPage={rowsPerPage}
            pageNumber={currentPage}
            onPreviousPageClick={handlePreviousPageClick}
            onNextPageClick={handleNextPageClick}
            renderRow={ListElement}
        />
    )
}

const mapStateToProps = (state: State) => ({
    merchants: state.merchantList.merchants,
})

const mapDispatchToProps = {
    fetchMerchants,
}

export const MerchantListView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MerchantListViewComponent)
