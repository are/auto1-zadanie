import { Merchant } from 'src/types'

export const ADD_MERCHANT = 'ADD_MERCHANT'
export type AddMerchantAction = typeof ADD_MERCHANT
export const addMerchant = (merchant: Merchant) => ({
    type: ADD_MERCHANT,
    payload: merchant,
})

export type MerchantListViewAction = AddMerchantAction
