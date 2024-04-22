import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrintersRepository } from 'test/repositories/in-memory-printers-repository'

import { FetchPrintersUseCase } from './fetch-printers'

let printersRepository: InMemoryPrintersRepository
let sut: FetchPrintersUseCase

describe('Fetch printers', () => {
  beforeEach(() => {
    printersRepository = new InMemoryPrintersRepository()
    sut = new FetchPrintersUseCase(printersRepository)
  })

  it('should be able to fetch printers', async () => {
    for (let i = 0; i < 5; i++) {
      printersRepository.items.push(makePrinter())
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.printers).toHaveLength(5)
      expect(printersRepository.items).toHaveLength(5)
    }
  })
})
