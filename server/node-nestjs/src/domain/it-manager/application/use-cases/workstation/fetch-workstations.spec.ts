import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'

import { FetchWorkstationsUseCase } from './fetch-workstations'

let workstationsRepository: InMemoryWorkstationsRepository
let sut: FetchWorkstationsUseCase

describe('Fetch workstations', () => {
  beforeEach(() => {
    workstationsRepository = new InMemoryWorkstationsRepository()
    sut = new FetchWorkstationsUseCase(workstationsRepository)
  })

  it('should be able to fetch workstations', async () => {
    for (let i = 1; i <= 5; i++) {
      workstationsRepository.items.push(
        makeWorkstation({
          tag: `workstation-${i}`,
        }),
      )
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.workstations).toHaveLength(5)
      expect(workstationsRepository.items).toHaveLength(5)
    }
  })
})
