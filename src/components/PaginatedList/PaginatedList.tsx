import { jsx } from '@emotion/core'

import { paginatorStyles, paginatorCountStyles, containerStyles, listStyles } from './PaginatedList.styles'

type PaginatedListProps<T> = {
    rows: Array<T>
    rowsPerPage: number
    pageNumber: number
    onPreviousPageClick: (currentPage: number) => void
    onNextPageClick: (currentPage: number) => void
    onRowClick: (row: T) => void
    renderRow: (row: T, handleClick: (row: T) => void) => JSX.Element
}

export const PaginatedList = <T extends { id: string }>({
    rows,
    rowsPerPage,
    pageNumber,
    renderRow,
    onPreviousPageClick,
    onNextPageClick,
    onRowClick,
}: PaginatedListProps<T>) => {
    const startingIndex = rowsPerPage * pageNumber
    const selectedRows = rows.slice(startingIndex, startingIndex + rowsPerPage)
    const maxPageNumber = Math.ceil(rows.length / rowsPerPage)
    const isEmpty = rows.length === 0

    return (
        <div css={containerStyles}>
            <div css={paginatorStyles}>
                <div css={paginatorCountStyles}>
                    {isEmpty ? '' : `Page ${pageNumber + 1} of ${maxPageNumber} (${rows.length} entries in total)`}
                </div>
                <div>
                    <button disabled={pageNumber === 0} onClick={() => onPreviousPageClick(pageNumber)}>
                        ⬅
                    </button>
                    <button disabled={pageNumber === maxPageNumber - 1} onClick={() => onNextPageClick(pageNumber)}>
                        ➡
                    </button>
                </div>
            </div>

            {rows.length === 0 ? (
                <div css={listStyles}>No entries</div>
            ) : (
                <div css={listStyles}>{selectedRows.map(row => renderRow(row, () => onRowClick(row)))}</div>
            )}
        </div>
    )
}
