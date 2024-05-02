import { InMemoryDepartmentsRepository } from '@test/repositories/in-memory-departments-repository'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'

import { GetWorkstationByIdUseCase } from './get-workstation-by-id'

let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let workstationsRepository: InMemoryWorkstationsRepository
let sut: GetWorkstationByIdUseCase

describe('Get workstation by id', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    workstationsRepository = new InMemoryWorkstationsRepository(departmentsRepository)
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
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
