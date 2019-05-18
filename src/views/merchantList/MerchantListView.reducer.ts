import { Action } from 'redux'

import { Merchant } from 'src/types'
import { MerchantListViewAction, FETCH_MERCHANTS_SUCCESS } from './MerchantListView.actions'

export type MerchantListViewState = {
    merchants: Array<Merchant>
}

const initialState: MerchantListViewState = {
    merchants: [],
}

export const MerchantListViewReducer = (state = initialState, action: MerchantListViewAction) => {
    switch (action.type) {
        case FETCH_MERCHANTS_SUCCESS:
            return {
                ...state,
                merchants: action.payload,
            }
        default:
            return state
    }
}
