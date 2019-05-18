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
