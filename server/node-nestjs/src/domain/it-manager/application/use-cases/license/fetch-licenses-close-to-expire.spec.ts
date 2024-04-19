import { faker } from '@faker-js/faker'
import { makeLicense } from 'test/factories/make-license'
import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'

import { FetchLicensesCloseToExpireUseCase } from './fetch-licenses-close-to-expire'

let licensesRepository: InMemoryLicensesRepository
let sut: FetchLicensesCloseToExpireUseCase

describe('Fetch licenses close to expire', () => {
  beforeEach(() => {
    licensesRepository = new InMemoryLicensesRepository()
    sut = new FetchLicensesCloseToExpireUseCase(licensesRepository)
  })

  it('should be able to fetch licenses close to expire', async () => {
    const nextYear = new Date().getFullYear() + 1

    for (let i = 0; i < 2; i++) {
      licensesRepository.items.push(
        makeLicense({
          expiresAt: faker.date.future({ years: 3, refDate: new Date(`${nextYear}-01-01`) }),
        }),
      )
    }

    for (let i = 0; i < 3; i++) {
      licensesRepository.items.push(
        makeLicense({
          expiresAt: faker.date.soon({ days: 20 }),
        }),
      )
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.licenses).toHaveLength(3)
    }
  })
})
