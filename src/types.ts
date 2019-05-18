import { State } from './reducer'
import { ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

export type Bid = {
    id: string
    carTitle: string
    amount: number
    created: string
}

export type Merchant = {
    id: string
    firstname: string
    lastname: string
    avatarUrl: string
    email: string
    phone: string
    hasPremium: boolean
    bids: Array<Bid>
}

export type AppAction<T> = {
    type: T
}

export interface AppActionWithPayload<T, P> extends AppAction<T> {
    payload: P
}

export type AppState = State

export type AsyncAction<T extends AppAction<any>> = ActionCreator<ThunkAction<Promise<void>, State, void, T>>
export type AsyncDispatch<T extends AppAction<any>> = ThunkDispatch<AppState, void, T>
