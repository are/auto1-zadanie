import { name, phone, image, internet, random, date } from 'faker'

import { Merchant, Bid } from './types'

// This is a fake api. It mimics what a real api could look like.

type Deferred<T> = {
    promise: Promise<T>
    reject: (error: any) => void
    resolve: (value: T) => void
}

const defer = <T extends any>(): Deferred<T> => {
    let rejectFn = null
    let resolveFn = null

    let promise = new Promise<T>((resolve, reject) => {
        resolveFn = (value: T) => resolve(value)
        rejectFn = (error: any) => reject(error)
    })

    return {
        promise,
        reject: rejectFn,
        resolve: resolveFn,
    }
}

export const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min

export const createBid = (): Bid => ({
    id: random.uuid(),
    carTitle: random.word(),
    amount: random.number(),
    created: date.past().toLocaleString(),
})

export const createMerchant = (): Merchant => ({
    id: random.uuid(),
    firstname: name.firstName(),
    lastname: name.lastName(),
    avatarUrl: image.imageUrl(),
    email: internet.email(),
    phone: phone.phoneNumber(),
    hasPremium: random.boolean(),
    bids: Array.from(Array(random.number(5)), () => createBid()),
})

const merchantList: unknown = Array.from(Array(random.number(50)), () => createMerchant())

export const get = <T extends any>(type: string): Promise<T> => {
    const deferred = defer<T>()

    switch (type) {
        case 'merchantList':
            setTimeout(() => {
                deferred.resolve(merchantList as T)
            }, randomFloat(100, 2000))
            break
        default:
            setTimeout(() => {
                deferred.reject({ status: 404, reason: 'Not Found' })
            }, 300)
    }

    return deferred.promise
}
