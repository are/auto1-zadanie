import { jsx } from '@emotion/core'

import { containerStyles, headerStyles, contentStyles, rowStyles, addRowStyles } from './BidsTable.styles'
import { Bid } from 'src/types'
import { useState, useCallback, useMemo } from 'react'
import { EditableField } from '../EditableField/EditableField'

type BidsTableProps = {
    bids: Array<Bid>
    onAdd: (bid: Partial<Bid>) => void
    onRemove: (bid: Bid) => void
}

const keys = ['carTitle', 'amount', 'created']

export const BidsTable = ({ bids, onRemove, onAdd }: BidsTableProps) => {
    const [isEditing, setEditing] = useState(false)
    const [newBid, setNewBid] = useState<Partial<Bid>>({})
    const [[sortByKey, sortDir], setSorting] = useState(['carTitle', 'asc'])

    const handleStartEditing = useCallback(() => {
        setEditing(true)
        setNewBid({ carTitle: '', amount: 0, created: new Date().toString() })
    }, [])

    const handleStopEditing = useCallback(() => {
        setEditing(false)
    }, [])

    const handleSave = useCallback(() => {
        onAdd(newBid)
        handleStopEditing()
    }, [newBid])

    const handleTitleFieldChange = useCallback(
        (newValue: string) => {
            setNewBid({
                ...newBid,
                carTitle: newValue,
            })
        },
        [newBid],
    )

    const handleAmountFieldChange = useCallback(
        (newValue: number) => {
            setNewBid({
                ...newBid,
                amount: newValue,
            })
        },
        [newBid],
    )

    const handleSorting = useCallback(
        (key: string) => () => {
            if (key === sortByKey) {
                if (sortDir === 'asc') {
                    setSorting([key, 'desc'])
                } else if (sortDir === 'desc') {
                    setSorting([key, 'none'])
                } else {
                    setSorting([key, 'asc'])
                }
            } else {
                setSorting([key, 'asc'])
            }
        },
        [sortByKey, sortDir],
    )

    const getSortingIcon = useCallback((dir: string) => {
        if (dir === 'asc') {
            return '👆'
        }

        if (dir === 'desc') {
            return '👇'
        }

        return '◼'
    }, [])

    const sortedBids = useMemo(() => {
        let tempBids = bids.slice(0)

        if (sortDir !== 'none') {
            tempBids.sort((a, b) => {
                let valueA = a[sortByKey]
                let valueB = b[sortByKey]

                if (typeof valueA === 'number' || sortByKey === 'created') {
                    if (sortByKey === 'created') {
                        valueA = new Date(valueA)
                        valueB = new Date(valueB)
                    }

                    if (sortDir === 'asc') {
                        return valueA - valueB
                    } else {
                        return valueB - valueA
                    }
                } else if (typeof valueA === 'string') {
                    if (sortDir === 'asc') {
                        return valueA.localeCompare(valueB)
                    } else {
                        return valueB.localeCompare(valueA)
                    }
                }
            })
        }

        return tempBids
    }, [sortByKey, sortDir, bids])

    return (
        <div css={containerStyles}>
            <div css={headerStyles}>
                {keys.map(key => (
                    <span key={key} onClick={handleSorting(key)}>
                        {key}

                        {sortByKey === key ? getSortingIcon(sortDir) : '◼'}
                    </span>
                ))}
            </div>
            <div css={contentStyles}>
                {sortedBids.map(bid => (
                    <div key={bid.id || bid.carTitle} css={rowStyles}>
                        <span>{bid.carTitle}</span>
                        <span>{bid.amount}</span>
                        <span>{new Date(bid.created).toLocaleString()}</span>
                        <span>
                            <button onClick={() => onRemove(bid)}>🗑</button>
                        </span>
                    </div>
                ))}
                {isEditing && (
                    <div css={rowStyles}>
                        <span>
                            <EditableField value={newBid.carTitle} onChange={handleTitleFieldChange} />
                        </span>
                        <span>
                            <EditableField value={newBid.amount} onChange={handleAmountFieldChange} />
                        </span>
                        <span>{new Date(newBid.created).toLocaleString()}</span>
                        <span>
                            <button onClick={handleSave}>💾</button>
                            <button onClick={handleStopEditing}>❌</button>
                        </span>
                    </div>
                )}
                {!isEditing && (
                    <div css={addRowStyles}>
                        <a href="#" onClick={handleStartEditing}>
                            Add new row
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
