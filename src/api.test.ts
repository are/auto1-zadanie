import { randomFloat } from './api'

describe('randomFloat', () => {
    it('should return a random float between min and max', () => {
        for (let i = 0; i < 100; i++) {
            const min = 1000
            const max = 5000
            const result1 = randomFloat(min, max)

            expect(result1).toBeLessThanOrEqual(max)
            expect(result1).toBeGreaterThanOrEqual(1000)
        }
    })
})
