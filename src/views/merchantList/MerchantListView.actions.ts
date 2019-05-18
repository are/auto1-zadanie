import { Merchant, AppAction, AppActionWithPayload } from 'src/types'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { ActionCreator, Action } from 'redux'
import { State } from 'src/reducer'
import { get } from 'src/api'

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

export const fetchMerchants: ActionCreator<
    ThunkAction<Promise<void>, State, void, MerchantListViewAction>
> = () => async (dispatch: ThunkDispatch<State, void, MerchantListViewAction>) => {
    dispatch(_fetchMerchants())

    try {
        const data = await get<Array<Merchant>>('merchantList')

        dispatch(fetchMerchantsSuccess(data))
    } catch (e) {
        dispatch(fetchMerchantsFailure())
    }
}

export type MerchantListViewAction = FetchMerchantsAction | FetchMerchantsSuccessAction | FetchMerchantsFailureAction
