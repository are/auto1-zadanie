import { Action } from 'redux'

import { Merchant } from 'src/types'
import { MerchantListViewAction, ADD_MERCHANT } from './MerchantListView.actions'

export type MerchantListViewState = {
    merchants: Array<Merchant>
}

const initialState: MerchantListViewState = {
    merchants: [],
}

export const MerchantListViewReducer = (state = initialState, action: Action<MerchantListViewAction>) => {
    switch (action.type) {
        case ADD_MERCHANT:
            break
        default:
            return state
    }
}
