import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyPrintersUseCase } from './fetch-many'
import { InMemoryPrintersRepository } from '@/repositories/in-memory/in-memory-printer-repository'

let printersRepository: InMemoryPrintersRepository
let sut: FetchManyPrintersUseCase

describe('Fetch many printers use case', () => {
  beforeEach(() => {
    printersRepository = new InMemoryPrintersRepository()
    sut = new FetchManyPrintersUseCase(printersRepository)
  })

  it('should be able to fetch many printers', async () => {
    for (let i = 0; i < 5; i++) {
      await printersRepository.create({
        deviceId: 'device-id',
        ip: `0.0.0.${i}`,
        rentedIn: new Date('2020, 10, 28'),
        expiresAt: new Date('2023, 10, 28'),
        obs: null,
      })
    }

    const { printers } = await sut.execute()

    expect(printers).toHaveLength(5)
  })
})
