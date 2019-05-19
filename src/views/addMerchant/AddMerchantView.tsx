import { jsx } from '@emotion/core'
import { connect } from 'react-redux'
import { useState, useCallback, ChangeEvent } from 'react'
import { containerStyles, rowStyles, spacerStyles } from './AddMerchantView.styles'
import { Merchant } from 'src/types'
import { addMerchant } from '../merchantList/MerchantListView.actions'

type AddMerchantViewRouterProps = {
    path: string
}

type AddMerchantViewDispatchProps = {
    addMerchant: (merchant: Partial<Merchant>) => void
}

type AddMerchantViewProps = AddMerchantViewDispatchProps & AddMerchantViewRouterProps

const fields = ['firstname', 'lastname', 'email', 'phone', 'avatarUrl']
export const AddMerchantViewComponent = ({ addMerchant }: AddMerchantViewProps) => {
    const [merchant, setState] = useState<Merchant>({
        bids: [],
    } as Merchant)

    const handleChange = useCallback(
        fieldId => (event: ChangeEvent<HTMLInputElement>) => {
            setState({
                ...merchant,
                [fieldId]: event.target.value,
            })
        },
        [merchant],
    )

    const handlePremiumChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setState({
                ...merchant,
                hasPremium: event.target.checked,
            })
        },
        [merchant],
    )

    const handleSave = useCallback(() => {
        addMerchant(merchant)
    }, [merchant])

    return (
        <div css={containerStyles}>
            <h3>Add new merchant</h3>

            {fields.map(field => (
                <div key={field} css={rowStyles}>
                    {field}
                    <span css={spacerStyles} />
                    <input type="text" onChange={handleChange(field)} value={merchant[field] || ''} />
                </div>
            ))}

            <div css={rowStyles}>
                premium
                <span css={spacerStyles} />
                <input type="checkbox" checked={merchant.hasPremium || false} onChange={handlePremiumChange} />
            </div>

            <div>
                <button onClick={handleSave}>Save merchant</button>
                <button onClick={() => history.back()}>Cancel</button>
            </div>
        </div>
    )
}

export const mapDispatchToProps = {
    addMerchant,
}

export const AddMerchantView = connect(
    null,
    mapDispatchToProps,
)(AddMerchantViewComponent)
