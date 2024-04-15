import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'
import { GetWorkstationByIdUseCase } from './get-workstation-by-id'

let workstationsRepository: InMemoryWorkstationsRepository
let sut: GetWorkstationByIdUseCase

describe('Get workstation by id', () => {
  beforeEach(() => {
    workstationsRepository = new InMemoryWorkstationsRepository()
    sut = new GetWorkstationByIdUseCase(workstationsRepository)
  })

  it('should be able to get workstation by id', async () => {
    const workstation = makeWorkstation({
      tag: 'workstation-01',
    })
    workstationsRepository.items.push(workstation)

    const result = await sut.execute({
      workstationId: workstation.id.toString(),
    })

    expect(result.hasSucceeded()).toBe(true)

    if (result.hasSucceeded()) {
      expect(result.result.workstation).toEqual(
        expect.objectContaining({
          id: workstation.id,
        }),
      )
    }
  })

  it('should not be able to get workstation with wrong id', async () => {
    const result = await sut.execute({
      workstationId: 'non-existent-workstation',
    })

    expect(result.hasFailed()).toBe(true)
  })
})
