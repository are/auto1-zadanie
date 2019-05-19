import { Action } from 'redux'

import { Merchant } from 'src/types'
import {
    MerchantListViewAction,
    FETCH_MERCHANTS_SUCCESS,
    EDIT_MERCHANT,
    FETCH_MERCHANT_SUCCESS,
    FETCH_MERCHANT,
    DELETE_MERCHANT,
    FETCH_MERCHANTS,
    FETCH_MERCHANTS_FAILURE,
} from './MerchantListView.actions'

export type MerchantListViewState = {
    merchants: Array<Merchant>
    fetching: Array<string>
    fetchingAll: boolean
}

const initialState: MerchantListViewState = {
    merchants: [],
    fetching: [],
    fetchingAll: false,
}

export const MerchantListViewReducer = (state = initialState, action: MerchantListViewAction) => {
    switch (action.type) {
        case FETCH_MERCHANTS:
            return {
                ...state,
                fetchingAll: true,
            }
        case FETCH_MERCHANTS_SUCCESS:
            return {
                ...state,
                merchants: action.payload,
                fetchingAll: false,
            }
        case FETCH_MERCHANTS_FAILURE:
            return {
                ...state,
                fetchingAll: false,
            }
        case FETCH_MERCHANT:
            return {
                ...state,
                fetching: [...state.fetching, action.payload],
            }
        case FETCH_MERCHANT_SUCCESS: {
            const merchantIndex = state.merchants.findIndex(merchant => merchant.id === action.payload.id)

            if (merchantIndex >= 0) {
                return {
                    ...state,
                    merchants: [
                        ...state.merchants.slice(0, merchantIndex),
                        action.payload,
                        ...state.merchants.slice(merchantIndex + 1),
                    ],
                    fetching: [...state.fetching.filter(id => id !== action.payload.id)],
                }
            }

            return {
                ...state,
                merchants: [...state.merchants, action.payload],
                fetching: [...state.fetching.filter(id => id !== action.payload.id)],
            }
        }
        case DELETE_MERCHANT: {
            const merchantIndex = state.merchants.findIndex(merchant => merchant.id === action.payload)

            return {
                ...state,
                merchants: [...state.merchants.slice(0, merchantIndex), ...state.merchants.slice(merchantIndex + 1)],
            }
        }
        case EDIT_MERCHANT: {
            const merchantIndex = state.merchants.findIndex(merchant => merchant.id === action.payload.id)
            const newMerchant = { ...state.merchants[merchantIndex], ...action.payload.merchant }

            return {
                ...state,
                merchants: [
                    ...state.merchants.slice(0, merchantIndex),
                    newMerchant,
                    ...state.merchants.slice(merchantIndex + 1),
                ],
                fetching: [...state.fetching, action.payload.id],
            }
        }
        default:
            return state
    }
}
