import { State } from './reducer'

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
