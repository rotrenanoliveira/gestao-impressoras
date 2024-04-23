import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'

import { DeleteWorkstationUseCase } from './delete-workstation'

let workstationsRepository: InMemoryWorkstationsRepository
let sut: DeleteWorkstationUseCase

describe('Delete workstation', () => {
  beforeEach(() => {
    workstationsRepository = new InMemoryWorkstationsRepository()
    sut = new DeleteWorkstationUseCase(workstationsRepository)
  })

  it('should be able to delete workstation', async () => {
    const workstation = makeWorkstation()
    workstationsRepository.items.push(workstation)

    const result = await sut.execute({
      workstationId: workstation.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(workstationsRepository.items).toHaveLength(0)
    }

    expect(workstationsRepository.items).toHaveLength(0)
  })
})
