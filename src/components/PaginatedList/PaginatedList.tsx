import { jsx } from '@emotion/core'
import { useCallback } from 'react'
import { paginatorStyles, paginatorCountStyles, containerStyles, listStyles } from './PaginatedList.styles'

type PaginatedListProps<T> = {
    rows: Array<T>
    rowsPerPage: number
    pageNumber: number
    onPreviousPageClick: (currentPage: number) => void
    onNextPageClick: (currentPage: number) => void
    renderRow: (row: T) => JSX.Element
}

export const PaginatedList = <T extends { id: string }>({
    rows,
    rowsPerPage,
    pageNumber,
    renderRow,
    onPreviousPageClick,
    onNextPageClick,
}: PaginatedListProps<T>) => {
    const startingIndex = rowsPerPage * pageNumber
    const selectedRows = rows.slice(startingIndex, startingIndex + rowsPerPage)
    const maxPageNumber = Math.floor(rows.length / rowsPerPage)

    if (rows.length === 0) {
        return null
    }

    return (
        <div css={containerStyles}>
            <div css={paginatorStyles}>
                <div css={paginatorCountStyles}>
                    Page {pageNumber + 1} of {maxPageNumber + 1}
                </div>
                <div>
                    <button onClick={() => onPreviousPageClick(pageNumber)}>⬅</button>
                    <button onClick={() => onNextPageClick(pageNumber)}>➡</button>
                </div>
            </div>

            <div css={listStyles}>{selectedRows.map(renderRow)}</div>
        </div>
    )
}
