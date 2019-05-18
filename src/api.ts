import { seed, name, phone, image, internet, random, date } from 'faker'

import { Merchant, Bid } from './types'

seed(1234)

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
    avatarUrl: image.avatar(),
    email: internet.email(),
    phone: phone.phoneNumber(),
    hasPremium: random.boolean(),
    bids: Array.from(Array(random.number(5)), () => createBid()),
})

let merchantList: Array<Merchant> = Array.from(Array(1001), () => createMerchant())

export const get = <T extends any>(type: string, id?: string): Promise<T> => {
    const deferred = defer<T>()

    switch (type) {
        case 'merchantList':
            setTimeout(() => {
                deferred.resolve((merchantList as unknown) as T)
            }, randomFloat(100, 2000))
            break
        case 'merchant':
            const merchant = merchantList.find(merchant => merchant.id === id)
            setTimeout(() => {
                deferred.resolve((merchant as unknown) as T)
            }, randomFloat(100, 2000))
            break
        default:
            setTimeout(() => {
                deferred.reject({ status: 404, reason: 'Not Found' })
            }, 300)
    }

    return deferred.promise
}

export const patch = <I, O>(type: string, id: string, data: I): Promise<O> => {
    const deferred = defer<O>()

    switch (type) {
        case 'patchMerchant':
            const idx = merchantList.findIndex(merchant => merchant.id === id)
            const newMerchant = { ...merchantList[idx], ...data }

            merchantList = [...merchantList.slice(0, idx), newMerchant, ...merchantList.slice(idx + 1)]

            setTimeout(() => {
                deferred.resolve((newMerchant as unknown) as O)
            }, randomFloat(100, 2000))
            break
        default:
            setTimeout(() => {
                deferred.reject({ status: 404, reason: 'Not Found' })
            }, 300)
    }

    return deferred.promise
}

export const post = <I, O>(type: string, data: I): Promise<O> => {
    const deferred = defer<O>()

    switch (type) {
        case 'addMerchant':
            const id = random.uuid()
            const merchant = { ...((data as unknown) as Merchant), id }

            merchantList = [merchant, ...merchantList]

            setTimeout(() => {
                deferred.resolve((merchant as unknown) as O)
            }, randomFloat(100, 2000))
            break
        default:
            setTimeout(() => {
                deferred.reject({ status: 404, reason: 'Not Found' })
            }, 300)
    }

    return deferred.promise
}

export const remove = <T>(type: string, id: string): Promise<T> => {
    const deferred = defer<T>()

    switch (type) {
        case 'removeMerchant':
            const idx = merchantList.findIndex(merchant => merchant.id === id)

            merchantList = [...merchantList.slice(0, idx), ...merchantList.slice(idx + 1)]

            setTimeout(() => {
                deferred.resolve((id as unknown) as T)
            }, randomFloat(100, 2000))
            break
        default:
            setTimeout(() => {
                deferred.reject({ status: 404, reason: 'Not Found' })
            }, 300)
    }

    return deferred.promise
}
