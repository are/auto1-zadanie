import { combineReducers } from 'redux'

import { MerchantListViewReducer, MerchantListViewState } from './views/merchantList/MerchantListView.reducer'

export type State = {
    merchantList: MerchantListViewState
}

export const reducer = combineReducers({
    merchantList: MerchantListViewReducer,
})
