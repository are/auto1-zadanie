import { Merchant, Bid } from './types'
import { data } from './data'

// This is a fake api. It mimics what a real api could look like.

type Deferred<T> = {
    promise: Promise<T>
    reject: (error: any) => void
    resolve: (value: T) => void
}

const uuid = () => {
    // This has been borrowed from a stack overflow answer
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
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

let merchantList: Array<Merchant> = data

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
            const iMerchant = (data as unknown) as Partial<Merchant>
            const idx = merchantList.findIndex(merchant => merchant.id === id)
            const newMerchant = {
                ...merchantList[idx],
                ...iMerchant,
                ...(iMerchant.bids
                    ? {
                          bids: [
                              ...iMerchant.bids.map(bid => {
                                  if (bid.id) {
                                      return bid
                                  }

                                  return {
                                      ...bid,
                                      id: uuid(),
                                  }
                              }),
                          ],
                      }
                    : {}),
            }

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
            const id = uuid()
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
