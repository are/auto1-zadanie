import { Merchant, AppAction, AppActionWithPayload, AsyncAction, AsyncDispatch } from 'src/types'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { ActionCreator, Action } from 'redux'
import { State } from 'src/reducer'
import { get, patch, remove, post } from 'src/api'
import { navigate } from '@reach/router'

export const FETCH_MERCHANTS = 'FETCH_MERCHANTS'
export type FetchMerchantsAction = AppAction<typeof FETCH_MERCHANTS>
const _fetchMerchants = (): FetchMerchantsAction => ({
    type: FETCH_MERCHANTS,
})

export const FETCH_MERCHANTS_SUCCESS = 'FETCH_MERCHANTS_SUCCESS'
export type FetchMerchantsSuccessAction = AppActionWithPayload<typeof FETCH_MERCHANTS_SUCCESS, Array<Merchant>>
export const fetchMerchantsSuccess = (merchants: Array<Merchant>): FetchMerchantsSuccessAction => ({
    type: FETCH_MERCHANTS_SUCCESS,
    payload: merchants,
})

export const FETCH_MERCHANTS_FAILURE = 'FETCH_MERCHANTS_FAILURE'
export type FetchMerchantsFailureAction = AppAction<typeof FETCH_MERCHANTS_FAILURE>
export const fetchMerchantsFailure = (): FetchMerchantsFailureAction => ({
    type: FETCH_MERCHANTS_FAILURE,
})

export const FETCH_MERCHANT = 'FETCH_MERCHANT'
export type FetchMerchantAction = AppActionWithPayload<typeof FETCH_MERCHANT, string>
const _fetchMerchant = (id: string): FetchMerchantAction => ({
    type: FETCH_MERCHANT,
    payload: id,
})

export const FETCH_MERCHANT_SUCCESS = 'FETCH_MERCHANT_SUCCESS'
export type FetchMerchantSuccessAction = AppActionWithPayload<typeof FETCH_MERCHANT_SUCCESS, Merchant>
export const fetchMerchantSuccess = (merchant: Merchant): FetchMerchantSuccessAction => ({
    type: FETCH_MERCHANT_SUCCESS,
    payload: merchant,
})

export const FETCH_MERCHANT_FAILURE = 'FETCH_MERCHANT_FAILURE'
export type FetchMerchantFailureAction = AppAction<typeof FETCH_MERCHANT_FAILURE>
export const fetchMerchantFailure = (): FetchMerchantFailureAction => ({
    type: FETCH_MERCHANT_FAILURE,
})

export const DELETE_MERCHANT = 'DELETE_MERCHANT'
export type DeleteMerchantAction = AppActionWithPayload<typeof DELETE_MERCHANT, string>
const _deleteMerchant = (id: string): DeleteMerchantAction => ({
    type: DELETE_MERCHANT,
    payload: id,
})

export const DELETE_MERCHANT_SUCCESS = 'DELETE_MERCHANT_SUCCESS'
export type DeleteMerchantSuccessAction = AppActionWithPayload<typeof DELETE_MERCHANT_SUCCESS, string>
export const deleteMerchantSuccess = (id: string): DeleteMerchantSuccessAction => ({
    type: DELETE_MERCHANT_SUCCESS,
    payload: id,
})

export const DELETE_MERCHANT_FAILURE = 'DELETE_MERCHANT_FAILURE'
export type DeleteMerchantFailureAction = AppAction<typeof DELETE_MERCHANT_FAILURE>
export const deleteMerchantFailure = (): DeleteMerchantFailureAction => ({
    type: DELETE_MERCHANT_FAILURE,
})

export const ADD_MERCHANT = 'ADD_MERCHANT'
export type AddMerchantAction = AppActionWithPayload<typeof ADD_MERCHANT, Partial<Merchant>>
const _addMerchant = (merchant: Partial<Merchant>): AddMerchantAction => ({
    type: ADD_MERCHANT,
    payload: merchant,
})

export const ADD_MERCHANT_SUCCESS = 'ADD_MERCHANT_SUCCESS'
export type AddMerchantSuccessAction = AppActionWithPayload<typeof ADD_MERCHANT_SUCCESS, Merchant>
export const addMerchantSuccess = (merchant: Merchant): AddMerchantSuccessAction => ({
    type: ADD_MERCHANT_SUCCESS,
    payload: merchant,
})

export const ADD_MERCHANT_FAILURE = 'ADD_MERCHANT_FAILURE'
export type AddMerchantFailureAction = AppAction<typeof ADD_MERCHANT_FAILURE>
export const addMerchantFailure = (): AddMerchantFailureAction => ({
    type: ADD_MERCHANT_FAILURE,
})

export const EDIT_MERCHANT = 'EDIT_MERCHANT'
export type EditMerchantAction = AppActionWithPayload<typeof EDIT_MERCHANT, { id: string; merchant: Partial<Merchant> }>
export const _editMerchant = (id: string, merchant: Partial<Merchant>): EditMerchantAction => ({
    type: EDIT_MERCHANT,
    payload: {
        id,
        merchant,
    },
})

export const fetchMerchants: AsyncAction<MerchantListViewAction> = () => async (
    dispatch: AsyncDispatch<MerchantListViewAction>,
) => {
    dispatch(_fetchMerchants())

    try {
        const data = await get<Array<Merchant>>('merchantList')

        dispatch(fetchMerchantsSuccess(data))
    } catch (e) {
        dispatch(fetchMerchantsFailure())
    }
}

export const fetchMerchant: AsyncAction<MerchantListViewAction> = (id: string) => async (
    dispatch: AsyncDispatch<MerchantListViewAction>,
) => {
    dispatch(_fetchMerchant(id))

    try {
        const data = await get<Merchant>('merchant', id)

        dispatch(fetchMerchantSuccess(data))
    } catch (e) {
        dispatch(fetchMerchantFailure())
    }
}

export const editMerchant: AsyncAction<MerchantListViewAction> = (id: string, merchant: Partial<Merchant>) => async (
    dispatch: AsyncDispatch<MerchantListViewAction>,
) => {
    dispatch(_editMerchant(id, merchant))

    try {
        const result = await patch<Partial<Merchant>, Merchant>('patchMerchant', id, merchant)

        dispatch(fetchMerchantSuccess(result))
    } catch (e) {}
}

export const addMerchant: AsyncAction<MerchantListViewAction> = (merchant: Partial<Merchant>) => async (
    dispatch: AsyncDispatch<MerchantListViewAction>,
) => {
    dispatch(_addMerchant(merchant))

    try {
        const result = await post<Partial<Merchant>, Merchant>('addMerchant', merchant)

        navigate(`/merchant/${result.id}`)
        dispatch(addMerchantSuccess(result))
    } catch (e) {
        dispatch(addMerchantFailure())
    }
}

export const deleteMerchant: AsyncAction<MerchantListViewAction> = (id: string) => async (
    dispatch: AsyncDispatch<MerchantListViewAction>,
) => {
    dispatch(_deleteMerchant(id))

    try {
        const result = await remove<string>('removeMerchant', id)

        dispatch(deleteMerchantSuccess(result))
    } catch (e) {}
}

export type MerchantListViewAction =
    | FetchMerchantsAction
    | FetchMerchantsSuccessAction
    | FetchMerchantsFailureAction
    | FetchMerchantAction
    | FetchMerchantSuccessAction
    | FetchMerchantFailureAction
    | EditMerchantAction
    | DeleteMerchantAction
    | DeleteMerchantSuccessAction
    | DeleteMerchantFailureAction
    | AddMerchantAction
    | AddMerchantSuccessAction
    | AddMerchantFailureAction
